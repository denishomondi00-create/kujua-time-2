'use client'

import { useMemo, useState } from 'react'

import type { EventTypeListQuery, EventTypeStatus, MeetingLocationType } from '@/features/event-types/schemas'

export type EventTypeBuilderTab = 'basics' | 'availability' | 'booking-rules' | 'payment' | 'forms' | 'reminders' | 'branding' | 'sharing'

export function useEventTypeFilters(initial: Partial<EventTypeListQuery> = {}) {
  const [search, setSearch] = useState(initial.search ?? '')
  const [status, setStatus] = useState<EventTypeStatus | undefined>(initial.status)
  const [page, setPage] = useState(initial.page ?? 1)
  const [pageSize, setPageSize] = useState(initial.pageSize ?? 20)

  const query = useMemo<EventTypeListQuery>(() => ({
    page,
    pageSize,
    search,
    status,
  }), [page, pageSize, search, status])

  return {
    query,
    search,
    status,
    page,
    pageSize,
    setSearch,
    setStatus,
    setPage,
    setPageSize,
  }
}

export function useEventTypeBuilder(initialTab: EventTypeBuilderTab = 'basics') {
  const [activeTab, setActiveTab] = useState<EventTypeBuilderTab>(initialTab)
  const [selectedLocations, setSelectedLocations] = useState<MeetingLocationType[]>([])

  return {
    activeTab,
    setActiveTab,
    selectedLocations,
    setSelectedLocations,
  }
}
