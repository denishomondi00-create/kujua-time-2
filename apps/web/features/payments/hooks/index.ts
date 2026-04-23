'use client'

import { useMemo, useState } from 'react'

import type { PaymentListQuery, PaymentProvider, PaymentStatus } from '@/features/payments/schemas'

export function usePaymentFilters(initial: Partial<PaymentListQuery> = {}) {
  const [search, setSearch] = useState(initial.search ?? '')
  const [status, setStatus] = useState<PaymentStatus | undefined>(initial.status)
  const [provider, setProvider] = useState<PaymentProvider | undefined>(initial.provider)
  const [page, setPage] = useState(initial.page ?? 1)
  const [pageSize, setPageSize] = useState(initial.pageSize ?? 20)

  const query = useMemo<PaymentListQuery>(() => ({
    page,
    pageSize,
    status,
    provider,
    search,
  }), [page, pageSize, provider, search, status])

  return {
    query,
    search,
    status,
    provider,
    page,
    pageSize,
    setSearch,
    setStatus,
    setProvider,
    setPage,
    setPageSize,
  }
}

export function usePaymentStatusPolling(enabled: boolean) {
  return {
    refetchInterval: enabled ? 30_000 : false,
  }
}
