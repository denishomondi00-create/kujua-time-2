export const QUEUE_NAMES = {
  AUTOMATION_DISPATCH: 'automation.dispatch',
  AUTOMATION_EXECUTE: 'automation.execute',
  NOTIFICATIONS_EMAIL: 'notifications.email',
  NOTIFICATIONS_SMS: 'notifications.sms',
  NOTIFICATIONS_WHATSAPP: 'notifications.whatsapp',
  CALENDAR_SYNC: 'calendar.sync',
  PAYMENTS_RECONCILE: 'payments.reconcile',
  INVOICES_GENERATE: 'invoices.generate',
  WEBHOOKS_DELIVER: 'webhooks.deliver',
  ANALYTICS_PROJECT: 'analytics.project',
  CLEANUP_EXPIRY: 'cleanup.expiry',
} as const;

export type QueueName = (typeof QUEUE_NAMES)[keyof typeof QUEUE_NAMES];
