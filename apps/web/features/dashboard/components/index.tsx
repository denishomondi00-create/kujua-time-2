import Link from 'next/link'

import {
  DEFAULT_GUIDANCE,
  DEFAULT_QUICK_ACTIONS,
  formatMetricValue,
  formatPercentage,
  type DashboardMetric,
  type DashboardOverview,
  type QuickAction,
} from '@/features/dashboard/utils'

export function MetricCard({ metric }: { metric: DashboardMetric }) {
  return (
    <article
      style={{
        background: 'var(--kujua-white)',
        border: '1px solid var(--kujua-gray-200)',
        borderRadius: 20,
        padding: 22,
        boxShadow: 'var(--kujua-shadow-sm)',
      }}
    >
      <p style={{ fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--kujua-gray-400)', marginBottom: 10 }}>
        {metric.label}
      </p>
      <div style={{ marginBottom: 10, fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--kujua-charcoal)' }}>
        {formatMetricValue(metric.value)}
      </div>
      <p style={{ margin: 0 }}>{metric.helper ?? 'Updated from your latest booking, payment, and client activity.'}</p>
      {metric.changePercentage !== null && metric.changePercentage !== undefined ? (
        <div style={{ marginTop: 12, fontWeight: 600, color: metric.changePercentage >= 0 ? 'var(--kujua-success)' : 'var(--kujua-error)' }}>
          {formatPercentage(metric.changePercentage)} vs previous period
        </div>
      ) : null}
    </article>
  )
}

export function QuickActionsPanel({ actions = DEFAULT_QUICK_ACTIONS }: { actions?: QuickAction[] }) {
  return (
    <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 20, padding: 24 }}>
      <h3 style={{ marginBottom: 16 }}>Quick actions</h3>
      <div style={{ display: 'grid', gap: 12 }}>
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            style={{
              border: '1px solid var(--kujua-gray-200)',
              borderRadius: 14,
              padding: '14px 16px',
              background: 'var(--kujua-gray-50)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
              <div>
                <div style={{ color: 'var(--kujua-charcoal)', fontWeight: 700, marginBottom: 4 }}>{action.label}</div>
                <div style={{ color: 'var(--kujua-gray-600)', fontSize: '0.9rem' }}>{action.description}</div>
              </div>
              <span style={{ color: 'var(--kujua-primary-teal)', fontWeight: 700 }}>→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function WorkspaceGuidancePanel({ guidance = DEFAULT_GUIDANCE }: { guidance?: string[] }) {
  return (
    <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 20, padding: 24 }}>
      <h3 style={{ marginBottom: 16 }}>Workspace guidance</h3>
      <div style={{ display: 'grid', gap: 12 }}>
        {guidance.map((item) => (
          <div key={item} style={{ display: 'flex', gap: 10 }}>
            <span style={{ color: 'var(--kujua-success)', fontWeight: 700 }}>✓</span>
            <p style={{ margin: 0, color: 'var(--kujua-gray-800)' }}>{item}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function DashboardOverviewShell({ overview }: { overview: DashboardOverview }) {
  const metricCards = [
    overview.metrics.todaysBookings,
    overview.metrics.upcomingBookings,
    overview.metrics.unpaidBookings,
    overview.metrics.recentClients,
  ]

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <section
        style={{
          background: 'var(--kujua-white)',
          border: '1px solid var(--kujua-gray-200)',
          borderRadius: 24,
          padding: 28,
          boxShadow: 'var(--kujua-shadow-sm)',
        }}
      >
        <p className="kujua-eyebrow" style={{ marginBottom: 14 }}>Overview</p>
        <h2 style={{ marginBottom: 12 }}>Run your booking operation from one workspace</h2>
        <p style={{ fontSize: '1rem', maxWidth: 760, marginBottom: 22 }}>
          Kujua Time turns every booking into an operational record. Publish event types, monitor payments,
          follow client history, and keep appointments moving from a single operational workspace.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/app/event-types/new" className="btn-primary">Create event type</Link>
          <Link href="/app/calendar" className="btn-secondary">Open calendar</Link>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        {metricCards.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
      </section>

      <section className="dashboard-overview-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16 }}>
        <QuickActionsPanel actions={overview.quickActions} />
        <WorkspaceGuidancePanel guidance={overview.guidance} />
      </section>

      <style>{`
        @media (max-width: 960px) {
          .dashboard-overview-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
