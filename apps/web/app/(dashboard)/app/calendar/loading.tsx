export default function CalendarLoading() {
  return (
    <div style={{ display: 'grid', gap: 18 }}>
      <div className="skeleton" style={{ width: '32%', height: 26 }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 12 }}>
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 18, padding: 16, minHeight: 180 }}>
            <div className="skeleton" style={{ width: '50%', height: 14, marginBottom: 12 }} />
            <div className="skeleton" style={{ width: '40%', height: 12, marginBottom: 20 }} />
            <div className="skeleton" style={{ width: '100%', height: 36, marginBottom: 10 }} />
            <div className="skeleton" style={{ width: '100%', height: 36 }} />
          </div>
        ))}
      </div>
    </div>
  )
}
