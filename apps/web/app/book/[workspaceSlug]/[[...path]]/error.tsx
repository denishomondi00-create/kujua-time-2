'use client'

import Link from 'next/link'

export default function PublicBookingError({ reset }: { reset: () => void }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--kujua-gray-50)', display: 'grid', placeItems: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 680, background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 28, padding: 32, textAlign: 'center' }}>
        <p className="kujua-eyebrow" style={{ marginBottom: 12 }}>Booking page error</p>
        <h1 style={{ fontSize: '2rem', marginBottom: 12 }}>This booking page couldn’t be loaded</h1>
        <p style={{ marginBottom: 22 }}>
          The public booking page may be unpublished, unavailable, or temporarily interrupted while availability or payment services recover.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button type="button" onClick={reset} className="btn-primary">Try again</button>
          <Link href="/" className="btn-secondary">Go to homepage</Link>
        </div>
      </div>
    </div>
  )
}
