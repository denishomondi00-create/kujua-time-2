export const STRIPE_API_VERSION = '2024-06-20' as const;

export const STRIPE_WEBHOOK_EVENTS = {
  CHECKOUT_COMPLETED: 'checkout.session.completed',
  PAYMENT_SUCCEEDED: 'payment_intent.succeeded',
  PAYMENT_FAILED: 'payment_intent.payment_failed',
  CHARGE_REFUNDED: 'charge.refunded',
} as const;

export const STRIPE_PAYMENT_STATUS_MAP: Record<string, string> = {
  succeeded: 'succeeded',
  requires_payment_method: 'failed',
  canceled: 'canceled',
  processing: 'processing',
  requires_action: 'processing',
};
