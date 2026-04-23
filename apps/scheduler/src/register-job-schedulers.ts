/**
 * Registers additional scheduled jobs beyond the core queue package registry.
 * This is the extension point for scheduler-specific recurring work.
 */
import type { ConnectionOptions } from 'bullmq';
import { createLogger } from '@kujua-time/observability';
import { registerCalendarHealthScheduler } from './recurring/calendar-health.scheduler';
import { registerCleanupExpiredHoldsScheduler } from './recurring/cleanup-expired-holds.scheduler';
import { registerReportRollupsScheduler } from './recurring/report-rollups.scheduler';
import { registerRetryStuckEventsScheduler } from './recurring/retry-stuck-events.scheduler';

const logger = createLogger('register-schedulers');

export async function registerJobSchedulers(connection: ConnectionOptions): Promise<void> {
  // Each scheduler registration is idempotent via upsert
  await registerCalendarHealthScheduler(connection);
  await registerCleanupExpiredHoldsScheduler(connection);
  await registerReportRollupsScheduler(connection);
  await registerRetryStuckEventsScheduler(connection);

  logger.info('All custom job schedulers registered');
}
