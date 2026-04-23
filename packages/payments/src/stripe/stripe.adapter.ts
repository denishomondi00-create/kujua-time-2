import Stripe from 'stripe';
import type { PaymentGateway, CreateCheckoutParams, CheckoutSession, VerifyWebhookParams, WebhookEvent, RefundParams, RefundResult } from '../ports/payment-gateway.port';
import { STRIPE_API_VERSION, STRIPE_WEBHOOK_EVENTS } from './stripe.constants';
import { mapStripeCheckoutToEvent } from './stripe.mapper';

export class StripeAdapter implements PaymentGateway {
  readonly provider = 'stripe' as const;
  private readonly client: Stripe;

  constructor(secretKey: string) {
    this.client = new Stripe(secretKey, { apiVersion: STRIPE_API_VERSION });
  }

  async createCheckoutSession(params: CreateCheckoutParams): Promise<CheckoutSession> {
    const session = await this.client.checkout.sessions.create(
      {
        mode: 'payment',
        payment_method_types: ['card'],
        customer_email: params.customerEmail,
        line_items: [
          {
            price_data: {
              currency: params.currency.toLowerCase(),
              unit_amount: params.amount,
              product_data: { name: params.description ?? 'Booking Payment' },
            },
            quantity: 1,
          },
        ],
        success_url: params.successUrl,
        cancel_url: params.cancelUrl,
        metadata: { workspaceId: params.workspaceId, ...params.metadata },
        expires_at: Math.floor(Date.now() / 1000) + 1800,
      },
      { idempotencyKey: params.idempotencyKey },
    );

    return {
      providerSessionId: session.id,
      checkoutUrl: session.url!,
      expiresAt: session.expires_at ? new Date(session.expires_at * 1000) : undefined,
    };
  }

  verifyWebhookSignature(params: VerifyWebhookParams): WebhookEvent {
    const event = this.client.webhooks.constructEvent(
      params.rawBody as string,
      params.signature,
      params.secret,
    );

    if (event.type === STRIPE_WEBHOOK_EVENTS.CHECKOUT_COMPLETED) {
      const session = event.data.object as Stripe.Checkout.Session;
      const mapped = mapStripeCheckoutToEvent(session);
      return {
        eventType: event.type,
        providerPaymentId: mapped.providerPaymentId,
        amount: mapped.amount,
        currency: mapped.currency,
        status: mapped.status,
        metadata: mapped.metadata,
        raw: event.data.object as unknown as Record<string, unknown>,
      };
    }

    const pi = event.data.object as Stripe.PaymentIntent;
    return {
      eventType: event.type,
      providerPaymentId: pi.id,
      amount: pi.amount,
      currency: pi.currency.toUpperCase(),
      status: event.type === STRIPE_WEBHOOK_EVENTS.PAYMENT_SUCCEEDED ? 'succeeded' : 'failed',
      metadata: (pi.metadata as Record<string, string>) ?? {},
      raw: event.data.object as unknown as Record<string, unknown>,
    };
  }

  async verifyPayment(providerPaymentId: string): Promise<{ status: string; amount: number; currency: string }> {
    const pi = await this.client.paymentIntents.retrieve(providerPaymentId);
    return { status: pi.status, amount: pi.amount, currency: pi.currency.toUpperCase() };
  }

  async refund(params: RefundParams): Promise<RefundResult> {
    const refund = await this.client.refunds.create(
      {
        payment_intent: params.providerPaymentId,
        amount: params.amount,
        reason: (params.reason as Stripe.RefundCreateParams.Reason) ?? 'requested_by_customer',
      },
      { idempotencyKey: params.idempotencyKey },
    );

    return {
      providerRefundId: refund.id,
      amount: refund.amount,
      currency: refund.currency.toUpperCase(),
      status: refund.status === 'succeeded' ? 'succeeded' : 'pending',
    };
  }
}
