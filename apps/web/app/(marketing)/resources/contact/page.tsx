import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Sales & Support',
  description: 'Talk to the Kujua Time team about pricing, partnerships, or implementation questions.',
}

export default function Page() {
  return (
    <section className="kujua-section">
      <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '16px' }}>Contact Sales & Support</h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)' }}>Talk to the Kujua Time team about pricing, partnerships, or implementation questions.</p>
      </div>
    </section>
  )
}
