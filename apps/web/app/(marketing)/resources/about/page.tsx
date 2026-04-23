import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Kujua Time',
  description: 'Kujua Time sits between lightweight scheduling links and heavy practice management software.',
}

export default function AboutPage() {
  return (
    <section className="kujua-section">
      <div className="kujua-container" style={{ maxWidth: '760px' }}>
        <div className="section-heading" style={{ marginBottom: '32px' }}>
          <span className="kujua-eyebrow" style={{ marginBottom: '16px', display: 'block' }}>About</span>
          <h1>Why Kujua Time exists</h1>
        </div>
        <div className="kujua-prose" style={{ marginInline: 'auto' }}>
          <p>Kujua Time sits between lightweight scheduling links and heavy practice management systems.</p>
          <p>The product is designed for service businesses that need more than a public booking link, but do not want the cost and operational weight of an enterprise-heavy platform.</p>
          <p>The central product belief is simple: every booking should become an operational record. That means the system should check the calendar, collect payment when needed, create or update the client record, and trigger the right follow-up workflow from one trusted path.</p>
        </div>
      </div>
    </section>
  )
}
