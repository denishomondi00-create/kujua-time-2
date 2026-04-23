import type { Metadata } from 'next'

import { PaymentSummaryCard } from '@/features/payments/components'
import { getPaymentDetailServer } from '@/features/payments/server'
import { requireAuthenticatedUser } from '@/features/auth/server'

export const metadata: Metadata = {
  title: 'Payment details',
  description: 'Review payment metadata, reference, provider, status, and reconciliation context.',
}

export default async function PaymentDetailPage({
  params,
}: {
  params: { paymentId: string }
}) {
  await requireAuthenticatedUser()
  const payment = await getPaymentDetailServer(params.paymentId)

  return <PaymentSummaryCard payment={payment} />
}
