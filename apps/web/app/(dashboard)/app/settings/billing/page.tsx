import type { Metadata } from 'next'

    export const metadata: Metadata = {
      title: 'Billing settings',
      description: 'Review current plan, invoice history, seat usage, and upgrade path for the workspace.',
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
            <p className="kujua-eyebrow" style={{ marginBottom: 14 }}>Plan and subscription</p>
            <h2 style={{ marginBottom: 12 }}>Billing settings</h2>
            <p style={{ fontSize: '1rem', maxWidth: 760 }}>Review current plan, invoice history, seat usage, and upgrade path for the workspace.</p>
          </section>

<section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: 24 }}>
  <p style={{ marginBottom: 16 }}>Surface subscription plan details, billing history, and upgrade controls from your billing provider here.</p>
  <button type="button" className="btn-primary">Review plans</button>
</section>

        </div>
      )
    }
