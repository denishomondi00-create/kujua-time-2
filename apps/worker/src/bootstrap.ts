/**
 * Worker bootstrap — connects to Redis and MongoDB, registers all BullMQ processors.
 *
 * Worker rules:
 * - Each processor has explicit concurrency settings
 * - Payment processors use stricter retry and dead-letter behavior
 * - All jobs must be idempotent
 * - Failures write structured logs and metrics
 */
import mongoose from 'mongoose';
import { parseWorkerEnv } from '@kujua-time/config';
import { buildConnectionOptions } from '@kujua-time/queue';
import { createLogger } from '@kujua-time/observability';
import { initSentry } from '@kujua-time/observability';
import { registerAutomationProcessors } from './processors/automation/automation-dispatch.processor';
import { registerAutomationExecuteProcessor } from './processors/automation/automation-execute.processor';
import { registerEmailProcessor } from './processors/notifications/email.processor';
import { registerSmsProcessor } from './processors/notifications/sms.processor';
import { registerWhatsappProcessor } from './processors/notifications/whatsapp.processor';
import { registerCalendarSyncProcessor } from './processors/calendar-sync/calendar-sync.processor';
import { registerPaymentsReconcileProcessor } from './processors/payments/payments-reconcile.processor';
import { registerInvoicesGenerateProcessor } from './processors/invoices/invoices-generate.processor';
import { registerWebhooksDeliverProcessor } from './processors/webhooks/webhooks-deliver.processor';
import { registerAnalyticsProjectProcessor } from './processors/analytics/analytics-project.processor';
import { registerCleanupExpiryProcessor } from './processors/cleanup/cleanup-expiry.processor';
import { setupWorkerMonitoring } from './observability/worker-monitoring';

const logger = createLogger('worker');

async function bootstrap(): Promise<void> {
  const env = parseWorkerEnv();

  // Sentry
  initSentry(env.SENTRY_DSN, 'kujua-time-worker', env.NODE_ENV);

  // MongoDB
  await mongoose.connect(env.MONGODB_URI);
  logger.info('MongoDB connected');

  // Redis connection for BullMQ
  const connection = buildConnectionOptions({ url: env.REDIS_URL });
  const concurrency = env.WORKER_CONCURRENCY;

  // Register all processors
  const workers = [
    registerAutomationProcessors(connection, concurrency),
    registerAutomationExecuteProcessor(connection, concurrency),
    registerEmailProcessor(connection, concurrency),
    registerSmsProcessor(connection, concurrency),
    registerWhatsappProcessor(connection, concurrency),
    registerCalendarSyncProcessor(connection, concurrency),
    registerPaymentsReconcileProcessor(connection, Math.max(1, Math.floor(concurrency / 2))),
    registerInvoicesGenerateProcessor(connection, concurrency),
    registerWebhooksDeliverProcessor(connection, concurrency),
    registerAnalyticsProjectProcessor(connection, Math.max(1, Math.floor(concurrency / 2))),
    registerCleanupExpiryProcessor(connection, 1),
  ];

  // Monitoring
  setupWorkerMonitoring(workers.flat());

  logger.info(`Worker started with concurrency=${concurrency}, processors=${workers.flat().length}`);

  // Graceful shutdown
  const shutdown = async (signal: string) => {
    logger.info(`Received ${signal}, shutting down gracefully...`);
    await Promise.all(workers.flat().map((w) => w.close()));
    await mongoose.disconnect();
    process.exit(0);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

bootstrap().catch((err) => {
  logger.error('Worker failed to start', { error: err.message });
  process.exit(1);
});
