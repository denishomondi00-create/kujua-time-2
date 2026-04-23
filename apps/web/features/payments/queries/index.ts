'use client'

import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query'

import { PAYMENTS_QUERY_KEYS, getPaymentDetail, getPaymentPayouts, getPaymentProviders, listPayments } from '@/features/payments/utils'
import type { PaymentListQuery } from '@/features/payments/schemas'

export function paymentsListQueryOptions(query: Partial<PaymentListQuery> = {}) {
  return queryOptions({
    queryKey: PAYMENTS_QUERY_KEYS.list({
      page: query.page ?? 1,
      pageSize: query.pageSize ?? 20,
      status: query.status,
      provider: query.provider,
      search: query.search ?? '',
    }),
    queryFn: () => listPayments(query),
    placeholderData: keepPreviousData,
  })
}

export function usePaymentsQuery(query: Partial<PaymentListQuery> = {}) {
  return useQuery(paymentsListQueryOptions(query))
}

export function paymentDetailQueryOptions(paymentId: string) {
  return queryOptions({
    queryKey: PAYMENTS_QUERY_KEYS.detail(paymentId),
    queryFn: () => getPaymentDetail(paymentId),
    enabled: Boolean(paymentId),
  })
}

export function usePaymentDetailQuery(paymentId: string) {
  return useQuery(paymentDetailQueryOptions(paymentId))
}

export function paymentPayoutsQueryOptions() {
  return queryOptions({
    queryKey: PAYMENTS_QUERY_KEYS.payouts,
    queryFn: getPaymentPayouts,
  })
}

export function usePaymentPayoutsQuery() {
  return useQuery(paymentPayoutsQueryOptions())
}

export function paymentProvidersQueryOptions() {
  return queryOptions({
    queryKey: PAYMENTS_QUERY_KEYS.providers,
    queryFn: getPaymentProviders,
  })
}

export function usePaymentProvidersQuery() {
  return useQuery(paymentProvidersQueryOptions())
}
