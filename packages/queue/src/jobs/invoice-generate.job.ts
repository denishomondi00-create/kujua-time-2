/**
 * Job payload contracts for invoice generation queue.
 */

export interface InvoiceGenerateJobData {
  workspaceId: string;
  clientId: string;
  bookingId?: string;
  amount?: number;
  currency?: string;
  description?: string;
  autoSend?: boolean;
  automationExecutionId?: string;
}

export const INVOICE_JOB_NAMES = {
  GENERATE: 'invoice:generate',
} as const;
