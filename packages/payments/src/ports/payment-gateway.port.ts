/**
 * Payment gateway port — provider-agnostic interface.
 * Stripe and Paystack adapters implement this contract.
 */

export interface CreateCheckoutParams {
  workspaceId: string;
  amount: number;
  currency: string;
  description?: string;
  customerEmail: string;
  customerName: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
  idempotencyKey: string;
}

export interface CheckoutSession {
  providerSessionId: string;
  checkoutUrl: string;
  expiresAt?: Date;
}

export interface VerifyWebhookParams {
  rawBody: string | Buffer;
  signature: string;
  secret: string;
}

export interface WebhookEvent {
  eventType: string;
  providerPaymentId: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'failed' | 'refunded';
  metadata?: Record<string, string>;
  raw: Record<string, unknown>;
}

export interface RefundParams {
  providerPaymentId: string;
  amount?: number;
  reason?: string;
  idempotencyKey: string;
}

export interface RefundResult {
  providerRefundId: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed';
}

export interface PaymentGateway {
  readonly provider: 'stripe' | 'paystack';

  createCheckoutSession(params: CreateCheckoutParams): Promise<CheckoutSession>;
  verifyWebhookSignature(params: VerifyWebhookParams): WebhookEvent;
  verifyPayment(providerPaymentId: string): Promise<{ status: string; amount: number; currency: string }>;
  refund(params: RefundParams): Promise<RefundResult>;
}
