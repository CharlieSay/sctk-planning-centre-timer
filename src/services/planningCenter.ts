import { Service, TimerItem } from '../types';

const BASE_URL = 'https://api.planningcenteronline.com/services/v2';

class PlanningCenterAPI {
  private token: string | null = null;

  async authenticate() {
    if (!this.token) {
      // Will do OAUth folow at some point
      this.token = localStorage.getItem('pc_token');
    }
    return this.token;
  }

  private async fetch(endpoint: string, options: RequestInit = {}) {
    const token = await this.authenticate();
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Planning Center API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getServices(): Promise<Service[]> {
    const response = await this.fetch('/service_types');
    return response.data.map((service: any) => ({
      id: service.id,
      name: service.attributes.name.toUpperCase(),
      date: service.attributes.last_plan_from,
      campus: service.attributes.name.split(' ')[0],
      time: service.attributes.name.includes('Morning') ? 'AM' : 'PM',
      serviceNumber: `${
        service.attributes.name.includes('Morning') ? '9AM' : '6PM'
      } Service`,
    }));
  }

  async getCurrentItem(serviceId: string): Promise<TimerItem> {
    const response = await this.fetch(
      `/service_types/${serviceId}/plans/current/items`
    );
    const currentItem = response.data.find(
      (item: any) =>
        item.relationships.timer?.data?.attributes?.status === 'running'
    );

    if (!currentItem) {
      throw new Error('No active timer found');
    }

    return {
      name: currentItem.attributes.title.toUpperCase(),
      timeRemaining:
        currentItem.relationships.timer.data.attributes.remaining_seconds,
      nextItem:
        response.data[
          response.data.indexOf(currentItem) + 1
        ]?.attributes.title.toUpperCase() || 'END OF SERVICE',
    };
  }
}

export const planningCenterAPI = new PlanningCenterAPI();
