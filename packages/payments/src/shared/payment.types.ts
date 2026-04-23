export type PaymentProvider = 'stripe' | 'paystack';
export type PaymentStatus = 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded' | 'partial_refund' | 'canceled';

export interface PaymentRecord {
  id: string;
  workspaceId: string;
  bookingId?: string;
  clientId?: string;
  provider: PaymentProvider;
  providerPaymentId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paidAt?: Date;
  refundedAt?: Date;
  refundAmount?: number;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}
