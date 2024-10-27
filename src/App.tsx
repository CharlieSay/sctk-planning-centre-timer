import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { TimerPage } from './components/TimerPage';
import { useCurrentItem, useServiceData } from './hooks/useServiceData';
import { Service } from './types';

const App = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const {
    services,
    loading: servicesLoading,
    error: servicesError,
  } = useServiceData();
  const {
    currentItem,
    loading: itemLoading,
    error: itemError,
  } = useCurrentItem(selectedService?.id ?? null);

  if (servicesError) {
    return (
      <div className="text-red-500 p-4">
        Error loading services: {servicesError}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {!selectedService ? (
        <LandingPage
          services={services}
          loading={servicesLoading}
          selectedService={selectedService}
          onServiceSelect={setSelectedService}
        />
      ) : (
        <TimerPage
          service={selectedService}
          currentItem={currentItem}
          loading={itemLoading}
          error={itemError}
          onBack={() => setSelectedService(null)}
        />
      )}
    </div>
  );
};

export default App;
