/**
 * Job payload contracts for notification queues.
 */

export interface EmailJobData {
  workspaceId: string;
  to: string;
  subject: string;
  body: string;
  templateId?: string;
  replyTo?: string;
  automationExecutionId?: string;
}

export interface SmsJobData {
  workspaceId: string;
  to: string;
  body: string;
  automationExecutionId?: string;
}

export interface WhatsappJobData {
  workspaceId: string;
  to: string;
  templateName: string;
  variables?: Record<string, string>;
  automationExecutionId?: string;
}

export const NOTIFICATION_JOB_NAMES = {
  SEND_EMAIL: 'notification:send-email',
  SEND_SMS: 'notification:send-sms',
  SEND_WHATSAPP: 'notification:send-whatsapp',
} as const;
