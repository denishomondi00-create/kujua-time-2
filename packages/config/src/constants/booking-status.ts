export const BOOKING_STATUS = {
  PENDING_APPROVAL: 'pending_approval',
  CONFIRMED: 'confirmed',
  CANCELED: 'canceled',
  RESCHEDULED: 'rescheduled',
  COMPLETED: 'completed',
  NO_SHOW: 'no_show',
} as const;

export type BookingStatus = (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];
