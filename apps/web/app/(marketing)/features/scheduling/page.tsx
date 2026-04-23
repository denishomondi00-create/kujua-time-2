import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Scheduling Features',
  description:
    'Smart availability rules, timezone-aware slots, booking windows, and rescheduling flows for modern service businesses.',
}

const capabilities = [
  { title: 'Smart availability', description: 'Define working hours, booking windows, breaks, and per-event rules without exposing unnecessary complexity to the client.' },
  { title: 'Buffers and limits', description: 'Automatically add spacing before and after sessions, control minimum notice, and cap daily load.' },
  { title: 'Timezone intelligence', description: 'Clients see slots in their timezone while your schedule stays grounded in your own calendar context.' },
  { title: 'Reschedule and cancel flows', description: 'Allow safe rescheduling and cancellations through client-facing flows rather than manual back-and-forth.' },
]

export default function SchedulingFeaturePage() {
  return (
    <>
      <section className="kujua-section bg-mesh" style={{ background: 'var(--kujua-gray-50)' }}>
        <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
          <span className="kujua-eyebrow" style={{ marginBottom: '16px' }}>Core Scheduling</span>
          <h1 style={{ marginBottom: '20px' }}>The engine behind every booking</h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)', marginBottom: '32px' }}>
            Kujua Time is designed around on-demand slot computation, clear booking rules, and reliable conflict checks so service operators can trust what clients see.
          </p>
          <Link href="/signup" className="btn-primary">Start scheduling free</Link>
        </div>
      </section>
      <section className="kujua-section">
        <div className="kujua-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {capabilities.map((item) => (
              <div key={item.title} className="kujua-card" style={{ padding: '28px' }}>
                <h3 style={{ marginBottom: '12px', fontSize: '1.125rem' }}>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
