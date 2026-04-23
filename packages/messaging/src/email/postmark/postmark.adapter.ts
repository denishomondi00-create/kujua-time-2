import type { EmailProvider, SendEmailParams, SendEmailResult } from '../email.port';

interface PostmarkMessage {
  From: string;
  To: string;
  Subject: string;
  HtmlBody?: string;
  TextBody?: string;
  ReplyTo?: string;
  Tag?: string;
  MessageStream?: string;
  Headers?: Array<{ Name: string; Value: string }>;
}

export class PostmarkAdapter implements EmailProvider {
  readonly provider = 'postmark' as const;

  constructor(private readonly serverToken: string) {}

  private async request<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`https://api.postmarkapp.com${path}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': this.serverToken,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(`Postmark error: ${(error as any).Message ?? res.statusText}`);
    }

    return res.json() as Promise<T>;
  }

  async send(params: SendEmailParams): Promise<SendEmailResult> {
    const msg = this.mapMessage(params);
    const result = await this.request<{ MessageID: string }>('/email', msg);
    return { messageId: result.MessageID, provider: 'postmark' };
  }

  async sendBatch(params: SendEmailParams[]): Promise<SendEmailResult[]> {
    const messages = params.map((p) => this.mapMessage(p));
    const results = await this.request<Array<{ MessageID: string }>>('/email/batch', messages);
    return results.map((r) => ({ messageId: r.MessageID, provider: 'postmark' }));
  }

  private mapMessage(params: SendEmailParams): PostmarkMessage {
    return {
      From: params.from,
      To: params.to,
      Subject: params.subject,
      HtmlBody: params.html,
      TextBody: params.text,
      ReplyTo: params.replyTo,
      Tag: params.tag,
      MessageStream: params.messageStream ?? 'outbound',
      Headers: params.headers
        ? Object.entries(params.headers).map(([Name, Value]) => ({ Name, Value }))
        : undefined,
    };
  }
}
