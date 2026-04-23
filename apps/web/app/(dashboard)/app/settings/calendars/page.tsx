import type { Metadata } from 'next'

    export const metadata: Metadata = {
      title: 'Calendar settings',
      description: 'Connect providers, monitor sync health, and define availability behavior around busy windows.',
    }

    export default function Page() {
      return (
        <div style={{ display: 'grid', gap: 24 }}>
          <section
            style={{
              background: 'var(--kujua-white)',
              border: '1px solid var(--kujua-gray-200)',
              borderRadius: 24,
              padding: '28px',
              boxShadow: 'var(--kujua-shadow-sm)',
            }}
          >
            <p className="kujua-eyebrow" style={{ marginBottom: 14 }}>Connected calendars</p>
            <h2 style={{ marginBottom: 12 }}>Calendar settings</h2>
            <p style={{ fontSize: '1rem', maxWidth: 760 }}>Connect providers, monitor sync health, and define availability behavior around busy windows.</p>
          </section>

<section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: 24 }}>
  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
    <button type="button" className="btn-primary">Connect Google Calendar</button>
    <button type="button" className="btn-secondary">Run sync</button>
  </div>
  <p style={{ margin: 0 }}>Store provider state, sync tokens, and reconciliation health here.</p>
</section>

        </div>
      )
    }
