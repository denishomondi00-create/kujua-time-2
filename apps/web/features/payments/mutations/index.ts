'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { PAYMENTS_QUERY_KEYS, refundPayment } from '@/features/payments/utils'
import type { RefundPaymentInput } from '@/features/payments/schemas'

function invalidatePayments(queryClient: ReturnType<typeof useQueryClient>, paymentId?: string) {
  queryClient.invalidateQueries({ queryKey: PAYMENTS_QUERY_KEYS.all })
  if (paymentId) {
    queryClient.invalidateQueries({ queryKey: PAYMENTS_QUERY_KEYS.detail(paymentId) })
  }
}

export function useRefundPaymentMutation(paymentId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: RefundPaymentInput) => refundPayment(paymentId, input),
    onSuccess: () => invalidatePayments(queryClient, paymentId),
  })
}

export function useRefreshPaymentStatusMutation(paymentId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => undefined,
    onSuccess: () => invalidatePayments(queryClient, paymentId),
  })
}
