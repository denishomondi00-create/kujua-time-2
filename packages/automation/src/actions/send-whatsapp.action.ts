import type { AutomationContext, ActionResult } from '../types';

export interface SendWhatsappConfig {
  to?: string;
  templateName: string;
  variables?: Record<string, string>;
}

export async function executeSendWhatsapp(
  config: SendWhatsappConfig,
  context: AutomationContext,
  enqueueWhatsapp: (payload: Record<string, unknown>) => Promise<void>,
): Promise<ActionResult> {
  try {
    const recipient = config.to || (context.payload.clientPhone as string);
    if (!recipient) {
      return { actionType: 'send_whatsapp', status: 'skipped', error: 'No WhatsApp number', executedAt: new Date() };
    }

    await enqueueWhatsapp({
      workspaceId: context.workspaceId,
      to: recipient,
      templateName: config.templateName,
      variables: config.variables,
      automationExecutionId: context.executionId,
    });

    return { actionType: 'send_whatsapp', status: 'success', executedAt: new Date() };
  } catch (error: any) {
    return { actionType: 'send_whatsapp', status: 'failed', error: error.message, executedAt: new Date() };
  }
}
