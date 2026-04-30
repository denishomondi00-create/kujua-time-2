import type { Metadata } from 'next'

import { requireAuthenticatedUser } from '@/features/auth/server'
import { NewEventTypeClient } from './new-event-type-client'

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
      <NewEventTypeClient />
    </div>
  )
}
