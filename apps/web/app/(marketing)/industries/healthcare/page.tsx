import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Healthcare',
  description: 'Support appointment workflows, intake collection, and patient-facing scheduling patterns while keeping the product simpler than a clinic OS.',
}

export default function Page() {
  return (
    <section className="kujua-section">
      <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
        <span className="kujua-eyebrow">Healthcare</span>
        <h1 style={{ marginTop: '16px', marginBottom: '20px' }}>Organize appointment intake and recurring bookings</h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)' }}>
          Support appointment workflows, intake collection, and patient-facing scheduling patterns while keeping the product simpler than a clinic OS.
        </p>
      </div>
    </section>
  )
}
