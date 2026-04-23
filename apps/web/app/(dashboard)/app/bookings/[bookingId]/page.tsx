import type { Metadata } from 'next'

import { BookingDetailPanel } from '@/features/bookings/components'
import { getBookingDetailServer } from '@/features/bookings/server'
import { requireAuthenticatedUser } from '@/features/auth/server'

export const metadata: Metadata = {
  title: 'Booking details',
  description: 'Review booking details, payment state, intake history, reminders, and activity.',
}

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ bookingId: string }>
}) {
  await requireAuthenticatedUser()
  const { bookingId } = await params
  const booking = await getBookingDetailServer(bookingId)

  return <BookingDetailPanel booking={booking} />
}
