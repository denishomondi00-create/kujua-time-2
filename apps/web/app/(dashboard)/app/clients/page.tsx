import type { Metadata } from 'next'

import { ClientsEmptyState, ClientsTable } from '@/features/clients/components'
import { getClientsListServer } from '@/features/clients/server'
import { requireAuthenticatedUser } from '@/features/auth/server'

export const metadata: Metadata = {
  title: 'Clients',
  description: 'Search, filter, and manage client records created from bookings and intake forms.',
}

export default async function ClientsPage() {
  await requireAuthenticatedUser()
  const clients = await getClientsListServer()

  return clients.items.length ? <ClientsTable items={clients.items} /> : <ClientsEmptyState />
}
