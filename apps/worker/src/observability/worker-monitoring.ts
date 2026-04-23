/**
 * Worker monitoring — logs worker lifecycle events, failed jobs, and health metrics.
 */
import type { Worker } from 'bullmq';
import { createLogger } from '@kujua-time/observability';
import { incrementCounter } from '@kujua-time/observability';

const logger = createLogger('worker-monitor');

export function setupWorkerMonitoring(workers: Worker[]): void {
  for (const worker of workers) {
    const queueName = worker.name;

    worker.on('completed', (job) => {
      incrementCounter('jobs.completed', 1, { queue: queueName });
      logger.debug(`Job completed: ${job?.name}`, { queue: queueName, jobId: job?.id });
    });

    worker.on('failed', (job, err) => {
      incrementCounter('jobs.failed', 1, { queue: queueName });
      logger.error(`Job failed: ${job?.name}`, {
        queue: queueName,
        jobId: job?.id,
        error: err.message,
        attemptsMade: job?.attemptsMade,
      });
    });

    worker.on('error', (err) => {
      incrementCounter('worker.errors', 1, { queue: queueName });
      logger.error(`Worker error in ${queueName}`, { error: err.message });
    });

    worker.on('stalled', (jobId) => {
      incrementCounter('jobs.stalled', 1, { queue: queueName });
      logger.warn(`Job stalled: ${jobId}`, { queue: queueName });
    });

    logger.info(`Monitoring registered for worker: ${queueName}`);
  }
}

export function logWorkerHealth(workers: Worker[]): Record<string, { running: boolean; name: string }> {
  const health: Record<string, { running: boolean; name: string }> = {};
  for (const worker of workers) {
    health[worker.name] = { running: worker.isRunning(), name: worker.name };
  }
  return health;
}
