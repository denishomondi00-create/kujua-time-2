/**
 * Job payload contracts for payment reconciliation queue.
 * Payment processors use stricter retry and dead-letter behavior.
 */

export interface PaymentReconcileJobData {
  workspaceId: string;
  paymentIntentId: string;
  provider: 'stripe' | 'paystack';
  providerPaymentId: string;
  idempotencyKey: string;
}

export const PAYMENT_JOB_NAMES = {
  RECONCILE: 'payment:reconcile',
} as const;

/** Stricter job options for payment processing */
export const PAYMENT_JOB_OPTIONS = {
  attempts: 5,
  backoff: { type: 'exponential' as const, delay: 5_000 },
  removeOnComplete: { count: 2000, age: 7 * 86_400 }, // keep 7 days
  removeOnFail: { count: 10_000 }, // keep all failures for audit
};
