import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Payments & Deposits',
  description: 'Collect full payments or deposits at booking time with Stripe and Paystack support.',
}

export default function PaymentsFeaturePage() {
  return (
    <>
      <section className="kujua-section" style={{ background: 'var(--kujua-gray-50)' }}>
        <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
          <span className="kujua-eyebrow" style={{ marginBottom: '16px' }}>Payments</span>
          <h1 style={{ marginBottom: '20px' }}>Get paid when the booking happens</h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)', marginBottom: '32px' }}>
            Eliminate invoice chasing and reduce low-intent bookings by collecting full payment or deposits directly in the booking flow.
          </p>
          <Link href="/signup" className="btn-primary">Start collecting payments</Link>
        </div>
      </section>
      <section className="kujua-section">
        <div className="kujua-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          <div className="kujua-card" style={{ padding: '28px' }}>
            <h3 style={{ marginBottom: '12px' }}>Paystack-first support</h3>
            <p>Built with African payment realities in mind while still supporting broader international payment flows through Stripe.</p>
          </div>
          <div className="kujua-card" style={{ padding: '28px' }}>
            <h3 style={{ marginBottom: '12px' }}>Flexible billing logic</h3>
            <p>Require full payment, a deposit, or optional payment depending on the event type and your business model.</p>
          </div>
          <div className="kujua-card" style={{ padding: '28px' }}>
            <h3 style={{ marginBottom: '12px' }}>Provider-safe finalization</h3>
            <p>Booking confirmation can be finalized from verified payment events rather than untrusted client callbacks alone.</p>
          </div>
        </div>
      </section>
    </>
  )
}
