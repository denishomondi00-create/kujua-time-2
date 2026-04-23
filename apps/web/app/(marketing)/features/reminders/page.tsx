import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Automated Reminders',
  description: 'Reduce no-shows with automated booking confirmations, reminder flows, and post-session follow-ups.',
}

export default function RemindersFeaturePage() {
  return (
    <>
      <section className="kujua-section" style={{ background: 'var(--kujua-gray-50)' }}>
        <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
          <span className="kujua-eyebrow" style={{ marginBottom: '16px' }}>Reminders</span>
          <h1 style={{ marginBottom: '20px' }}>Keep clients informed without manual follow-up</h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)', marginBottom: '32px' }}>
            Confirmation emails, reminder workflows, cancellation messages, and payment receipts all run from one automation layer.
          </p>
          <Link href="/signup" className="btn-primary">Automate reminders</Link>
        </div>
      </section>
      <section className="kujua-section">
        <div className="kujua-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          {['Booking confirmations', '24-hour reminders', '2-hour reminders', 'Cancellation confirmations', 'Payment receipts', 'Rebook prompts'].map((item) => (
            <div key={item} className="kujua-card" style={{ padding: '24px' }}>
              <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>{item}</h3>
              <p>Template-driven messages designed to keep the client workflow clear.</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
