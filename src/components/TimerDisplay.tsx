interface TimerDisplayProps {
  currentItem: string;
  timeRemaining: number;
  nextItem: string;
}

export const TimerDisplay = ({
  currentItem,
  timeRemaining,
  nextItem,
}: TimerDisplayProps) => {
  const isOvertime = timeRemaining < 0;
  const formatTime = (seconds: number) => {
    const absSeconds = Math.abs(seconds);
    const minutes = Math.floor(absSeconds / 60);
    const remainingSeconds = absSeconds % 60;
    return `${isOvertime ? '-' : ''}${minutes}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="text-center w-full max-w-7xl mx-auto px-4">
      <h2 className="text-5xl font-bold mb-6 tracking-wide">{currentItem}</h2>
      <div
        className={`text-[20vw] leading-none font-bold tracking-tight mb-12 ${
          isOvertime ? 'text-red-500' : 'text-white'
        }`}
      >
        {formatTime(timeRemaining)}
      </div>
      <div className="text-3xl text-gray-400 tracking-wider">
        NEXT UP: {nextItem}
      </div>
    </div>
  );
};

export default TimerDisplay;
