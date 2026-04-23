/**
 * Job payload contracts for outgoing webhook delivery queue.
 */

export interface WebhookDeliveryJobData {
  workspaceId: string;
  outgoingWebhookId: string;
  url: string;
  method: string;
  headers?: Record<string, string>;
  body: Record<string, unknown>;
  signingSecret?: string;
  attempt: number;
}

export const WEBHOOK_JOB_NAMES = {
  DELIVER: 'webhook:deliver',
} as const;
