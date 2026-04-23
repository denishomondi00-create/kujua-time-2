/**
 * Executes matched automation rule actions
 * Queue name: automation.execute
 */
import { Queue, QueueOptions } from 'bullmq';
import type { ConnectionOptions } from 'bullmq';

export const AUTOMATION_EXECUTE_QUEUE_NAME = 'automation.execute';

export function createAutomationExecuteQueue(
  connection: ConnectionOptions,
  opts?: Partial<QueueOptions>,
): Queue {
  return new Queue('automation.execute', {
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
