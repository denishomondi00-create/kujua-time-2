export interface ResendWebhookEvent {
  type: string;
  data: {
    email_id: string;
    to: string[];
    created_at: string;
  };
}

export function parseResendWebhook(body: Record<string, unknown>): ResendWebhookEvent {
  return body as unknown as ResendWebhookEvent;
}

export function isResendDeliveryEvent(event: ResendWebhookEvent): boolean {
  return event.type === 'email.delivered';
}

export function isResendBounceEvent(event: ResendWebhookEvent): boolean {
  return event.type === 'email.bounced';
}
