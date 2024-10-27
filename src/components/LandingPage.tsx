import { Clock } from 'lucide-react';
import { Service } from '../types';
import { ServiceSelector } from './ServiceSelector';

interface LandingPageProps {
  services: Service[];
  loading: boolean;
  selectedService: Service | null;
  onServiceSelect: (service: Service) => void;
}

export const LandingPage = ({
  services,
  loading,
  selectedService,
  onServiceSelect,
}: LandingPageProps) => {
  return (
    <div className="container mx-auto px-4 min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-2xl w-full text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Service Timer
            </h1>
          </div>
          <p className="text-gray-400 text-lg mb-8">
            Select your service to begin tracking time
          </p>
          {loading ? (
            <div className="text-gray-400">Loading services...</div>
          ) : (
            <ServiceSelector
              services={services}
              selectedService={selectedService}
              onServiceSelect={onServiceSelect}
            />
          )}
        </div>
      </div>
      <div className="text-center py-8">
        <p className="text-sm text-gray-500">
          Part of{' '}
          <a
            href="https://simplechurchtoolkit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            Simple Church Toolkit
          </a>
        </p>
      </div>
    </div>
  );
};
