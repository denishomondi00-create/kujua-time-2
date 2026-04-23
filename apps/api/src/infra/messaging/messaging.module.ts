import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Messaging provider tokens.
 * Modules inject these to send transactional messages.
 * Adapters for Resend, Postmark, SMS, and WhatsApp providers
 * live in packages/messaging and are resolved here.
 */
export const EMAIL_PROVIDER = Symbol('EMAIL_PROVIDER');
export const SMS_PROVIDER = Symbol('SMS_PROVIDER');
export const WHATSAPP_PROVIDER = Symbol('WHATSAPP_PROVIDER');

/**
 * Email provider port interface.
 * Adapters in packages/messaging implement this contract.
 */
export interface EmailProvider {
  send(params: {
    to: string;
    from?: string;
    subject: string;
    html: string;
    text?: string;
    replyTo?: string;
    tags?: Array<{ name: string; value: string }>;
  }): Promise<{ id: string; provider: string }>;
}

/**
 * SMS provider port interface.
 */
export interface SmsProvider {
  send(params: {
    to: string;
    body: string;
    from?: string;
  }): Promise<{ id: string; provider: string }>;
}

/**
 * WhatsApp provider port interface.
 */
export interface WhatsAppProvider {
  send(params: {
    to: string;
    templateName: string;
    variables: Record<string, string>;
    language?: string;
  }): Promise<{ id: string; provider: string }>;
}

/**
 * Stub email provider for development.
 * Logs messages to console instead of sending.
 */
class DevEmailProvider implements EmailProvider {
  async send(params: { to: string; subject: string; html: string }) {
    console.log(`[DEV EMAIL] To: ${params.to} | Subject: ${params.subject}`);
    return { id: `dev-${Date.now()}`, provider: 'dev' };
  }
}

class DevSmsProvider implements SmsProvider {
  async send(params: { to: string; body: string }) {
    console.log(`[DEV SMS] To: ${params.to} | Body: ${params.body.substring(0, 80)}`);
    return { id: `dev-${Date.now()}`, provider: 'dev' };
  }
}

class DevWhatsAppProvider implements WhatsAppProvider {
  async send(params: { to: string; templateName: string }) {
    console.log(`[DEV WHATSAPP] To: ${params.to} | Template: ${params.templateName}`);
    return { id: `dev-${Date.now()}`, provider: 'dev' };
  }
}

@Global()
@Module({
  providers: [
    {
      provide: EMAIL_PROVIDER,
      inject: [ConfigService],
      useFactory: (config: ConfigService): EmailProvider => {
        const provider = config.get<string>('EMAIL_PROVIDER', 'dev');

        switch (provider) {
          // When packages/messaging adapters are wired:
          // case 'resend': return new ResendAdapter(config.get('RESEND_API_KEY'));
          // case 'postmark': return new PostmarkAdapter(config.get('POSTMARK_API_KEY'));
          default:
            return new DevEmailProvider();
        }
      },
    },
    {
      provide: SMS_PROVIDER,
      inject: [ConfigService],
      useFactory: (config: ConfigService): SmsProvider => {
        const provider = config.get<string>('SMS_PROVIDER', 'dev');

        switch (provider) {
          // case 'twilio': return new TwilioSmsAdapter(config);
          // case 'africastalking': return new AfricasTalkingAdapter(config);
          default:
            return new DevSmsProvider();
        }
      },
    },
    {
      provide: WHATSAPP_PROVIDER,
      inject: [ConfigService],
      useFactory: (config: ConfigService): WhatsAppProvider => {
        const provider = config.get<string>('WHATSAPP_PROVIDER', 'dev');

        switch (provider) {
          // case 'meta': return new MetaWhatsAppAdapter(config);
          default:
            return new DevWhatsAppProvider();
        }
      },
    },
  ],
  exports: [EMAIL_PROVIDER, SMS_PROVIDER, WHATSAPP_PROVIDER],
})
export class MessagingModule {}
