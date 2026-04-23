import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Professional Services',
  description: 'Use branded booking, client intake, and follow-up automations to reduce administrative drag across service-based professional firms.',
}

export default function Page() {
  return (
    <section className="kujua-section">
      <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
        <span className="kujua-eyebrow">Professional Services</span>
        <h1 style={{ marginTop: '16px', marginBottom: '20px' }}>Elevate the client experience across service delivery</h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)' }}>
          Use branded booking, client intake, and follow-up automations to reduce administrative drag across service-based professional firms.
        </p>
      </div>
    </section>
  )
}
