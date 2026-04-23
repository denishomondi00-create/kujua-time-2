import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Customers',
  description: 'Examples of how service businesses can use Kujua Time in real workflows.',
}

export default function CustomersPage() {
  return (
    <section className="kujua-section" style={{ background: 'var(--kujua-charcoal)', color: 'white' }}>
      <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '16px' }}>Built for real service workflows</h1>
        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.0625rem' }}>
          Customer stories can showcase how coaches, consultants, therapists, wellness operators, and teams run better booking operations with Kujua Time.
        </p>
      </div>
    </section>
  )
}
