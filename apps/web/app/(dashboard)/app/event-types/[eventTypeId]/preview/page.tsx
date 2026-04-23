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
  params: { eventTypeId: string }
}) {
  await requireAuthenticatedUser()
  const preview = await getEventTypePreviewServer(params.eventTypeId)

  return <EventTypePreviewPanel preview={preview} />
}
