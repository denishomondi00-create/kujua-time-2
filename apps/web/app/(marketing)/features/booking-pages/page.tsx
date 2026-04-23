import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Branded Booking Pages',
  description:
    'Create clean, customisable booking pages with your logo, colours, copy, and shareable URLs.',
}

export default function BookingPagesFeaturePage() {
  return (
    <>
      <section className="kujua-section" style={{ background: 'var(--kujua-gray-50)' }}>
        <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
          <span className="kujua-eyebrow" style={{ marginBottom: '16px' }}>Booking Pages</span>
          <h1 style={{ marginBottom: '20px' }}>Your brand, front and center</h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)', marginBottom: '32px' }}>
            Do not send clients to a generic scheduling link. Kujua Time lets you publish a booking page that feels like your business.
          </p>
          <Link href="/signup" className="btn-primary">Design your page</Link>
        </div>
      </section>
      <section className="kujua-section">
        <div className="kujua-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center' }}>
          <div>
            <h2 style={{ marginBottom: '20px' }}>Everything important is customisable</h2>
            <ul className="kujua-prose" style={{ paddingLeft: '1rem' }}>
              <li>Logo, cover image, accent colour, and copy.</li>
              <li>Custom URL slugs for public booking pages.</li>
              <li>Simple sharing to email, WhatsApp, LinkedIn, and websites.</li>
              <li>Embed support for inline, modal, and floating booking widgets.</li>
            </ul>
          </div>
          <div className="kujua-card" style={{ minHeight: '320px', padding: '32px', background: 'var(--kujua-gradient-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div>
              <p className="kujua-badge kujua-badge-teal" style={{ marginBottom: '16px' }}>Public booking preview</p>
              <h3 style={{ marginBottom: '12px' }}>A page built to convert</h3>
              <p>Minimal steps, mobile-first layout, clear trust signals, and one strong call to action.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
