'use client'

import { useRouter } from 'next/navigation'

import { EventTypeBuilderForm } from '@/features/event-types/components'

export function NewEventTypeClient() {
  const router = useRouter()

  return (
    <EventTypeBuilderForm
      mode="create"
      onSuccess={(id) => router.push(`/app/event-types/${id}`)}
    />
  )
}
