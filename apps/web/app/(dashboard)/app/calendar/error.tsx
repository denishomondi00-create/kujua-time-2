'use client'

export default function CalendarError({ reset }: { reset: () => void }) {
  return (
    <div style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: 28, maxWidth: 720 }}>
      <p className="kujua-eyebrow" style={{ marginBottom: 12 }}>Calendar error</p>
      <h2 style={{ marginBottom: 10 }}>The calendar view could not be loaded</h2>
      <p style={{ marginBottom: 20 }}>Please reload the current view or return to the main dashboard while availability sync completes.</p>
      <button type="button" onClick={reset} className="btn-primary">Reload calendar</button>
    </div>
  )
}
