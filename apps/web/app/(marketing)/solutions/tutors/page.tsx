import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Scheduling for Tutors & Trainers',
  description: 'Organize class bookings, recurring sessions, intake forms, and payment-backed scheduling without juggling separate tools.',
}

export default function Page() {
  return (
    <>
      <section className="kujua-section" style={{ background: 'var(--kujua-gray-50)' }}>
        <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
          <span className="kujua-eyebrow" style={{ marginBottom: '16px' }}>For Tutors & Trainers</span>
          <h1 style={{ marginBottom: '20px' }}>Manage sessions, passes, and payments cleanly</h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)', marginBottom: '32px' }}>
            Organize class bookings, recurring sessions, intake forms, and payment-backed scheduling without juggling separate tools.
          </p>
          <Link href="/signup" className="btn-primary">Start with Kujua Time</Link>
        </div>
      </section>
    </>
  )
}
