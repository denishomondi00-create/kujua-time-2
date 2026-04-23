import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Developers & API',
  description: 'Build on Kujua Time with REST APIs, webhooks, and embed support.',
}

export default function DevelopersPage() {
  return (
    <section className="kujua-section" style={{ background: 'var(--kujua-charcoal)', color: 'white' }}>
      <div className="kujua-container" style={{ textAlign: 'center', maxWidth: '760px' }}>
        <span className="kujua-eyebrow" style={{ color: 'var(--kujua-primary-amber)', marginBottom: '16px' }}>
          Developers
        </span>
        <h1 style={{ marginBottom: '20px', color: 'white' }}>Build on Kujua Time</h1>
        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.0625rem' }}>
          Use webhooks, public booking endpoints, and embeddable booking widgets to connect Kujua Time to the rest of your workflow.
        </p>
      </div>
    </section>
  )
}
