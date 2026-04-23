export default function BookingsLoading() {
  return (
    <div style={{ display: 'grid', gap: 18 }}>
      <div className="skeleton" style={{ width: '28%', height: 24 }} />
      <div className="skeleton" style={{ width: '100%', height: 72, borderRadius: 24 }} />
      <div className="skeleton" style={{ width: '100%', height: 220, borderRadius: 24 }} />
    </div>
  )
}
