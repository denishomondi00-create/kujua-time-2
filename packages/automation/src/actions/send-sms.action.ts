import type { AutomationContext, ActionResult } from '../types';

export interface SendSmsConfig {
  to?: string;
  body: string;
}

export async function executeSendSms(
  config: SendSmsConfig,
  context: AutomationContext,
  enqueueSms: (payload: Record<string, unknown>) => Promise<void>,
): Promise<ActionResult> {
  try {
    const recipient = config.to || (context.payload.clientPhone as string);
    if (!recipient) {
      return { actionType: 'send_sms', status: 'skipped', error: 'No phone number', executedAt: new Date() };
    }

    await enqueueSms({
      workspaceId: context.workspaceId,
      to: recipient,
      body: config.body,
      automationExecutionId: context.executionId,
    });

    return { actionType: 'send_sms', status: 'success', executedAt: new Date() };
  } catch (error: any) {
    return { actionType: 'send_sms', status: 'failed', error: error.message, executedAt: new Date() };
  }
}
