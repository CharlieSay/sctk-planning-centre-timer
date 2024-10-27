import { Service, TimerItem } from '../types';

export const MOCK_SERVICES: Service[] = [
  {
    id: '1',
    name: 'SUNDAY MORNING SERVICE',
    date: '2024-03-17 9:00 AM',
    campus: 'Manchester',
    time: 'AM',
    serviceNumber: '9AM Service',
  },
  {
    id: '2',
    name: 'SUNDAY EVENING SERVICE',
    date: '2024-03-17 6:00 PM',
    campus: 'Manchester',
    time: 'PM',
    serviceNumber: '6PM Service',
  },
  {
    id: '3',
    name: 'WEDNESDAY NIGHT PRAYER',
    date: '2024-03-20 7:00 PM',
    campus: 'Manchester',
    time: 'PM',
    serviceNumber: '7PM Service',
  },
];

// Initial time when the mock timer starts
const INITIAL_TIME = 10; // 5 minutes
let mockStartTime = Date.now();

export function getMockCurrentItem(): TimerItem {
  if (!mockStartTime) {
    mockStartTime = Date.now();
  }

  const elapsedSeconds = Math.floor((Date.now() - mockStartTime) / 1000);
  const timeRemaining = INITIAL_TIME - elapsedSeconds;

  // Reset timer when it goes below -60 seconds (for demo purposes)
  if (timeRemaining < -60) {
    mockStartTime = Date.now();
  }

  return {
    name: 'WORSHIP SET',
    timeRemaining: timeRemaining,
    nextItem: 'WELCOME & ANNOUNCEMENTS',
  };
}
