import { ChevronDown } from 'lucide-react';
import { Service } from '../types';

interface ServiceSelectorProps {
  services: Service[];
  selectedService: Service | null;
  onServiceSelect: (service: Service) => void;
}

export const ServiceSelector = ({
  services,
  selectedService,
  onServiceSelect,
}: ServiceSelectorProps) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <select
          className="w-full bg-gray-800/50 backdrop-blur-sm appearance-none rounded-lg px-6 py-4 text-lg
                     border border-gray-700 hover:border-blue-400 transition-colors cursor-pointer
                     focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          value={selectedService?.id ?? ''}
          onChange={(e) => {
            const service = services.find((s) => s.id === e.target.value);
            if (service) onServiceSelect(service);
          }}
        >
          <option value="" disabled>
            Select a service...
          </option>
          {services.map((service) => (
            <option key={service.id} value={service.id} className="bg-gray-800">
              {service.campus} - {service.serviceNumber} - {service.date}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};

export default ServiceSelector;
