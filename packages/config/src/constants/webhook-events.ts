export const WEBHOOK_EVENTS = {
  BOOKING_CREATED: 'booking.created',
  BOOKING_CANCELED: 'booking.canceled',
  BOOKING_RESCHEDULED: 'booking.rescheduled',
  BOOKING_COMPLETED: 'booking.completed',
  BOOKING_NO_SHOW: 'booking.no_show',
  PAYMENT_SUCCEEDED: 'payment.succeeded',
  PAYMENT_FAILED: 'payment.failed',
  PAYMENT_REFUNDED: 'payment.refunded',
  INVOICE_CREATED: 'invoice.created',
  CLIENT_CREATED: 'client.created',
  FORM_SUBMITTED: 'form.submitted',
} as const;

export type WebhookEvent = (typeof WEBHOOK_EVENTS)[keyof typeof WEBHOOK_EVENTS];
