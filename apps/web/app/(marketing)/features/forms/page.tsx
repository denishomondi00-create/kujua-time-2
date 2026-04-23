import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Intake Forms',
  description: 'Collect the right client information before the appointment starts.',
}

export default function FormsFeaturePage() {
  return (
    <>
      <section className="kujua-section" style={{ background: 'var(--kujua-gray-50)' }}>
        <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
          <span className="kujua-eyebrow" style={{ marginBottom: '16px' }}>Forms</span>
          <h1 style={{ marginBottom: '20px' }}>Capture context before the session begins</h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)', marginBottom: '32px' }}>
            Ask the right questions at booking time so the session starts with the information you already need.
          </p>
          <Link href="/signup" className="btn-primary">Build intake forms</Link>
        </div>
      </section>
      <section className="kujua-section">
        <div className="kujua-container" style={{ maxWidth: '820px' }}>
          <div className="kujua-card" style={{ padding: '32px' }}>
            <h2 style={{ marginBottom: '16px' }}>Built for operational intake</h2>
            <p style={{ marginBottom: '20px' }}>
              Attach forms to event types, collect answers before confirmation, and store the resulting responses directly on the client record.
            </p>
            <ul className="kujua-prose" style={{ paddingLeft: '1rem' }}>
              <li>Basic contact details and service context.</li>
              <li>Conditional operational questions by event type.</li>
              <li>Storage of form answers in client history.</li>
              <li>Future support for files and richer workflows.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
