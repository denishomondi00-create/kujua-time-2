import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Payment gateway port.
 * Adapters for Stripe and Paystack in packages/payments implement this.
 *
 * Architecture rule: one internal checkout session per booking hold,
 * one PaymentIntent per booking. Webhook-driven final confirmation.
 * Never trust callback URL alone for Paystack — always verify server-side.
 */
export const STRIPE_PROVIDER = Symbol('STRIPE_PROVIDER');
export const PAYSTACK_PROVIDER = Symbol('PAYSTACK_PROVIDER');

export interface PaymentGateway {
  readonly provider: 'stripe' | 'paystack';

  createCheckoutSession(params: {
    amount: number;
    currency: string;
    description: string;
    customerEmail: string;
    metadata: Record<string, string>;
    successUrl: string;
    cancelUrl: string;
    idempotencyKey?: string;
  }): Promise<{
    sessionId: string;
    checkoutUrl: string;
    providerRef: string;
  }>;

  verifyPayment(providerRef: string): Promise<{
    status: 'succeeded' | 'pending' | 'failed';
    amount: number;
    currency: string;
    metadata: Record<string, string>;
  }>;

  refund(params: {
    providerRef: string;
    amount?: number;
    reason?: string;
  }): Promise<{
    refundId: string;
    status: string;
  }>;

  constructWebhookEvent(payload: Buffer | string, signature: string): any;
}

/**
 * Stub payment gateway for development / testing.
 */
class DevPaymentGateway implements PaymentGateway {
  constructor(public readonly provider: 'stripe' | 'paystack') {}

  async createCheckoutSession(params: any) {
    const sessionId = `dev-session-${Date.now()}`;
    console.log(`[DEV ${this.provider.toUpperCase()}] Checkout: ${params.amount} ${params.currency}`);
    return {
      sessionId,
      checkoutUrl: `http://localhost:3000/dev-checkout/${sessionId}`,
      providerRef: `dev-ref-${Date.now()}`,
    };
  }

  async verifyPayment(_providerRef: string) {
    return { status: 'succeeded' as const, amount: 0, currency: 'usd', metadata: {} };
  }

  async refund(_params: any) {
    return { refundId: `dev-refund-${Date.now()}`, status: 'succeeded' };
  }

  constructWebhookEvent(payload: Buffer | string, _signature: string) {
    return typeof payload === 'string' ? JSON.parse(payload) : JSON.parse(payload.toString());
  }
}

@Global()
@Module({
  providers: [
    {
      provide: STRIPE_PROVIDER,
      inject: [ConfigService],
      useFactory: (config: ConfigService): PaymentGateway => {
        const secretKey = config.get<string>('STRIPE_SECRET_KEY');

        if (secretKey) {
          // When packages/payments Stripe adapter is wired:
          // return new StripeAdapter(secretKey, config.get('STRIPE_WEBHOOK_SECRET'));
        }

        return new DevPaymentGateway('stripe');
      },
    },
    {
      provide: PAYSTACK_PROVIDER,
      inject: [ConfigService],
      useFactory: (config: ConfigService): PaymentGateway => {
        const secretKey = config.get<string>('PAYSTACK_SECRET_KEY');

        if (secretKey) {
          // When packages/payments Paystack adapter is wired:
          // return new PaystackAdapter(secretKey, config.get('PAYSTACK_WEBHOOK_SECRET'));
        }

        return new DevPaymentGateway('paystack');
      },
    },
  ],
  exports: [STRIPE_PROVIDER, PAYSTACK_PROVIDER],
})
export class PaymentsInfraModule {}
