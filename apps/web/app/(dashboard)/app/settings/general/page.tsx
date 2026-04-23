import type { Metadata } from 'next'

    export const metadata: Metadata = {
      title: 'General settings',
      description: 'Update business name, timezone, contact details, and base operational preferences for the workspace.',
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
            <p className="kujua-eyebrow" style={{ marginBottom: 14 }}>Workspace profile</p>
            <h2 style={{ marginBottom: 12 }}>General settings</h2>
            <p style={{ fontSize: '1rem', maxWidth: 760 }}>Update business name, timezone, contact details, and base operational preferences for the workspace.</p>
          </section>

<section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: 24 }}>
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
    <input className="kujua-input" placeholder="Business name" />
    <input className="kujua-input" placeholder="Default timezone" />
    <input className="kujua-input" placeholder="Support email" />
    <input className="kujua-input" placeholder="Business phone" />
  </div>
</section>

        </div>
      )
    }
