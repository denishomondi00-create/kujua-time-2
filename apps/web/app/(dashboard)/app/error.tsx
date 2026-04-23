'use client'

export default function DashboardError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div
      style={{
        background: 'var(--kujua-white)',
        border: '1px solid var(--kujua-gray-200)',
        borderRadius: 24,
        padding: '32px',
        maxWidth: 720,
      }}
    >
      <p className="kujua-eyebrow" style={{ marginBottom: 14 }}>Dashboard error</p>
      <h2 style={{ marginBottom: 12 }}>We couldn’t load this section</h2>
      <p style={{ marginBottom: 22 }}>
        An unexpected error interrupted the dashboard. Try reloading this section or return to the main workspace overview.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button type="button" onClick={reset} className="btn-primary">
          Try again
        </button>
        <a href="/app" className="btn-secondary">
          Go to dashboard home
        </a>
      </div>
      <p style={{ marginTop: 18, fontSize: '0.875rem', color: 'var(--kujua-gray-400)' }}>{error.message}</p>
    </div>
  )
}
