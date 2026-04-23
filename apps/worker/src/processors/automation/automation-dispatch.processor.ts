/**
 * Scans unpublished domain events and fans out to automation.execute queue.
 * Processor for: automation.dispatch
 */
import { Worker, Job } from 'bullmq';
import type { ConnectionOptions } from 'bullmq';
import { AUTOMATION_DISPATCH_QUEUE_NAME, AUTOMATION_EXECUTE_QUEUE_NAME, type AutomationDispatchJobData } from '@kujua-time/queue';
import { matchRules, type StoredAutomationRule } from '@kujua-time/automation';
import { createLogger } from '@kujua-time/observability';
import { Queue } from 'bullmq';

const logger = createLogger('automation-dispatch');

export function registerAutomationProcessors(connection: ConnectionOptions, concurrency: number): Worker[] {
  const executeQueue = new Queue(AUTOMATION_EXECUTE_QUEUE_NAME, { connection });

  const worker = new Worker<AutomationDispatchJobData>(
    AUTOMATION_DISPATCH_QUEUE_NAME,
    async (job: Job<AutomationDispatchJobData>) => {
      // Handle scheduled retry-stuck-events task
      if ((job.data as any).task === 'retry-stuck-events') {
        return handleRetryStuckEvents();
      }

      const { domainEventIds } = job.data;
      if (!domainEventIds?.length) return;

      logger.info(`Processing ${domainEventIds.length} domain events`, { jobId: job.id });

      // Fetch domain events from DB
      const mongoose = (await import('mongoose')).default;
      const DomainEvent = mongoose.model('DomainEvent');
      const AutomationRule = mongoose.model('AutomationRule');

      for (const eventId of domainEventIds) {
        try {
          const event = await DomainEvent.findById(eventId).lean();
          if (!event || (event as any).published) continue;

          const workspaceId = (event as any).workspaceId.toString();
          const rules = await AutomationRule.find({ workspaceId, enabled: true }).lean() as unknown as StoredAutomationRule[];

          const matches = matchRules(rules, (event as any).name, (event as any).payload ?? {});

          for (const match of matches) {
            const executionId = `exec-${eventId}-${match.ruleId}-${Date.now()}`;

            await executeQueue.add('automation:execute', {
              workspaceId,
              automationRuleId: match.ruleId,
              executionId,
              eventName: (event as any).name,
              eventPayload: (event as any).payload ?? {},
              actions: match.actions,
            }, {
              delay: match.timing?.delayMinutes ? match.timing.delayMinutes * 60_000 : undefined,
            });
          }

          // Mark event as published
          await DomainEvent.updateOne({ _id: eventId }, { $set: { published: true, publishedAt: new Date() } });
        } catch (err: any) {
          logger.error(`Failed to dispatch event ${eventId}`, { error: err.message });
        }
      }
    },
    { connection, concurrency },
  );

  return [worker];
}

async function handleRetryStuckEvents(): Promise<void> {
  const mongoose = (await import('mongoose')).default;
  const DomainEvent = mongoose.model('DomainEvent');

  const stuckEvents = await DomainEvent.find({
    published: { $ne: true },
    createdAt: { $lt: new Date(Date.now() - 60_000) }, // older than 1 min
  }).limit(100).lean();

  if (stuckEvents.length > 0) {
    logger.info(`Found ${stuckEvents.length} stuck domain events to retry`);
  }
}
