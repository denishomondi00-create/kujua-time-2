import { PAYSTACK_WEBHOOK_EVENTS } from './paystack.constants'

type PaystackWebhookEvent = (typeof PAYSTACK_WEBHOOK_EVENTS)[keyof typeof PAYSTACK_WEBHOOK_EVENTS]

export function isRelevantPaystackEvent(event: string): boolean {
  return Object.values(PAYSTACK_WEBHOOK_EVENTS).includes(event as PaystackWebhookEvent)
}

export function extractPaystackSignature(
  headers: Record<string, string | string[] | undefined>
): string {
  const sig = headers['x-paystack-signature']

  if (!sig) {
    throw new Error('Missing x-paystack-signature header')
  }

  if (Array.isArray(sig)) {
    const first = sig[0]
    if (!first) {
      throw new Error('Missing x-paystack-signature header')
    }
    return first
  }

  return sig
}
