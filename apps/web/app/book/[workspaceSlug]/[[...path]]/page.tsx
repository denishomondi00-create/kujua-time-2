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
  params: Promise<{ workspaceSlug: string; path?: string[] }>
  searchParams?: Promise<{ mode?: string; token?: string }>
}) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const model = await getPublicBookingPageModelServer(resolvedParams.workspaceSlug, resolvedParams.path)
  const mode = resolvedSearchParams?.mode === 'reschedule' || resolvedSearchParams?.mode === 'cancel' ? resolvedSearchParams.mode : 'book'
  const token = typeof resolvedSearchParams?.token === 'string' ? resolvedSearchParams.token : undefined

  return (
    <BookingPageShell
      model={model}
      interaction={<PublicBookingClient model={model} mode={mode} token={token} />}
    />
  )
}
