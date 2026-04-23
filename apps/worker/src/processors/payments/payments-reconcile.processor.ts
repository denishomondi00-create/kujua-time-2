/**
 * Reconciles payment status with payment providers.
 * Processor for: payments.reconcile
 * Uses stricter retry and dead-letter behavior than notification processors.
 */
import { Worker, Job } from 'bullmq';
import type { ConnectionOptions } from 'bullmq';
import { PAYMENTS_RECONCILE_QUEUE_NAME, type PaymentReconcileJobData, PAYMENT_JOB_OPTIONS } from '@kujua-time/queue';
import { StripeAdapter, PaystackAdapter, type PaymentGateway } from '@kujua-time/payments';
import { createLogger } from '@kujua-time/observability';

const logger = createLogger('payments-reconcile');

function getGateway(provider: string): PaymentGateway {
  if (provider === 'stripe' && process.env.STRIPE_SECRET_KEY) {
    return new StripeAdapter(process.env.STRIPE_SECRET_KEY);
  }
  if (provider === 'paystack' && process.env.PAYSTACK_SECRET_KEY) {
    return new PaystackAdapter(process.env.PAYSTACK_SECRET_KEY);
  }
  throw new Error(`No gateway configured for provider: ${provider}`);
}

export function registerPaymentsReconcileProcessor(connection: ConnectionOptions, concurrency: number): Worker[] {
  const worker = new Worker<PaymentReconcileJobData>(
    PAYMENTS_RECONCILE_QUEUE_NAME,
    async (job: Job<PaymentReconcileJobData>) => {
      const { workspaceId, paymentIntentId, provider, providerPaymentId, idempotencyKey } = job.data;

      logger.info(`Reconciling payment ${providerPaymentId}`, { provider, workspaceId });

      const gateway = getGateway(provider);
      const verification = await gateway.verifyPayment(providerPaymentId);

      const mongoose = (await import('mongoose')).default;
      const Payment = mongoose.model('Payment');
      const PaymentIntentInternal = mongoose.model('PaymentIntentInternal');

      // Update internal payment intent
      await PaymentIntentInternal.updateOne(
        { _id: paymentIntentId },
        { $set: { status: verification.status === 'succeeded' ? 'succeeded' : 'failed' } },
      );

      // If succeeded, ensure payment record exists
      if (verification.status === 'succeeded') {
        await Payment.updateOne(
          { providerPaymentId },
          {
            $setOnInsert: {
              workspaceId,
              provider,
              providerPaymentId,
              amount: verification.amount,
              currency: verification.currency,
              status: 'succeeded',
              paidAt: new Date(),
            },
          },
          { upsert: true },
        );
      }

      logger.info(`Payment reconciled: ${providerPaymentId} → ${verification.status}`);
    },
    {
      connection,
      concurrency,
      ...PAYMENT_JOB_OPTIONS,
    },
  );

  return [worker];
}
