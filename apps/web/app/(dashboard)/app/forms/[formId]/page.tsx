import type { Metadata } from 'next'

import { FormBuilder, FormResponsesPanel } from '@/features/forms/components'
import { getFormDetailServer, getFormResponsesServer } from '@/features/forms/server'
import { requireAuthenticatedUser } from '@/features/auth/server'

export const metadata: Metadata = {
  title: 'Form details',
  description: 'Edit intake fields and review form submissions.',
}

export default async function FormDetailPage({
  params,
}: {
  params: Promise<{ formId: string }>
}) {
  await requireAuthenticatedUser()
  const { formId } = await params
  const [form, responses] = await Promise.all([
    getFormDetailServer(formId),
    getFormResponsesServer(formId),
  ])

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <FormBuilder mode="update" formId={formId} initialValues={form} />
      <FormResponsesPanel responses={responses.items} />
    </div>
  )
}
