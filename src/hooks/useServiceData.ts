import { useEffect, useState } from 'react';
import { config } from '../config/env';
import { MOCK_SERVICES, getMockCurrentItem } from '../mocks/serviceData';
import { planningCenterAPI } from '../services/planningCenter';
import { Service, TimerItem } from '../types';

export function useServiceData() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        if (config.useMockData) {
          setServices(MOCK_SERVICES);
        } else {
          const data = await planningCenterAPI.getServices();
          setServices(data);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch services'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  return { services, loading, error };
}

export function useCurrentItem(serviceId: string | null) {
  const [currentItem, setCurrentItem] = useState<TimerItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!serviceId) {
      setCurrentItem(null);
      setLoading(false);
      return;
    }

    async function fetchCurrentItem() {
      try {
        if (config.useMockData) {
          setCurrentItem(getMockCurrentItem());
        } else {
          const data = await planningCenterAPI.getCurrentItem(serviceId ?? '');
          setCurrentItem(data);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch current item'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCurrentItem();

    // Poll for updates every second in both mock and real mode
    const interval = setInterval(fetchCurrentItem, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [serviceId]);

  return { currentItem, loading, error };
}
