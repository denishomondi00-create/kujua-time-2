import type { Metadata } from 'next'

import { FormBuilder } from '@/features/forms/components'
import { requireAuthenticatedUser } from '@/features/auth/server'

export const metadata: Metadata = {
  title: 'Create form',
  description: 'Create a form with custom intake fields for your booking flow.',
}

export default async function NewFormPage() {
  await requireAuthenticatedUser()

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <div>
        <p className="kujua-eyebrow" style={{ marginBottom: 12 }}>New form</p>
        <h2 style={{ marginBottom: 8 }}>Build your intake form</h2>
      </div>
      <FormBuilder mode="create" />
    </div>
  )
}
