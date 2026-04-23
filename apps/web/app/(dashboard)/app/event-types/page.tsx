import type { Metadata } from 'next'
import Link from 'next/link'

import { EventTypesEmptyState, EventTypesGrid } from '@/features/event-types/components'
import { getEventTypesListServer } from '@/features/event-types/server'
import { requireAuthenticatedUser } from '@/features/auth/server'

export const metadata: Metadata = {
  title: 'Event types',
  description: 'Manage the appointment types your workspace offers to clients.',
}

export default async function EventTypesPage() {
  await requireAuthenticatedUser()
  const eventTypes = await getEventTypesListServer()

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div>
          <p className="kujua-eyebrow" style={{ marginBottom: 12 }}>Event types</p>
          <h2 style={{ marginBottom: 8 }}>Publish bookable offers for your workspace</h2>
        </div>
        <Link href="/app/event-types/new" className="btn-primary">Create event type</Link>
      </div>

      {eventTypes.items.length ? <EventTypesGrid items={eventTypes.items} /> : <EventTypesEmptyState />}
    </div>
  )
}
