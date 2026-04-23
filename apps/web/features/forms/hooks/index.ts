'use client'

import { useCallback, useState } from 'react'

import type { FormField, FormFieldType } from '@/features/forms/schemas'

export function useFormBuilder(initialFields: FormField[] = []) {
  const [fields, setFields] = useState<FormField[]>(initialFields)

  const addField = useCallback((type: FormFieldType) => {
    setFields((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        label: '',
        type,
        required: false,
        helpText: '',
        options: [],
        placeholder: '',
      },
    ])
  }, [])

  const updateField = useCallback((fieldId: string, patch: Partial<FormField>) => {
    setFields((current) => current.map((field) => (field.id === fieldId ? { ...field, ...patch } : field)))
  }, [])

  const removeField = useCallback((fieldId: string) => {
    setFields((current) => current.filter((field) => field.id !== fieldId))
  }, [])

  return {
    fields,
    setFields,
    addField,
    updateField,
    removeField,
  }
}

export function useFormFieldReorder(initialFields: FormField[] = []) {
  const [fields, setFields] = useState<FormField[]>(initialFields)

  const moveField = useCallback((fieldId: string, direction: 'up' | 'down') => {
    setFields((current) => {
      const index = current.findIndex((field) => field.id === fieldId)
      if (index === -1) return current

      const targetIndex = direction === 'up' ? index - 1 : index + 1
      if (targetIndex < 0 || targetIndex >= current.length) return current

      const next = [...current]
      const [item] = next.splice(index, 1)
      next.splice(targetIndex, 0, item)
      return next
    })
  }, [])

  return {
    fields,
    setFields,
    moveField,
  }
}
