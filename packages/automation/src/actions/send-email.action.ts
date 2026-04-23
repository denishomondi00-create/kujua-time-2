/**
 * Send email automation action.
 * Enqueues an email job on the notifications.email queue.
 */
import type { AutomationContext, ActionResult } from '../types';

export interface SendEmailConfig {
  to?: string;       // defaults to client email from context
  subject: string;
  body: string;
  templateId?: string;
  replyTo?: string;
}

export async function executeSendEmail(
  config: SendEmailConfig,
  context: AutomationContext,
  enqueueEmail: (payload: Record<string, unknown>) => Promise<void>,
): Promise<ActionResult> {
  try {
    const recipient = config.to || (context.payload.clientEmail as string);
    if (!recipient) {
      return { actionType: 'send_email', status: 'skipped', error: 'No recipient email', executedAt: new Date() };
    }

    await enqueueEmail({
      workspaceId: context.workspaceId,
      to: recipient,
      subject: config.subject,
      body: config.body,
      templateId: config.templateId,
      replyTo: config.replyTo,
      automationExecutionId: context.executionId,
    });

    return { actionType: 'send_email', status: 'success', executedAt: new Date() };
  } catch (error: any) {
    return { actionType: 'send_email', status: 'failed', error: error.message, executedAt: new Date() };
  }
}
