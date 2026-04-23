/**
 * Central registry for BullMQ Job Schedulers (repeatable/cron jobs).
 * Scheduler rules:
 * - Register recurring jobs centrally ONLY here
 * - Use upsert semantics
 * - Never scatter cron registration across API and worker runtimes
 * - Scheduler only registers repeatable work, it does NOT execute business logic
 */
import { Queue } from 'bullmq';
import type { ConnectionOptions } from 'bullmq';

export interface ScheduledJob {
  name: string;
  queueName: string;
  pattern: string; // cron pattern
  data?: Record<string, unknown>;
  description: string;
}

/**
 * All recurring jobs for the Kujua Time platform.
 */
export const SCHEDULED_JOBS: ScheduledJob[] = [
  {
    name: 'cleanup:expired-holds',
    queueName: 'cleanup.expiry',
    pattern: '*/5 * * * *', // every 5 minutes
    data: { task: 'expired-holds' },
    description: 'Clean up booking holds that have expired but were not TTL-deleted',
  },
  {
    name: 'calendar:health-check',
    queueName: 'calendar.sync',
    pattern: '0 */2 * * *', // every 2 hours
    data: { task: 'health-check' },
    description: 'Check health of all calendar connections and re-sync stale ones',
  },
  {
    name: 'reports:daily-rollup',
    queueName: 'analytics.project',
    pattern: '0 2 * * *', // 2 AM daily
    data: { task: 'daily-rollup' },
    description: 'Generate daily report snapshots for all active workspaces',
  },
  {
    name: 'automation:retry-stuck',
    queueName: 'automation.dispatch',
    pattern: '*/10 * * * *', // every 10 minutes
    data: { task: 'retry-stuck-events' },
    description: 'Retry unpublished domain events that may have been missed',
  },
  {
    name: 'cleanup:stale-checkouts',
    queueName: 'cleanup.expiry',
    pattern: '*/15 * * * *', // every 15 minutes
    data: { task: 'stale-checkouts' },
    description: 'Clean up ephemeral checkout sessions that were not completed',
  },
];

/**
 * Register all scheduled jobs using BullMQ upsert semantics.
 */
export async function registerAllScheduledJobs(
  connection: ConnectionOptions,
): Promise<void> {
  // Group jobs by queue
  const byQueue = new Map<string, ScheduledJob[]>();

  for (const job of SCHEDULED_JOBS) {
    const existing = byQueue.get(job.queueName) ?? [];
    existing.push(job);
    byQueue.set(job.queueName, existing);
  }

  for (const [queueName, jobs] of byQueue) {
    const queue = new Queue(queueName, { connection });

    for (const job of jobs) {
      await queue.upsertJobScheduler(
        job.name,
        { pattern: job.pattern },
        {
          name: job.name,
          data: job.data ?? {},
        },
      );
    }

    await queue.close();
  }
}

/**
 * Remove all registered scheduled jobs (for clean shutdown / testing).
 */
export async function removeAllScheduledJobs(
  connection: ConnectionOptions,
): Promise<void> {
  const queueNames = [...new Set(SCHEDULED_JOBS.map((j) => j.queueName))];

  for (const queueName of queueNames) {
    const queue = new Queue(queueName, { connection });
    const schedulers = await queue.getJobSchedulers();

    for (const scheduler of schedulers) {
      await queue.removeJobScheduler(scheduler.id!);
    }

    await queue.close();
  }
}
