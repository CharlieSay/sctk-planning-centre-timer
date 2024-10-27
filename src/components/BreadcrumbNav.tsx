import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Service } from '../types';

interface BreadcrumbNavProps {
  service: Service;
  onBack: () => void;
}

export const BreadcrumbNav = ({ service, onBack }: BreadcrumbNavProps) => {
  return (
    <div className="absolute top-0 left-0 right-0 p-2 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent">
      <button
        onClick={onBack}
        className="text-gray-600 hover:text-gray-400 transition-colors p-1 -ml-1"
        aria-label="Back to service selection"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>
      <div className="ml-2 text-xs font-medium text-gray-600">
        <span>{service.campus}</span>
        <ChevronRight className="w-3 h-3 inline mx-1 opacity-50" />
        <span>{service.time}</span>
        <ChevronRight className="w-3 h-3 inline mx-1 opacity-50" />
        <span>{service.serviceNumber}</span>
      </div>
    </div>
  );
};

export default BreadcrumbNav;
