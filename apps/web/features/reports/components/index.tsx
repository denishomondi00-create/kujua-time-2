import { formatCurrency, formatNumber, formatPercent, type BreakdownRow, type OverviewReport, type TimeSeriesPoint } from '@/features/reports/utils'

export function ReportMetricCard({ label, value, helper }: { label: string; value: string; helper?: string }) {
  return (
    <article style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 20, padding: 20, boxShadow: 'var(--kujua-shadow-sm)' }}>
      <p style={{ fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--kujua-gray-400)', marginBottom: 10 }}>{label}</p>
      <div style={{ marginBottom: 10, fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--kujua-charcoal)' }}>{value}</div>
      {helper ? <p style={{ margin: 0 }}>{helper}</p> : null}
    </article>
  )
}

export function ReportsSummaryGrid({ overview }: { overview: OverviewReport }) {
  return (
    <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
      <ReportMetricCard label="Total bookings" value={formatNumber(overview.totalBookings)} />
      <ReportMetricCard label="Revenue" value={formatCurrency(overview.revenue, overview.currency)} />
      <ReportMetricCard label="No-show rate" value={formatPercent(overview.noShowRate)} />
      <ReportMetricCard label="Conversion rate" value={formatPercent(overview.conversionRate)} />
    </section>
  )
}

export function ReportsFilterBar() {
  return (
    <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 20, padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div>
          <p className="kujua-eyebrow" style={{ marginBottom: 10 }}>Reports</p>
          <h2 style={{ marginBottom: 6 }}>Track bookings, revenue, and no-shows over time</h2>
          <p style={{ margin: 0 }}>Use reports to review performance, operational bottlenecks, and source quality.</p>
        </div>
      </div>
    </section>
  )
}

export function ReportsEmptyState() {
  return (
    <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: 28 }}>
      <h3 style={{ marginBottom: 10 }}>No report data available yet</h3>
      <p style={{ margin: 0 }}>
        Reports will populate once bookings, payments, and client activity begin flowing through the workspace.
      </p>
    </section>
  )
}

export function SeriesTable({ title, points }: { title: string; points: TimeSeriesPoint[] }) {
  return (
    <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 20, padding: 24 }}>
      <h3 style={{ marginBottom: 16 }}>{title}</h3>
      {points.length === 0 ? (
        <p style={{ margin: 0 }}>No datapoints available.</p>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {points.map((point) => (
            <div key={point.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, paddingBottom: 10, borderBottom: '1px solid var(--kujua-gray-100)' }}>
              <span>{point.label}</span>
              <strong style={{ color: 'var(--kujua-charcoal)' }}>{formatNumber(point.value)}</strong>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export function BreakdownPanel({ title, rows, currency }: { title: string; rows: BreakdownRow[]; currency?: string }) {
  return (
    <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 20, padding: 24 }}>
      <h3 style={{ marginBottom: 16 }}>{title}</h3>
      {rows.length === 0 ? (
        <p style={{ margin: 0 }}>No breakdown rows available.</p>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {rows.map((row) => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, paddingBottom: 10, borderBottom: '1px solid var(--kujua-gray-100)' }}>
              <span>{row.label}</span>
              <div style={{ textAlign: 'right' }}>
                <strong style={{ display: 'block', color: 'var(--kujua-charcoal)' }}>{formatNumber(row.value)}</strong>
                {row.amount !== undefined && currency ? <span style={{ fontSize: '0.875rem' }}>{formatCurrency(row.amount, currency)}</span> : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
