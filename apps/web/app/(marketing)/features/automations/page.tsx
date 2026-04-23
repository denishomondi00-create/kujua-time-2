import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Workflow Automations',
  description: 'Trigger emails, reminders, webhooks, and client updates automatically from booking and payment events.',
}

export default function AutomationsFeaturePage() {
  return (
    <>
      <section className="kujua-section" style={{ background: 'var(--kujua-gray-50)' }}>
        <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
          <span className="kujua-eyebrow" style={{ marginBottom: '16px' }}>Automations</span>
          <h1 style={{ marginBottom: '20px' }}>Set up once. Let the system keep moving.</h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)', marginBottom: '32px' }}>
            Kujua Time uses event-driven automations so confirmations, reminders, rebook prompts, and webhooks can run from a single native workflow engine.
          </p>
          <Link href="/signup" className="btn-primary">Explore automations</Link>
        </div>
      </section>
      <section className="kujua-section">
        <div className="kujua-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {['Booking confirmation', '24h reminder', '2h reminder', 'Cancellation flow', 'Payment receipt', 'No-show follow-up'].map((template) => (
            <div key={template} className="kujua-card" style={{ padding: '28px' }}>
              <h3 style={{ marginBottom: '12px' }}>{template}</h3>
              <p>Start from proven templates and adjust timing, conditions, and event filters without building from scratch.</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
