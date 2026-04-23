import type { Metadata } from 'next'

    export const metadata: Metadata = {
      title: 'Meeting locations',
      description: 'Configure in-person, phone, WhatsApp, Google Meet, and Zoom options available across event types.',
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
            <p className="kujua-eyebrow" style={{ marginBottom: 14 }}>Delivery preferences</p>
            <h2 style={{ marginBottom: 12 }}>Meeting locations</h2>
            <p style={{ fontSize: '1rem', maxWidth: 760 }}>Configure in-person, phone, WhatsApp, Google Meet, and Zoom options available across event types.</p>
          </section>

<section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
  {['Google Meet', 'Zoom', 'In-person', 'Phone call', 'WhatsApp preference'].map((option) => (
    <article key={option} style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 20, padding: 20 }}>
      <h3 style={{ marginBottom: 10 }}>{option}</h3>
      <p style={{ margin: 0 }}>Enable and configure this location type for eligible event types.</p>
    </article>
  ))}
</section>

        </div>
      )
    }
