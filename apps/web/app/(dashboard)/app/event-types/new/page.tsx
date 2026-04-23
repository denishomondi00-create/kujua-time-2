import type { Metadata } from 'next'

import { EventTypeBuilderForm } from '@/features/event-types/components'
import { requireAuthenticatedUser } from '@/features/auth/server'

export const metadata: Metadata = {
  title: 'Create event type',
  description: 'Create a new event type with scheduling, payment, and branding settings.',
}

export default async function NewEventTypePage() {
  await requireAuthenticatedUser()

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <div>
        <p className="kujua-eyebrow" style={{ marginBottom: 12 }}>New event type</p>
        <h2 style={{ marginBottom: 8 }}>Set up a bookable offer</h2>
      </div>
      <EventTypeBuilderForm mode="create" />
    </div>
  )
}
