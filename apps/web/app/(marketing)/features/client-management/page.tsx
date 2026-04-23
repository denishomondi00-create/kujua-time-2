import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Client Management & CRM',
  description: 'Every booking can auto-create or update a client record with history, notes, forms, and operational context.',
}

export default function ClientCRMFeaturePage() {
  return (
    <>
      <section className="kujua-section bg-mesh" style={{ background: 'var(--kujua-gray-50)' }}>
        <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
          <span className="kujua-eyebrow" style={{ marginBottom: '16px' }}>Client CRM</span>
          <h1 style={{ marginBottom: '20px' }}>Every booking becomes a usable client record</h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)', marginBottom: '32px' }}>
            Kujua Time is built around the idea that bookings should create real operational value, not just calendar events.
          </p>
          <Link href="/signup" className="btn-primary">Start managing clients</Link>
        </div>
      </section>
      <section className="kujua-section">
        <div className="kujua-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          <div className="kujua-card" style={{ padding: '28px' }}>
            <h3 style={{ marginBottom: '12px' }}>Timeline view</h3>
            <p>Keep booking history, payments, notes, and form activity in one chronological record.</p>
          </div>
          <div className="kujua-card" style={{ padding: '28px' }}>
            <h3 style={{ marginBottom: '12px' }}>Operational notes</h3>
            <p>Add internal notes without pushing the team into a separate CRM or spreadsheet.</p>
          </div>
          <div className="kujua-card" style={{ padding: '28px' }}>
            <h3 style={{ marginBottom: '12px' }}>Lifecycle context</h3>
            <p>Tag clients across lead, active, inactive, or VIP stages to support follow-up and reporting.</p>
          </div>
        </div>
      </section>
    </>
  )
}
