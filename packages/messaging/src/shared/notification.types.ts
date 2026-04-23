export type NotificationChannel = 'email' | 'sms' | 'whatsapp' | 'push';

export type NotificationCategory =
  | 'auth'
  | 'booking-confirmations'
  | 'reminders'
  | 'billing'
  | 'marketing'
  | 'system-admin-alerts';

export interface NotificationLog {
  id: string;
  workspaceId: string;
  channel: NotificationChannel;
  category: NotificationCategory;
  recipient: string;
  subject?: string;
  status: 'queued' | 'sent' | 'delivered' | 'failed' | 'bounced';
  providerMessageId?: string;
  error?: string;
  sentAt?: Date;
  deliveredAt?: Date;
  automationExecutionId?: string;
}
