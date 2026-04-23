import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Scheduling for Small Businesses',
  description: 'Kujua Time helps solo operators and small teams combine scheduling, payments, reminders, and client records in one place.',
}

export default function Page() {
  return (
    <>
      <section className="kujua-section" style={{ background: 'var(--kujua-gray-50)' }}>
        <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
          <span className="kujua-eyebrow" style={{ marginBottom: '16px' }}>For Small Businesses</span>
          <h1 style={{ marginBottom: '20px' }}>An operating layer for service-led businesses</h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)', marginBottom: '32px' }}>
            Kujua Time helps solo operators and small teams combine scheduling, payments, reminders, and client records in one place.
          </p>
          <Link href="/signup" className="btn-primary">Start with Kujua Time</Link>
        </div>
      </section>
    </>
  )
}
