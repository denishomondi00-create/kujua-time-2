/**
 * Executes matched automation rule actions.
 * Processor for: automation.execute
 */
import { Worker, Job, Queue } from 'bullmq';
import type { ConnectionOptions } from 'bullmq';
import { AUTOMATION_EXECUTE_QUEUE_NAME, NOTIFICATIONS_EMAIL_QUEUE_NAME, type AutomationExecuteJobData } from '@kujua-time/queue';
import { executeSendEmail } from '@kujua-time/automation';
import { createLogger } from '@kujua-time/observability';

const logger = createLogger('automation-execute');

export function registerAutomationExecuteProcessor(connection: ConnectionOptions, concurrency: number): Worker[] {
  const emailQueue = new Queue(NOTIFICATIONS_EMAIL_QUEUE_NAME, { connection });

  const worker = new Worker<AutomationExecuteJobData>(
    AUTOMATION_EXECUTE_QUEUE_NAME,
    async (job: Job<AutomationExecuteJobData>) => {
      const { workspaceId, automationRuleId, executionId, eventName, eventPayload, actions } = job.data;

      logger.info(`Executing automation rule ${automationRuleId}`, { executionId, eventName });

      const results: Array<{ actionType: string; status: string; error?: string }> = [];

      for (const action of actions) {
        try {
          if (action.type === 'send_email') {
            const result = await executeSendEmail(
              action.config as any,
              { workspaceId, eventName: eventName as any, payload: eventPayload, automationRuleId, executionId },
              async (payload) => {
                await emailQueue.add('notification:send-email', payload);
              },
            );
            results.push(result);
          } else if (action.type === 'add_tag') {
            // Tag action handled via DB update
            const mongoose = (await import('mongoose')).default;
            const Client = mongoose.model('Client');
            const clientId = eventPayload.clientId as string;
            const tag = (action.config as any).tag as string;
            if (clientId && tag) {
              await Client.updateOne({ _id: clientId }, { $addToSet: { tags: tag } });
              results.push({ actionType: 'add_tag', status: 'success' });
            }
          } else if (action.type === 'call_webhook') {
            // Delegate to webhooks queue
            const webhookQueue = new Queue('webhooks.deliver', { connection });
            await webhookQueue.add('webhook:deliver', {
              workspaceId,
              url: (action.config as any).url,
              method: (action.config as any).method ?? 'POST',
              body: eventPayload,
              attempt: 1,
            });
            await webhookQueue.close();
            results.push({ actionType: 'call_webhook', status: 'success' });
          } else {
            results.push({ actionType: action.type, status: 'skipped', error: `Unsupported action: ${action.type}` });
          }
        } catch (err: any) {
          logger.error(`Action ${action.type} failed`, { error: err.message, executionId });
          results.push({ actionType: action.type, status: 'failed', error: err.message });
        }
      }

      // Write execution log
      const mongoose = (await import('mongoose')).default;
      const AutomationExecution = mongoose.model('AutomationExecution');
      await AutomationExecution.create({
        workspaceId,
        automationRuleId,
        executionId,
        eventName,
        eventPayload,
        actions: results,
        status: results.every((r) => r.status === 'success') ? 'completed' : 'partial',
        completedAt: new Date(),
      });
    },
    { connection, concurrency },
  );

  return [worker];
}
