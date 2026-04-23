import type Stripe from 'stripe';
import { STRIPE_PAYMENT_STATUS_MAP } from './stripe.constants';

export function mapStripePaymentIntentStatus(status: string): string {
  return STRIPE_PAYMENT_STATUS_MAP[status] ?? 'pending';
}

export function mapStripeCheckoutToEvent(session: Stripe.Checkout.Session): {
  providerPaymentId: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'failed';
  metadata: Record<string, string>;
} {
  return {
    providerPaymentId: (session.payment_intent as string) ?? session.id,
    amount: session.amount_total ?? 0,
    currency: (session.currency ?? 'usd').toUpperCase(),
    status: session.payment_status === 'paid' ? 'succeeded' : 'failed',
    metadata: (session.metadata as Record<string, string>) ?? {},
  };
}

export function stripeAmountToMinor(amount: number): number {
  return amount; // Stripe already uses minor units
}

export function minorToStripeAmount(amount: number): number {
  return Math.round(amount);
}
