import type { Metadata } from 'next'

import { BreakdownPanel, SeriesTable } from '@/features/reports/components'
import { getBookingsReportServer } from '@/features/reports/server'
import { requireAuthenticatedUser } from '@/features/auth/server'

export const metadata: Metadata = {
  title: 'Bookings report',
  description: 'Track bookings over time and by status.',
}

export default async function BookingsReportPage() {
  await requireAuthenticatedUser()
  const report = await getBookingsReportServer()

  return (
    <div style={{ display: 'grid', gap: 20, gridTemplateColumns: '1.2fr 1fr' }}>
      <SeriesTable title="Bookings over time" points={report.series} />
      <BreakdownPanel title="Bookings by status" rows={report.byStatus} />
    </div>
  )
}
