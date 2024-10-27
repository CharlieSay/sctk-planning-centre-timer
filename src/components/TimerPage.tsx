import { Service, TimerItem } from '../types';
import { BreadcrumbNav } from './BreadcrumbNav';
import { TimerDisplay } from './TimerDisplay';

interface TimerPageProps {
  service: Service;
  currentItem: TimerItem | null;
  loading: boolean;
  error: string | null;
  onBack: () => void;
}

export const TimerPage = ({
  service,
  currentItem,
  loading,
  error,
  onBack,
}: TimerPageProps) => {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <BreadcrumbNav service={service} onBack={onBack} />
      <div className="flex-1 flex items-center justify-center">
        {loading ? (
          <div className="text-gray-400">Loading timer...</div>
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : currentItem ? (
          <TimerDisplay
            currentItem={currentItem.name}
            timeRemaining={currentItem.timeRemaining}
            nextItem={currentItem.nextItem}
          />
        ) : null}
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <img
          src="https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?w=200&auto=format&fit=crop&q=80"
          alt="Church Logo"
          className="h-12 w-auto opacity-30 hover:opacity-50 transition-opacity"
        />
      </div>
    </div>
  );
};
