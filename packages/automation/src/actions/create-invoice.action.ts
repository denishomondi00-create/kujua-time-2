import type { AutomationContext, ActionResult } from '../types';

export interface CreateInvoiceConfig {
  description?: string;
  includeBookingAmount?: boolean;
}

export async function executeCreateInvoice(
  config: CreateInvoiceConfig,
  context: AutomationContext,
  createInvoice: (payload: Record<string, unknown>) => Promise<void>,
): Promise<ActionResult> {
  try {
    const clientId = context.payload.clientId as string;
    const bookingId = context.payload.bookingId as string;
    const amount = context.payload.amount as number;

    if (!clientId) {
      return { actionType: 'create_invoice', status: 'skipped', error: 'No clientId', executedAt: new Date() };
    }

    await createInvoice({
      workspaceId: context.workspaceId,
      clientId,
      bookingId,
      amount: config.includeBookingAmount ? amount : undefined,
      description: config.description,
      automationExecutionId: context.executionId,
    });

    return { actionType: 'create_invoice', status: 'success', executedAt: new Date() };
  } catch (error: any) {
    return { actionType: 'create_invoice', status: 'failed', error: error.message, executedAt: new Date() };
  }
}
