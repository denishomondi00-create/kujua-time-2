/**
 * Email provider port — provider-agnostic email interface.
 * Postmark and Resend adapters implement this contract.
 */

export interface SendEmailParams {
  from: string;
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  tag?: string;
  messageStream?: string;
  headers?: Record<string, string>;
}

export interface SendEmailResult {
  messageId: string;
  provider: string;
}

export interface EmailProvider {
  readonly provider: 'postmark' | 'resend';
  send(params: SendEmailParams): Promise<SendEmailResult>;
  sendBatch(params: SendEmailParams[]): Promise<SendEmailResult[]>;
}
