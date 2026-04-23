import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Financial Services',
  description: 'Bring payment-aware scheduling, client intake, and organized client records to advisory and professional finance workflows.',
}

export default function Page() {
  return (
    <section className="kujua-section">
      <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
        <span className="kujua-eyebrow">Financial Services</span>
        <h1 style={{ marginTop: '16px', marginBottom: '20px' }}>Structured booking for advisors and financial operators</h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)' }}>
          Bring payment-aware scheduling, client intake, and organized client records to advisory and professional finance workflows.
        </p>
      </div>
    </section>
  )
}
