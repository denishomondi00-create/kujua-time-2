import type { AutomationContext, ActionResult } from '../types';

export interface CallWebhookConfig {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  includePayload?: boolean;
}

export async function executeCallWebhook(
  config: CallWebhookConfig,
  context: AutomationContext,
  enqueueWebhook: (payload: Record<string, unknown>) => Promise<void>,
): Promise<ActionResult> {
  try {
    await enqueueWebhook({
      workspaceId: context.workspaceId,
      url: config.url,
      method: config.method ?? 'POST',
      headers: config.headers,
      body: config.includePayload !== false ? context.payload : {},
      automationExecutionId: context.executionId,
    });

    return { actionType: 'call_webhook', status: 'success', executedAt: new Date() };
  } catch (error: any) {
    return { actionType: 'call_webhook', status: 'failed', error: error.message, executedAt: new Date() };
  }
}
