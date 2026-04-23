import type { Metadata } from 'next'

import { BookingPageShell, PublicBookingClient } from '@/features/public-booking/components'
import { getPublicBookingPageModelServer } from '@/features/public-booking/server'

export const metadata: Metadata = {
  title: 'Booking page',
  description: 'Public booking page for Kujua Time event types.',
  robots: { index: false, follow: true },
}

export default async function PublicBookingPage({
  params,
  searchParams,
}: {
  params: { workspaceSlug: string; path?: string[] }
  searchParams?: { mode?: string; token?: string }
}) {
  const model = await getPublicBookingPageModelServer(params.workspaceSlug, params.path)
  const mode = searchParams?.mode === 'reschedule' || searchParams?.mode === 'cancel' ? searchParams.mode : 'book'
  const token = typeof searchParams?.token === 'string' ? searchParams.token : undefined

  return (
    <BookingPageShell
      model={model}
      interaction={<PublicBookingClient model={model} mode={mode} token={token} />}
    />
  )
}
