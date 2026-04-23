import type { Metadata } from 'next'

import { BreakdownPanel, SeriesTable } from '@/features/reports/components'
import { getNoShowReportServer } from '@/features/reports/server'
import { requireAuthenticatedUser } from '@/features/auth/server'

export const metadata: Metadata = {
  title: 'No-show report',
  description: 'Track no-show patterns over time and by event type.',
}

export default async function NoShowReportPage() {
  await requireAuthenticatedUser()
  const report = await getNoShowReportServer()

  return (
    <div style={{ display: 'grid', gap: 20, gridTemplateColumns: '1.2fr 1fr' }}>
      <SeriesTable title="No-shows over time" points={report.series} />
      <BreakdownPanel title="No-shows by event type" rows={report.byEventType} />
    </div>
  )
}
