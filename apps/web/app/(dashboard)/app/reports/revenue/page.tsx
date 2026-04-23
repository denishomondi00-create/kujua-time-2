import type { Metadata } from 'next'

import { BreakdownPanel, SeriesTable } from '@/features/reports/components'
import { getRevenueReportServer } from '@/features/reports/server'
import { requireAuthenticatedUser } from '@/features/auth/server'

export const metadata: Metadata = {
  title: 'Revenue report',
  description: 'Track revenue performance over time and by source.',
}

export default async function RevenueReportPage() {
  await requireAuthenticatedUser()
  const report = await getRevenueReportServer()

  return (
    <div style={{ display: 'grid', gap: 20, gridTemplateColumns: '1.2fr 1fr' }}>
      <SeriesTable title="Revenue over time" points={report.series} />
      <BreakdownPanel title="Revenue by source" rows={report.bySource} currency={report.currency} />
    </div>
  )
}
