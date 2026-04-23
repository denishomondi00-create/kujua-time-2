import crypto from 'crypto';
import type { PaymentGateway, CreateCheckoutParams, CheckoutSession, VerifyWebhookParams, WebhookEvent, RefundParams, RefundResult } from '../ports/payment-gateway.port';
import { PAYSTACK_BASE_URL } from './paystack.constants';
import { mapPaystackEventData } from './paystack.mapper';

export class PaystackAdapter implements PaymentGateway {
  readonly provider = 'paystack' as const;

  constructor(private readonly secretKey: string) {}

  private async request<T>(method: string, path: string, body?: Record<string, unknown>): Promise<T> {
    const res = await fetch(`${PAYSTACK_BASE_URL}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const json = await res.json() as { status: boolean; data: T; message?: string };
    if (!json.status) throw new Error(json.message ?? 'Paystack API error');
    return json.data;
  }

  async createCheckoutSession(params: CreateCheckoutParams): Promise<CheckoutSession> {
    const data = await this.request<{ authorization_url: string; access_code: string; reference: string }>(
      'POST',
      '/transaction/initialize',
      {
        email: params.customerEmail,
        amount: params.amount,
        currency: params.currency.toUpperCase(),
        callback_url: params.successUrl,
        reference: params.idempotencyKey,
        metadata: {
          workspaceId: params.workspaceId,
          customerName: params.customerName,
          ...params.metadata,
        },
      },
    );

    return {
      providerSessionId: data.reference,
      checkoutUrl: data.authorization_url,
    };
  }

  verifyWebhookSignature(params: VerifyWebhookParams): WebhookEvent {
    const hash = crypto.createHmac('sha512', params.secret)
      .update(typeof params.rawBody === 'string' ? params.rawBody : params.rawBody.toString('utf8'))
      .digest('hex');

    if (hash !== params.signature) {
      throw new Error('Invalid Paystack webhook signature');
    }

    const body = JSON.parse(typeof params.rawBody === 'string' ? params.rawBody : params.rawBody.toString('utf8'));
    const mapped = mapPaystackEventData(body.data);

    return {
      eventType: body.event,
      providerPaymentId: mapped.providerPaymentId,
      amount: mapped.amount,
      currency: mapped.currency,
      status: mapped.status,
      metadata: mapped.metadata,
      raw: body.data,
    };
  }

  async verifyPayment(reference: string): Promise<{ status: string; amount: number; currency: string }> {
    const data = await this.request<{ status: string; amount: number; currency: string }>(
      'GET',
      `/transaction/verify/${encodeURIComponent(reference)}`,
    );
    return { status: data.status, amount: data.amount, currency: data.currency.toUpperCase() };
  }

  async refund(params: RefundParams): Promise<RefundResult> {
    const data = await this.request<{ id: number; amount: number; currency: string; status: string }>(
      'POST',
      '/refund',
      {
        transaction: params.providerPaymentId,
        amount: params.amount,
        merchant_note: params.reason,
      },
    );

    return {
      providerRefundId: String(data.id),
      amount: data.amount,
      currency: data.currency.toUpperCase(),
      status: data.status === 'processed' ? 'succeeded' : 'pending',
    };
  }
}
