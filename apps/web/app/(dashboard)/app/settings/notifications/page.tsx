import type { Metadata } from 'next'

    export const metadata: Metadata = {
      title: 'Notification settings',
      description: 'Configure booking confirmations, reminders, receipts, internal alerts, and channel preferences.',
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
            <p className="kujua-eyebrow" style={{ marginBottom: 14 }}>Message delivery</p>
            <h2 style={{ marginBottom: 12 }}>Notification settings</h2>
            <p style={{ fontSize: '1rem', maxWidth: 760 }}>Configure booking confirmations, reminders, receipts, internal alerts, and channel preferences.</p>
          </section>

<section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: 24 }}>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
    {['Email defaults', 'SMS providers', 'WhatsApp providers', 'Internal alerts'].map((item) => (
      <div key={item} style={{ padding: '14px 16px', borderRadius: 14, background: 'var(--kujua-gray-50)', border: '1px solid var(--kujua-gray-200)' }}>{item}</div>
    ))}
  </div>
</section>

        </div>
      )
    }
