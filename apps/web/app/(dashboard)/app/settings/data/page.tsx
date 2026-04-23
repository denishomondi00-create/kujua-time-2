import type { Metadata } from 'next'

    export const metadata: Metadata = {
      title: 'Data settings',
      description: 'Prepare data exports, retention controls, deletion workflows, and compliance-oriented operational tooling.',
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
            <p className="kujua-eyebrow" style={{ marginBottom: 14 }}>Exports and retention</p>
            <h2 style={{ marginBottom: 12 }}>Data settings</h2>
            <p style={{ fontSize: '1rem', maxWidth: 760 }}>Prepare data exports, retention controls, deletion workflows, and compliance-oriented operational tooling.</p>
          </section>

<section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: 24 }}>
  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
    <button type="button" className="btn-primary">Export workspace data</button>
    <button type="button" className="btn-secondary">Review retention policy</button>
  </div>
</section>

        </div>
      )
    }
