'use client'

import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query'

import { EVENT_TYPE_QUERY_KEYS, getEventTypeDetail, getEventTypePreview, listEventTypes } from '@/features/event-types/utils'
import type { EventTypeListQuery } from '@/features/event-types/schemas'

export function eventTypesListQueryOptions(query: Partial<EventTypeListQuery> = {}) {
  return queryOptions({
    queryKey: EVENT_TYPE_QUERY_KEYS.list({
      page: query.page ?? 1,
      pageSize: query.pageSize ?? 20,
      search: query.search ?? '',
      status: query.status,
    }),
    queryFn: () => listEventTypes(query),
    placeholderData: keepPreviousData,
  })
}

export function useEventTypesQuery(query: Partial<EventTypeListQuery> = {}) {
  return useQuery(eventTypesListQueryOptions(query))
}

export function eventTypeDetailQueryOptions(eventTypeId: string) {
  return queryOptions({
    queryKey: EVENT_TYPE_QUERY_KEYS.detail(eventTypeId),
    queryFn: () => getEventTypeDetail(eventTypeId),
    enabled: Boolean(eventTypeId),
  })
}

export function useEventTypeDetailQuery(eventTypeId: string) {
  return useQuery(eventTypeDetailQueryOptions(eventTypeId))
}

export function eventTypePreviewQueryOptions(eventTypeId: string) {
  return queryOptions({
    queryKey: EVENT_TYPE_QUERY_KEYS.preview(eventTypeId),
    queryFn: () => getEventTypePreview(eventTypeId),
    enabled: Boolean(eventTypeId),
  })
}

export function useEventTypePreviewQuery(eventTypeId: string) {
  return useQuery(eventTypePreviewQueryOptions(eventTypeId))
}
