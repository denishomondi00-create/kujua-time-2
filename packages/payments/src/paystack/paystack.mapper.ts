import { PAYSTACK_PAYMENT_STATUS_MAP } from './paystack.constants';

export function mapPaystackStatus(status: string): string {
  return PAYSTACK_PAYMENT_STATUS_MAP[status] ?? 'pending';
}

/**
 * Paystack uses kobo (minor unit) for NGN, pesewas for GHS, etc.
 * Amount from Paystack API is already in minor units.
 */
export function paystackAmountToMinor(amount: number): number {
  return amount;
}

export function mapPaystackEventData(data: Record<string, unknown>): {
  providerPaymentId: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'failed';
  metadata: Record<string, string>;
} {
  return {
    providerPaymentId: String(data.reference ?? data.id),
    amount: Number(data.amount ?? 0),
    currency: String(data.currency ?? 'NGN').toUpperCase(),
    status: data.status === 'success' ? 'succeeded' : 'failed',
    metadata: (data.metadata as Record<string, string>) ?? {},
  };
}
