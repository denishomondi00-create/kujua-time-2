/**
 * Scheduler bootstrap — registers all recurring BullMQ Job Schedulers.
 *
 * Scheduler rules:
 * - Register recurring jobs centrally ONLY here
 * - Use upsert semantics
 * - Never scatter cron registration across API and worker runtimes
 * - Scheduler only registers repeatable work, it does NOT execute business logic
 */
import { parseSchedulerEnv } from '@kujua-time/config';
import { buildConnectionOptions, registerAllScheduledJobs } from '@kujua-time/queue';
import { createLogger, initSentry } from '@kujua-time/observability';
import { registerJobSchedulers } from './register-job-schedulers';

const logger = createLogger('scheduler');

async function bootstrap(): Promise<void> {
  const env = parseSchedulerEnv();

  initSentry(env.SENTRY_DSN, 'kujua-time-scheduler', env.NODE_ENV);

  const connection = buildConnectionOptions({ url: env.REDIS_URL });

  logger.info('Registering all scheduled jobs...');

  // Register jobs from the queue package registry
  await registerAllScheduledJobs(connection);

  // Register any scheduler-specific jobs
  await registerJobSchedulers(connection);

  logger.info('All scheduled jobs registered successfully');

  // Keep the process alive to maintain Job Schedulers
  // In production, the scheduler can exit after registration
  // BullMQ persists schedulers in Redis
  if (env.NODE_ENV === 'development') {
    logger.info('Scheduler running in dev mode — keeping process alive');
    setInterval(() => {}, 60_000);
  } else {
    logger.info('Scheduler registered jobs and exiting');
    process.exit(0);
  }
}

bootstrap().catch((err) => {
  logger.error('Scheduler failed to start', { error: err.message });
  process.exit(1);
});
