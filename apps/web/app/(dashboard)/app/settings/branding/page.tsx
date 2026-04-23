import type { Metadata } from 'next'

    export const metadata: Metadata = {
      title: 'Branding settings',
      description: 'Control logo, accent colors, cover imagery, booking page copy, and other brand presentation settings.',
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
            <p className="kujua-eyebrow" style={{ marginBottom: 14 }}>Public presentation</p>
            <h2 style={{ marginBottom: 12 }}>Branding settings</h2>
            <p style={{ fontSize: '1rem', maxWidth: 760 }}>Control logo, accent colors, cover imagery, booking page copy, and other brand presentation settings.</p>
          </section>

<section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: 24 }}>
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
    <input className="kujua-input" defaultValue="#0D4E5C" aria-label="Primary color" />
    <input className="kujua-input" defaultValue="#E87A3E" aria-label="Accent color" />
    <input className="kujua-input" placeholder="Booking page headline" />
    <input className="kujua-input" placeholder="Custom URL slug" />
  </div>
</section>

        </div>
      )
    }
