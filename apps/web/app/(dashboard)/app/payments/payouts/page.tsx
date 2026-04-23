import type { Metadata } from 'next'

import { PayoutSummaryPanel } from '@/features/payments/components'
import { getPaymentPayoutsServer } from '@/features/payments/server'
import { requireAuthenticatedUser } from '@/features/auth/server'

export const metadata: Metadata = {
  title: 'Payouts',
  description: 'Review payout settlement data from connected payment providers.',
}

export default async function PaymentPayoutsPage() {
  await requireAuthenticatedUser()
  const payouts = await getPaymentPayoutsServer()

  return <PayoutSummaryPanel payouts={payouts.items} />
}
