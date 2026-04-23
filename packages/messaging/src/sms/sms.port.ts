export interface SendSmsParams {
  to: string;
  body: string;
  from?: string;
}

export interface SendSmsResult {
  messageId: string;
  provider: string;
}

export interface SmsProvider {
  readonly provider: string;
  send(params: SendSmsParams): Promise<SendSmsResult>;
}
