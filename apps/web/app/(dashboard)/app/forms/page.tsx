import type { Metadata } from 'next'
import Link from 'next/link'

import { FormsEmptyState, FormsTable } from '@/features/forms/components'
import { getFormsListServer } from '@/features/forms/server'
import { requireAuthenticatedUser } from '@/features/auth/server'

export const metadata: Metadata = {
  title: 'Forms',
  description: 'Create and manage intake forms for event types and public booking flows.',
}

export default async function FormsPage() {
  await requireAuthenticatedUser()
  const forms = await getFormsListServer()

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div>
          <p className="kujua-eyebrow" style={{ marginBottom: 12 }}>Forms</p>
          <h2 style={{ marginBottom: 8 }}>Collect intake details before bookings happen</h2>
        </div>
        <Link href="/app/forms/new" className="btn-primary">Create form</Link>
      </div>

      {forms.items.length ? <FormsTable items={forms.items} /> : <FormsEmptyState />}
    </div>
  )
}
