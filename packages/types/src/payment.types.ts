export type PaymentProvider = 'stripe' | 'paystack';
export type PaymentStatus = 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded' | 'partial_refund' | 'canceled';

export interface PaymentBase {
  workspaceId: string;
  bookingId?: string;
  clientId?: string;
  provider: PaymentProvider;
  providerPaymentId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
}

export interface CheckoutRequest {
  workspaceId: string;
  bookingHoldId: string;
  eventTypeId: string;
  amount: number;
  currency: string;
  provider: PaymentProvider;
  successUrl: string;
  cancelUrl: string;
  clientEmail: string;
  clientName: string;
  description?: string;
}

export interface CheckoutResult {
  paymentIntentId: string;
  providerIntentId: string;
  checkoutUrl?: string;
  accessCode?: string;
  provider: PaymentProvider;
}

export interface WebhookVerification {
  isValid: boolean;
  eventType: string;
  providerPaymentId: string;
  amount: number;
  currency: string;
  metadata?: Record<string, unknown>;
}
