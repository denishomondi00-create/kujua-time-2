import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Calendar Sync',
  description: 'Google Calendar sync, conflict detection, and reliable busy-time reflection.',
}

export default function CalendarSyncFeaturePage() {
  return (
    <>
      <section className="kujua-section" style={{ background: 'var(--kujua-gray-50)' }}>
        <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
          <span className="kujua-eyebrow" style={{ marginBottom: '16px' }}>Calendar Sync</span>
          <h1 style={{ marginBottom: '20px' }}>Avoid double bookings without the guesswork</h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)', marginBottom: '32px' }}>
            Kujua Time is designed around Google Calendar integration with full sync on connect, incremental sync afterward, and conflict detection at booking time.
          </p>
          <Link href="/signup" className="btn-primary">Connect your calendar</Link>
        </div>
      </section>
      <section className="kujua-section">
        <div className="kujua-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          <div className="kujua-card" style={{ padding: '28px' }}>
            <h3 style={{ marginBottom: '12px' }}>Initial full sync</h3>
            <p>The first connection reads existing busy windows so your public slots start from a trusted calendar state.</p>
          </div>
          <div className="kujua-card" style={{ padding: '28px' }}>
            <h3 style={{ marginBottom: '12px' }}>Incremental updates</h3>
            <p>After the first sync, only changes are reconciled, reducing load while keeping availability accurate.</p>
          </div>
          <div className="kujua-card" style={{ padding: '28px' }}>
            <h3 style={{ marginBottom: '12px' }}>Reliable conflict checks</h3>
            <p>External busy events and confirmed Kujua Time bookings are both considered before a slot is finalized.</p>
          </div>
        </div>
      </section>
    </>
  )
}
