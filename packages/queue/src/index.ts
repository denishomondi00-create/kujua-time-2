// Connection
export { buildConnectionOptions } from './connection';
export type { QueueConnectionConfig } from './connection';

// Queue factories
export { createAutomationDispatchQueue, AUTOMATION_DISPATCH_QUEUE_NAME } from './queues/automation.dispatch.queue';
export { createAutomationExecuteQueue, AUTOMATION_EXECUTE_QUEUE_NAME } from './queues/automation.execute.queue';
export { createNotificationsEmailQueue, NOTIFICATIONS_EMAIL_QUEUE_NAME } from './queues/notifications.email.queue';
export { createNotificationsSmsQueue, NOTIFICATIONS_SMS_QUEUE_NAME } from './queues/notifications.sms.queue';
export { createNotificationsWhatsappQueue, NOTIFICATIONS_WHATSAPP_QUEUE_NAME } from './queues/notifications.whatsapp.queue';
export { createCalendarSyncQueue, CALENDAR_SYNC_QUEUE_NAME } from './queues/calendar.sync.queue';
export { createPaymentsReconcileQueue, PAYMENTS_RECONCILE_QUEUE_NAME } from './queues/payments.reconcile.queue';
export { createInvoicesGenerateQueue, INVOICES_GENERATE_QUEUE_NAME } from './queues/invoices.generate.queue';
export { createWebhooksDeliverQueue, WEBHOOKS_DELIVER_QUEUE_NAME } from './queues/webhooks.deliver.queue';
export { createAnalyticsProjectQueue, ANALYTICS_PROJECT_QUEUE_NAME } from './queues/analytics.project.queue';
export { createCleanupExpiryQueue, CLEANUP_EXPIRY_QUEUE_NAME } from './queues/cleanup.expiry.queue';

// Job contracts
export * from './jobs/automation.job';
export * from './jobs/notification.job';
export * from './jobs/calendar-sync.job';
export * from './jobs/payment-reconcile.job';
export * from './jobs/invoice-generate.job';
export * from './jobs/webhook-delivery.job';

// Schedulers
export { registerAllScheduledJobs, removeAllScheduledJobs, SCHEDULED_JOBS } from './schedulers/scheduler-registry';
export type { ScheduledJob } from './schedulers/scheduler-registry';

// Flows
export { enqueueBookingSequence } from './flows/booking-sequence.flow';
export type { BookingSequenceInput } from './flows/booking-sequence.flow';
