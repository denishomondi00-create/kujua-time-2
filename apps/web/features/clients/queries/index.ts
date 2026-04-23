'use client'

import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query'

import { CLIENT_QUERY_KEYS, getClientDetail, listClients } from '@/features/clients/utils'
import type { ClientListQuery } from '@/features/clients/schemas'

export function clientsListQueryOptions(query: Partial<ClientListQuery> = {}) {
  return queryOptions({
    queryKey: CLIENT_QUERY_KEYS.list({
      page: query.page ?? 1,
      pageSize: query.pageSize ?? 20,
      search: query.search ?? '',
      stage: query.stage,
    }),
    queryFn: () => listClients(query),
    placeholderData: keepPreviousData,
  })
}

export function useClientsQuery(query: Partial<ClientListQuery> = {}) {
  return useQuery(clientsListQueryOptions(query))
}

export function clientDetailQueryOptions(clientId: string) {
  return queryOptions({
    queryKey: CLIENT_QUERY_KEYS.detail(clientId),
    queryFn: () => getClientDetail(clientId),
    enabled: Boolean(clientId),
  })
}

export function useClientDetailQuery(clientId: string) {
  return useQuery(clientDetailQueryOptions(clientId))
}
