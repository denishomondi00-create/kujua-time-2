import type { Metadata } from 'next'

import { AutomationLogTable } from '@/features/automations/components'
import { getAutomationLogsServer } from '@/features/automations/server'
import { requireAuthenticatedUser } from '@/features/auth/server'

export const metadata: Metadata = {
  title: 'Automation logs',
  description: 'Review automation execution history and failure diagnostics.',
}

export default async function AutomationLogsPage() {
  await requireAuthenticatedUser()
  const logs = await getAutomationLogsServer()

  return <AutomationLogTable logs={logs.items} />
}
