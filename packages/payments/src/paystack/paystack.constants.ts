export const PAYSTACK_BASE_URL = 'https://api.paystack.co';

export const PAYSTACK_WEBHOOK_EVENTS = {
  CHARGE_SUCCESS: 'charge.success',
  TRANSFER_SUCCESS: 'transfer.success',
  TRANSFER_FAILED: 'transfer.failed',
  REFUND_PROCESSED: 'refund.processed',
} as const;

export const PAYSTACK_SUPPORTED_CURRENCIES = ['NGN', 'GHS', 'ZAR', 'KES', 'USD'] as const;

export const PAYSTACK_PAYMENT_STATUS_MAP: Record<string, string> = {
  success: 'succeeded',
  failed: 'failed',
  abandoned: 'canceled',
  pending: 'processing',
};
