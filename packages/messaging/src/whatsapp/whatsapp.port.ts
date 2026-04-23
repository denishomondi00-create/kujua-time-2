export interface SendWhatsAppParams {
  to: string;
  templateName: string;
  variables?: Record<string, string>;
  language?: string;
}

export interface SendWhatsAppResult {
  messageId: string;
  provider: string;
}

export interface WhatsAppProvider {
  readonly provider: string;
  send(params: SendWhatsAppParams): Promise<SendWhatsAppResult>;
}
