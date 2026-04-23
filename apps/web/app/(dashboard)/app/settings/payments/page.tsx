import type { Metadata } from 'next'

    export const metadata: Metadata = {
      title: 'Payment settings',
      description: 'Manage provider connections, settlement preferences, deposit defaults, and invoice payment behavior.',
    }

    export default function Page() {
      return (
        <div style={{ display: 'grid', gap: 24 }}>
          <section
            style={{
              background: 'var(--kujua-white)',
              border: '1px solid var(--kujua-gray-200)',
              borderRadius: 24,
              padding: '28px',
              boxShadow: 'var(--kujua-shadow-sm)',
            }}
          >
            <p className="kujua-eyebrow" style={{ marginBottom: 14 }}>Gateways and billing defaults</p>
            <h2 style={{ marginBottom: 12 }}>Payment settings</h2>
            <p style={{ fontSize: '1rem', maxWidth: 760 }}>Manage provider connections, settlement preferences, deposit defaults, and invoice payment behavior.</p>
          </section>

<section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
  {['Stripe connection', 'Paystack connection', 'Default deposit policy', 'Refund handling policy'].map((item) => (
    <div key={item} style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 20, padding: 20 }}>{item}</div>
  ))}
</section>

        </div>
      )
    }
