import Link from 'next/link'

export default function PublicBookingNotFound() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--kujua-gray-50)', display: 'grid', placeItems: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 680, background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 28, padding: 32, textAlign: 'center' }}>
        <p className="kujua-eyebrow" style={{ marginBottom: 12 }}>Booking page not found</p>
        <h1 style={{ fontSize: '2rem', marginBottom: 12 }}>This booking link is not available</h1>
        <p style={{ marginBottom: 22 }}>
          The event may have been unpublished, moved to a new path, or removed from this workspace.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn-primary">Back to homepage</Link>
          <Link href="/resources/help-center" className="btn-secondary">Open help</Link>
        </div>
      </div>
    </div>
  )
}
