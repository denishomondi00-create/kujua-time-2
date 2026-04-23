import type { AutomationContext, ActionResult } from '../types';

export interface AddTagConfig {
  tagName: string;
}

export async function executeAddTag(
  config: AddTagConfig,
  context: AutomationContext,
  addTagToClient: (workspaceId: string, clientId: string, tag: string) => Promise<void>,
): Promise<ActionResult> {
  try {
    const clientId = context.payload.clientId as string;
    if (!clientId) {
      return { actionType: 'add_tag', status: 'skipped', error: 'No clientId in payload', executedAt: new Date() };
    }

    await addTagToClient(context.workspaceId, clientId, config.tagName);
    return { actionType: 'add_tag', status: 'success', executedAt: new Date() };
  } catch (error: any) {
    return { actionType: 'add_tag', status: 'failed', error: error.message, executedAt: new Date() };
  }
}
