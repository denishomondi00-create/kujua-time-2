import type { Metadata } from 'next'

import { EventTypeBuilderForm } from '@/features/event-types/components'
import { getEventTypeDetailServer } from '@/features/event-types/server'
import { requireAuthenticatedUser } from '@/features/auth/server'

export const metadata: Metadata = {
  title: 'Edit event type',
  description: 'Update event type configuration, booking rules, reminders, and payments.',
}

export default async function EventTypeDetailPage({
  params,
}: {
  params: Promise<{ eventTypeId: string }>
}) {
  await requireAuthenticatedUser()
  const { eventTypeId } = await params
  const eventType = await getEventTypeDetailServer(eventTypeId)

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <div>
        <p className="kujua-eyebrow" style={{ marginBottom: 12 }}>Edit event type</p>
        <h2 style={{ marginBottom: 8 }}>{eventType.name}</h2>
      </div>
      <EventTypeBuilderForm mode="update" eventTypeId={eventTypeId} initialValues={eventType} />
    </div>
  )
}
