import type { Metadata } from 'next'

import { AutomationTemplateGallery } from '@/features/automations/components'
import { getAutomationTemplatesServer } from '@/features/automations/server'
import { requireAuthenticatedUser } from '@/features/auth/server'

export const metadata: Metadata = {
  title: 'Automation templates',
  description: 'Start from ready-made workflow automation templates.',
}

export default async function AutomationTemplatesPage() {
  await requireAuthenticatedUser()
  const templates = await getAutomationTemplatesServer()

  return <AutomationTemplateGallery templates={templates.items} />
}
