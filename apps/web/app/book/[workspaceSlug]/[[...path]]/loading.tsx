export default function PublicBookingLoading() {
  return (
    <>
      <div style={{ minHeight: '100vh', background: 'var(--kujua-gray-50)', padding: '40px 0' }}>
        <div className="kujua-container public-booking-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 420px', gap: 20 }}>
          <div style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 28, padding: 28 }}>
            <div className="skeleton" style={{ width: 120, height: 14, marginBottom: 16 }} />
            <div className="skeleton" style={{ width: '60%', height: 36, marginBottom: 12 }} />
            <div className="skeleton" style={{ width: '80%', height: 14, marginBottom: 24 }} />
            <div className="public-booking-slots" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 }}>
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="skeleton" style={{ height: 54 }} />
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gap: 16 }}>
            <div className="skeleton" style={{ height: 220, borderRadius: 24 }} />
            <div className="skeleton" style={{ height: 220, borderRadius: 24 }} />
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 980px) { .public-booking-grid { grid-template-columns: 1fr !important; } } @media (max-width: 720px) { .public-booking-slots { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }`}</style>
    </>
  )
}
