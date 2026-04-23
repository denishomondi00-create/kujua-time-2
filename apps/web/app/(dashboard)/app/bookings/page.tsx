import type { Metadata } from 'next'

import { BookingEmptyState, BookingsTable } from '@/features/bookings/components'
import { getBookingsListServer } from '@/features/bookings/server'
import { requireAuthenticatedUser } from '@/features/auth/server'

export const metadata: Metadata = {
  title: 'Bookings',
  description: 'Monitor upcoming, completed, canceled, and no-show bookings.',
}

export default async function BookingsPage() {
  await requireAuthenticatedUser()
  const bookings = await getBookingsListServer()

  return bookings.items.length ? <BookingsTable items={bookings.items} /> : <BookingEmptyState />
}
