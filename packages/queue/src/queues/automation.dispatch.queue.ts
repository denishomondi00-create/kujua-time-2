/**
 * Scans unpublished domain events and fans out to automation.execute
 * Queue name: automation.dispatch
 */
import { Queue, QueueOptions } from 'bullmq';
import type { ConnectionOptions } from 'bullmq';

export const AUTOMATION_DISPATCH_QUEUE_NAME = 'automation.dispatch';

export function createAutomationDispatchQueue(
  connection: ConnectionOptions,
  opts?: Partial<QueueOptions>,
): Queue {
  return new Queue('automation.dispatch', {
    connection,
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: 'exponential', delay: 2_000 },
      removeOnComplete: { count: 1000, age: 86_400 },
      removeOnFail: { count: 5000 },
    },
    ...opts,
  });
}
