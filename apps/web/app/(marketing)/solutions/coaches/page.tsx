import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Scheduling for Coaches',
  description: 'Use branded booking pages, discovery-call flows, payment collection, and post-session follow-up to run a more organized coaching business.',
}

export default function Page() {
  return (
    <>
      <section className="kujua-section" style={{ background: 'var(--kujua-gray-50)' }}>
        <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
          <span className="kujua-eyebrow" style={{ marginBottom: '16px' }}>For Coaches</span>
          <h1 style={{ marginBottom: '20px' }}>Focus on your clients, not your calendar</h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)', marginBottom: '32px' }}>
            Use branded booking pages, discovery-call flows, payment collection, and post-session follow-up to run a more organized coaching business.
          </p>
          <Link href="/signup" className="btn-primary">Start with Kujua Time</Link>
        </div>
      </section>
    </>
  )
}
