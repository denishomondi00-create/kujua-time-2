'use client'

import { useMemo, useState } from 'react'

import type { ClientListQuery, ClientStage } from '@/features/clients/schemas'

export function useClientFilters(initial: Partial<ClientListQuery> = {}) {
  const [search, setSearch] = useState(initial.search ?? '')
  const [stage, setStage] = useState<ClientStage | undefined>(initial.stage)
  const [page, setPage] = useState(initial.page ?? 1)
  const [pageSize, setPageSize] = useState(initial.pageSize ?? 20)

  const query = useMemo<ClientListQuery>(() => ({
    page,
    pageSize,
    search,
    stage,
  }), [page, pageSize, search, stage])

  return {
    query,
    search,
    stage,
    page,
    pageSize,
    setSearch,
    setStage,
    setPage,
    setPageSize,
  }
}

export function useClientSelection<T extends { id: string }>(items: T[]) {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(items[0]?.id ?? null)

  return {
    selectedClientId,
    selectedClient: items.find((item) => item.id === selectedClientId) ?? null,
    setSelectedClientId,
  }
}
