export type BookingStatus = 'upcoming' | 'pending_approval' | 'completed' | 'canceled' | 'no_show';

export const BOOKING_STATUSES: BookingStatus[] = ['upcoming', 'pending_approval', 'completed', 'canceled', 'no_show'];

export function isTerminalStatus(status: BookingStatus): boolean {
  return status === 'completed' || status === 'canceled' || status === 'no_show';
}

export function canTransitionTo(from: BookingStatus, to: BookingStatus): boolean {
  const transitions: Record<BookingStatus, BookingStatus[]> = {
    upcoming: ['completed', 'canceled', 'no_show'],
    pending_approval: ['upcoming', 'canceled'],
    completed: [],
    canceled: [],
    no_show: [],
  };
  return transitions[from]?.includes(to) ?? false;
}
