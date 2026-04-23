export default function Loading() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--kujua-gray-50)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          height: 68,
          background: 'var(--kujua-white)',
          borderBottom: '1px solid var(--kujua-gray-200)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          gap: '32px',
        }}
      >
        <div className="skeleton" style={{ width: 120, height: 28, borderRadius: '8px' }} />
        <div style={{ display: 'flex', gap: '20px', flex: 1 }}>
          {[80, 90, 80, 70].map((w, index) => (
            <div
              key={`top-nav-skeleton-${index}-${w}`}
              className="skeleton"
              style={{ width: w, height: 14, borderRadius: '4px' }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', gap: '12px', marginLeft: 'auto' }}>
          <div className="skeleton" style={{ width: 72, height: 14, borderRadius: '4px' }} />
          <div className="skeleton" style={{ width: 96, height: 36, borderRadius: '9999px' }} />
        </div>
      </div>
      <div
        style={{
          padding: '80px 24px',
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '64px',
          }}
        >
          <div className="skeleton" style={{ width: 120, height: 28, borderRadius: '9999px' }} />
          <div className="skeleton" style={{ width: '60%', height: 52, borderRadius: '12px' }} />
          <div className="skeleton" style={{ width: '45%', height: 52, borderRadius: '12px' }} />
          <div className="skeleton" style={{ width: '50%', height: 24, borderRadius: '8px', marginTop: '8px' }} />
        </div>
      </div>
    </div>
  )
}
