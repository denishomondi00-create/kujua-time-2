import type { Metadata } from 'next'

import { AutomationEditorForm } from '@/features/automations/components'
import { getAutomationDetailServer } from '@/features/automations/server'
import { requireAuthenticatedUser } from '@/features/auth/server'

export const metadata: Metadata = {
  title: 'Automation details',
  description: 'Review and update trigger conditions, actions, and automation settings.',
}

export default async function AutomationDetailPage({
  params,
}: {
  params: { automationId: string }
}) {
  await requireAuthenticatedUser()
  const automation = await getAutomationDetailServer(params.automationId)

  return <AutomationEditorForm mode="update" automationId={params.automationId} initialValues={automation} />
}
