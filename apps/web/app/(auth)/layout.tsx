import Link from 'next/link'

const benefits = [
  'Launch a branded booking page in minutes.',
  'Collect deposits and full payments with Stripe or Paystack.',
  'Create client records automatically from every booking.',
  'Run confirmations, reminders, and follow-ups from one system.',
]

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="auth-shell"
      style={{
        minHeight: '100vh',
        background: 'var(--kujua-gradient-subtle)',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.1fr) minmax(420px, 520px)',
      }}
    >
      <aside
        className="auth-sidebar"
        style={{
          padding: '48px clamp(24px, 4vw, 56px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: '1px solid var(--kujua-gray-200)',
        }}
      >
        <div>
          <Link
            href="/"
            className="kujua-brand-link kujua-brand-link-compact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '56px',
              textDecoration: 'none',
            }}
          >
            <img
              src="/kujuatime-logo-cropped.png"
              alt="Kujua Time logo"
              width={50}
              height={50}
              style={{ width: 50, height: 50, borderRadius: 14 }}
            />
            <span className="kujua-wordmark kujua-wordmark-stacked" style={{ fontSize: '1.24rem' }}>
              <span>Kujua</span>
              <span className="kujua-wordmark-accent">Time</span>
            </span>
          </Link>

          <div style={{ maxWidth: 560 }}>
            <p className="kujua-eyebrow" style={{ marginBottom: 16 }}>
              Scheduling + Payments + Client CRM
            </p>
            <h1 style={{ marginBottom: 20 }}>
              Book the appointment, collect the payment, and run the follow-up automatically.
            </h1>
            <p style={{ fontSize: '1.05rem', maxWidth: 520, marginBottom: 32 }}>
              Kujua Time is built for service businesses that want a premium booking experience
              without heavy operations software.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gap: 14,
              maxWidth: 560,
            }}
          >
            {benefits.map((benefit) => (
              <div
                key={benefit}
                style={{
                  display: 'flex',
                  gap: 12,
                  padding: '16px 18px',
                  borderRadius: 16,
                  background: 'rgba(255,255,255,0.78)',
                  border: '1px solid var(--kujua-gray-200)',
                  boxShadow: 'var(--kujua-shadow-sm)',
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 9999,
                    background: 'var(--kujua-success-bg)',
                    color: 'var(--kujua-success)',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                    fontWeight: 700,
                  }}
                >
                  ✓
                </div>
                <p style={{ color: 'var(--kujua-gray-800)', margin: 0 }}>{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <p style={{ fontSize: '0.875rem', margin: 0 }}>Built for coaches, consultants, therapists, tutors, and teams.</p>
          <p style={{ fontSize: '0.875rem', margin: 0 }}>Africa-friendly from day one with Paystack-first support.</p>
        </div>
      </aside>

      <main
        className="auth-main"
        style={{
          padding: '32px clamp(20px, 4vw, 40px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 480,
            background: 'var(--kujua-white)',
            border: '1px solid var(--kujua-gray-200)',
            borderRadius: 24,
            boxShadow: 'var(--kujua-shadow-xl)',
            padding: '32px clamp(20px, 4vw, 36px)',
          }}
        >
          {children}
        </div>
      </main>

      <style>{`
        @media (max-width: 980px) {
          .auth-shell {
            grid-template-columns: 1fr !important;
          }

          .auth-sidebar {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
