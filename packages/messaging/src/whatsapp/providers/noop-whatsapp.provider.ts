import type { WhatsAppProvider, SendWhatsAppParams, SendWhatsAppResult } from '../whatsapp.port';

export class NoopWhatsAppProvider implements WhatsAppProvider {
  readonly provider = 'noop';

  async send(params: SendWhatsAppParams): Promise<SendWhatsAppResult> {
    console.log(`[NoopWhatsApp] To: ${params.to} | Template: ${params.templateName}`);
    return { messageId: `noop-wa-${Date.now()}`, provider: 'noop' };
  }
}
