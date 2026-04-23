export interface PostmarkWebhookEvent {
  RecordType: string;
  MessageID: string;
  Email: string;
  Type?: string;
  Description?: string;
  BouncedAt?: string;
  DeliveredAt?: string;
}

export function parsePostmarkWebhook(body: Record<string, unknown>): PostmarkWebhookEvent {
  return body as unknown as PostmarkWebhookEvent;
}

export function isDeliveryEvent(event: PostmarkWebhookEvent): boolean {
  return event.RecordType === 'Delivery';
}

export function isBounceEvent(event: PostmarkWebhookEvent): boolean {
  return event.RecordType === 'Bounce';
}
