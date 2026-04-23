import { STRIPE_WEBHOOK_EVENTS } from './stripe.constants'

export function isRelevantStripeEvent(eventType: string): boolean {
  return Object.values(STRIPE_WEBHOOK_EVENTS).includes(eventType as any)
}

export function extractStripeSignature(
  headers: Record<string, string | string[] | undefined>
): string {
  const sig = headers['stripe-signature']

  if (!sig) {
    throw new Error('Missing stripe-signature header')
  }

  if (Array.isArray(sig)) {
    const first = sig[0]
    if (!first) {
      throw new Error('Missing stripe-signature header')
    }
    return first
  }

  return sig
}