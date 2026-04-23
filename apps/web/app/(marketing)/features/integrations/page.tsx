import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Integrations',
  description: 'Connect Kujua Time with calendars, payments, meeting tools, and external systems through webhooks.',
}

export default function IntegrationsFeaturePage() {
  return (
    <>
      <section className="kujua-section" style={{ background: 'var(--kujua-gray-50)' }}>
        <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
          <span className="kujua-eyebrow" style={{ marginBottom: '16px' }}>Integrations</span>
          <h1 style={{ marginBottom: '20px' }}>Connect the tools you already use</h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)', marginBottom: '32px' }}>
            Kujua Time is built to sit at the center of scheduling, payments, calendars, meeting locations, and downstream workflows.
          </p>
          <Link href="/signup" className="btn-primary">View integration paths</Link>
        </div>
      </section>
      <section className="kujua-section">
        <div className="kujua-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          {['Google Calendar', 'Stripe', 'Paystack', 'Google Meet', 'Zoom', 'Webhooks'].map((integration) => (
            <div key={integration} className="kujua-card" style={{ padding: '24px' }}>
              <h3 style={{ marginBottom: '8px' }}>{integration}</h3>
              <p>Supported as part of the core platform or roadmap-aligned integration surface.</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
