'use client'

import { useMemo, useState } from 'react'

import type { BookingQuery, BookingStatus } from '@/features/bookings/schemas'

export function useBookingFilters(initial: Partial<BookingQuery> = {}) {
  const [search, setSearch] = useState(initial.search ?? '')
  const [status, setStatus] = useState<BookingStatus | undefined>(initial.status)
  const [page, setPage] = useState(initial.page ?? 1)
  const [pageSize, setPageSize] = useState(initial.pageSize ?? 20)

  const query = useMemo<BookingQuery>(() => ({
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

export function useBookingSelection<T extends { id: string }>(items: T[]) {
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(items[0]?.id ?? null)

  return {
    selectedBookingId,
    selectedBooking: items.find((item) => item.id === selectedBookingId) ?? null,
    setSelectedBookingId,
  }
}
