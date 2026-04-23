import type { Metadata } from 'next'

import { ReportsFilterBar, ReportsSummaryGrid } from '@/features/reports/components'
import { getReportsOverviewServer } from '@/features/reports/server'
import { requireAuthenticatedUser } from '@/features/auth/server'

export const metadata: Metadata = {
  title: 'Reports',
  description: 'Overview analytics for bookings, revenue, no-shows, and conversions.',
}

export default async function ReportsPage() {
  await requireAuthenticatedUser()
  const overview = await getReportsOverviewServer()

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <ReportsFilterBar />
      <ReportsSummaryGrid overview={overview} />
    </div>
  )
}
