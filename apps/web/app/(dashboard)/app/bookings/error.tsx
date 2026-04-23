'use client'

export default function BookingsError({ reset }: { reset: () => void }) {
  return (
    <div style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: 28, maxWidth: 720 }}>
      <p className="kujua-eyebrow" style={{ marginBottom: 12 }}>Bookings error</p>
      <h2 style={{ marginBottom: 10 }}>This bookings view is unavailable</h2>
      <p style={{ marginBottom: 20 }}>Try loading the page again. If the issue continues, review upstream payment or calendar sync health in reports and settings.</p>
      <button type="button" onClick={reset} className="btn-primary">Reload bookings</button>
    </div>
  )
}
