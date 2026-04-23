export default function DashboardLoading() {
  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <div className="skeleton" style={{ width: '40%', height: 26 }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 18, padding: 20 }}>
            <div className="skeleton" style={{ width: '45%', height: 12, marginBottom: 16 }} />
            <div className="skeleton" style={{ width: '70%', height: 26, marginBottom: 12 }} />
            <div className="skeleton" style={{ width: '80%', height: 12 }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16 }}>
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 18, padding: 20, minHeight: 260 }}>
            <div className="skeleton" style={{ width: '30%', height: 14, marginBottom: 18 }} />
            <div className="skeleton" style={{ width: '100%', height: 14, marginBottom: 10 }} />
            <div className="skeleton" style={{ width: '90%', height: 14, marginBottom: 10 }} />
            <div className="skeleton" style={{ width: '70%', height: 14 }} />
          </div>
        ))}
      </div>
    </div>
  )
}
