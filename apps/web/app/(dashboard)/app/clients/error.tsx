'use client'

export default function ClientsError({ reset }: { reset: () => void }) {
  return (
    <div style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: 28, maxWidth: 720 }}>
      <p className="kujua-eyebrow" style={{ marginBottom: 12 }}>Client records error</p>
      <h2 style={{ marginBottom: 10 }}>Client data could not be loaded</h2>
      <p style={{ marginBottom: 20 }}>Refresh the view to retry. You can still manage availability, event types, and settings while this section recovers.</p>
      <button type="button" onClick={reset} className="btn-primary">Reload clients</button>
    </div>
  )
}
