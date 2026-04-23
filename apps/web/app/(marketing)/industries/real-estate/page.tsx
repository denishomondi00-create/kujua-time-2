import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Real Estate',
  description: 'Coordinate consultations, viewings, and follow-up conversations without relying on fragmented manual scheduling.',
}

export default function Page() {
  return (
    <section className="kujua-section">
      <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
        <span className="kujua-eyebrow">Real Estate</span>
        <h1 style={{ marginTop: '16px', marginBottom: '20px' }}>Automate property viewings and client meetings</h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)' }}>
          Coordinate consultations, viewings, and follow-up conversations without relying on fragmented manual scheduling.
        </p>
      </div>
    </section>
  )
}
