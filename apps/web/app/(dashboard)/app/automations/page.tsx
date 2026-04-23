import type { Metadata } from 'next'

import { AutomationEmptyState, AutomationList } from '@/features/automations/components'
import { getAutomationsListServer } from '@/features/automations/server'
import { requireAuthenticatedUser } from '@/features/auth/server'

export const metadata: Metadata = {
  title: 'Automations',
  description: 'Manage workflow automations for confirmations, reminders, and follow-up.',
}

export default async function AutomationsPage() {
  await requireAuthenticatedUser()
  const automations = await getAutomationsListServer()

  return automations.items.length ? <AutomationList items={automations.items} /> : <AutomationEmptyState />
}
