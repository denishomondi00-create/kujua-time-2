import type { Metadata } from 'next'

    export const metadata: Metadata = {
      title: 'Team member detail',
      description: 'Inspect a member profile, calendar ownership, assigned event types, and permission scope.',
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
            <p className="kujua-eyebrow" style={{ marginBottom: 14 }}>Workspace role</p>
            <h2 style={{ marginBottom: 12 }}>Team member detail</h2>
            <p style={{ fontSize: '1rem', maxWidth: 760 }}>Inspect a member profile, calendar ownership, assigned event types, and permission scope.</p>
          </section>

<section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: 28 }}>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
    {['Role and permission scope', 'Owned calendars', 'Assigned event types', 'Booking ownership and activity'].map((item) => (
      <div key={item} style={{ padding: '14px 16px', borderRadius: 14, background: 'var(--kujua-gray-50)', border: '1px solid var(--kujua-gray-200)' }}>{item}</div>
    ))}
  </div>
</section>

        </div>
      )
    }
