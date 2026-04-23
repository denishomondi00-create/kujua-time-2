'use client'

import { useMemo, useState } from 'react'

import type { AutomationTemplate, AutomationTrigger } from '@/features/automations/schemas'

export function useAutomationFilters(initialTrigger?: AutomationTrigger) {
  const [trigger, setTrigger] = useState<AutomationTrigger | undefined>(initialTrigger)
  const [search, setSearch] = useState('')

  const normalizedSearch = useMemo(() => search.trim().toLowerCase(), [search])

  return {
    trigger,
    search,
    normalizedSearch,
    setTrigger,
    setSearch,
  }
}

export function useAutomationTemplateSelection(templates: AutomationTemplate[]) {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(templates[0]?.id ?? null)

  return {
    selectedTemplateId,
    selectedTemplate: templates.find((template) => template.id === selectedTemplateId) ?? null,
    setSelectedTemplateId,
  }
}
