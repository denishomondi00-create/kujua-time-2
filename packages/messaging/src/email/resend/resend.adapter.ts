import { Resend } from 'resend'
import type { EmailProvider, SendEmailParams, SendEmailResult } from '../email.port'

export class ResendAdapter implements EmailProvider {
  readonly provider = 'resend' as const
  private readonly client: Resend

  constructor(apiKey: string) {
    this.client = new Resend(apiKey)
  }

  async send(params: SendEmailParams): Promise<SendEmailResult> {
    const { data, error } = await this.client.emails.send({
      from: params.from,
      to: params.to,
      subject: params.subject,
      html: params.html,
      text: params.text,
      replyTo: params.replyTo,
      tags: params.tag ? [{ name: 'category', value: params.tag }] : undefined,
      headers: params.headers,
    })

    if (error) throw new Error(`Resend error: ${error.message}`)
    return { messageId: data?.id ?? '', provider: 'resend' }
  }

  async sendBatch(params: SendEmailParams[]): Promise<SendEmailResult[]> {
    const results: SendEmailResult[] = []
    for (const p of params) {
      results.push(await this.send(p))
    }
    return results
  }
}