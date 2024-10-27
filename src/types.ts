export interface Service {
  id: string;
  name: string;
  date: string;
  campus: string;
  time: string;
  serviceNumber: string;
}

export interface TimerItem {
  name: string;
  timeRemaining: number;
  nextItem: string;
}