import type { SmsProvider, SendSmsParams, SendSmsResult } from '../sms.port';

/**
 * No-op SMS provider for development and testing.
 * Logs the message but does not send.
 */
export class NoopSmsProvider implements SmsProvider {
  readonly provider = 'noop';

  async send(params: SendSmsParams): Promise<SendSmsResult> {
    console.log(`[NoopSMS] To: ${params.to} | Body: ${params.body.substring(0, 100)}`);
    return { messageId: `noop-${Date.now()}`, provider: 'noop' };
  }
}
