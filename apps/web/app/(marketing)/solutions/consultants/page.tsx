import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Scheduling for Consultants',
  description: 'Coordinate strategy calls, proposals, kickoffs, and paid advisory sessions from one structured workflow.',
}

export default function Page() {
  return (
    <>
      <section className="kujua-section" style={{ background: 'var(--kujua-gray-50)' }}>
        <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
          <span className="kujua-eyebrow" style={{ marginBottom: '16px' }}>For Consultants</span>
          <h1 style={{ marginBottom: '20px' }}>Streamline client onboarding and project kickoffs</h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)', marginBottom: '32px' }}>
            Coordinate strategy calls, proposals, kickoffs, and paid advisory sessions from one structured workflow.
          </p>
          <Link href="/signup" className="btn-primary">Start with Kujua Time</Link>
        </div>
      </section>
    </>
  )
}
