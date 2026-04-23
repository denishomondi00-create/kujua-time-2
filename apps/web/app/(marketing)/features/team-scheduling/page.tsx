import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Team Scheduling',
  description: 'Round-robin routing, shared availability, and team scheduling controls for growing businesses.',
}

export default function TeamSchedulingFeaturePage() {
  return (
    <>
      <section className="kujua-section" style={{ background: 'var(--kujua-gray-50)' }}>
        <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
          <span className="kujua-eyebrow" style={{ marginBottom: '16px' }}>Team Scheduling</span>
          <h1 style={{ marginBottom: '20px' }}>Grow from solo workflows into team operations</h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)', marginBottom: '32px' }}>
            Support shared ownership, collective availability, round robin routing, and team-level controls as your business adds staff.
          </p>
          <Link href="/signup" className="btn-primary">Explore team scheduling</Link>
        </div>
      </section>
      <section className="kujua-section">
        <div className="kujua-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          <div className="kujua-card" style={{ padding: '28px' }}>
            <h3 style={{ marginBottom: '12px' }}>Round robin</h3>
            <p>Distribute bookings fairly across team members based on availability rules.</p>
          </div>
          <div className="kujua-card" style={{ padding: '28px' }}>
            <h3 style={{ marginBottom: '12px' }}>Collective scheduling</h3>
            <p>Find overlapping availability when more than one person needs to attend.</p>
          </div>
          <div className="kujua-card" style={{ padding: '28px' }}>
            <h3 style={{ marginBottom: '12px' }}>Permissions and ownership</h3>
            <p>Separate who owns event types, calendars, and workflow visibility as the team expands.</p>
          </div>
        </div>
      </section>
    </>
  )
}
