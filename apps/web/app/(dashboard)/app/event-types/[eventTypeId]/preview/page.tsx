import type { Metadata } from 'next'

import { EventTypePreviewPanel } from '@/features/event-types/components'
import { getEventTypePreviewServer } from '@/features/event-types/server'
import { requireAuthenticatedUser } from '@/features/auth/server'

export const metadata: Metadata = {
  title: 'Event type preview',
  description: 'Preview how this event type will appear on the public booking page.',
}

export default async function EventTypePreviewPage({
  params,
}: {
  params: Promise<{ eventTypeId: string }>
}) {
  await requireAuthenticatedUser()
  const { eventTypeId } = await params
  const preview = await getEventTypePreviewServer(eventTypeId)

  return <EventTypePreviewPanel preview={preview} />
}
