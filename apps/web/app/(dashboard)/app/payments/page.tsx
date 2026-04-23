import type { Metadata } from 'next'

import { PaymentsEmptyState, PaymentsTable, PayoutSummaryPanel } from '@/features/payments/components'
import { getPaymentsListServer, getPaymentPayoutsServer } from '@/features/payments/server'
import { requireAuthenticatedUser } from '@/features/auth/server'

export const metadata: Metadata = {
  title: 'Payments',
  description: 'Review transaction history, payment status, and provider settlement data.',
}

export default async function PaymentsPage() {
  await requireAuthenticatedUser()
  const [payments, payouts] = await Promise.all([
    getPaymentsListServer(),
    getPaymentPayoutsServer(),
  ])

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      {payments.items.length ? <PaymentsTable items={payments.items} /> : <PaymentsEmptyState />}
      <PayoutSummaryPanel payouts={payouts.items} />
    </div>
  )
}
