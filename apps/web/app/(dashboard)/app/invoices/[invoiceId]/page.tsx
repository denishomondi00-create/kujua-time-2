import type { Metadata } from 'next'

    export const metadata: Metadata = {
      title: 'Invoice detail',
      description: 'Review invoice state, send history, payment links, and PDF/download controls for a specific document.',
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
            <p className="kujua-eyebrow" style={{ marginBottom: 14 }}>Billing record</p>
            <h2 style={{ marginBottom: 12 }}>Invoice detail</h2>
            <p style={{ fontSize: '1rem', maxWidth: 760 }}>Review invoice state, send history, payment links, and PDF/download controls for a specific document.</p>
          </section>

<section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: 28 }}>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
    {['Status and due date', 'Client and booking linkage', 'Line items and totals', 'Delivery and payment history'].map((item) => (
      <div key={item} style={{ padding: '14px 16px', borderRadius: 14, background: 'var(--kujua-gray-50)', border: '1px solid var(--kujua-gray-200)' }}>{item}</div>
    ))}
  </div>
</section>

        </div>
      )
    }
