import { useEffect, useState } from 'react';

interface TimerProps {
  isRunning: boolean;
}

function Timer({ isRunning }: Readonly<TimerProps>) {
  const [time, setTime] = useState(300);

  useEffect(() => {
    let interval: number;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="text-center">
      <div className="inline-block bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-700">
        <div className="text-6xl font-mono tracking-wider text-blue-400">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>
      <div className="mt-4 text-gray-400">Current Item: Opening Prayer</div>
    </div>
  );
}

export default Timer;
