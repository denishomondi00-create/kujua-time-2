import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Technology',
  description: 'Coordinate product demos, customer onboarding, solution engineering sessions, and service-based consultations with cleaner routing and follow-up.',
}

export default function Page() {
  return (
    <section className="kujua-section">
      <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
        <span className="kujua-eyebrow">Technology</span>
        <h1 style={{ marginTop: '16px', marginBottom: '20px' }}>Support demos, onboarding, and success calls</h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)' }}>
          Coordinate product demos, customer onboarding, solution engineering sessions, and service-based consultations with cleaner routing and follow-up.
        </p>
      </div>
    </section>
  )
}
