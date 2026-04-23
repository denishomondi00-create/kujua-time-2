import type { Metadata } from 'next'

import { DashboardOverviewShell } from '@/features/dashboard/components'
import { getDashboardOverviewServer } from '@/features/dashboard/server'
import { requireAuthenticatedUser } from '@/features/auth/server'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Workspace overview for bookings, payments, clients, and quick actions.',
}

export default async function DashboardHomePage() {
  await requireAuthenticatedUser()
  const overview = await getDashboardOverviewServer()

  return <DashboardOverviewShell overview={overview} />
}
