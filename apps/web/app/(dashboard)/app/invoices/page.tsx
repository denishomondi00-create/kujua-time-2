import type { Metadata } from 'next'
import Link from 'next/link'

    export const metadata: Metadata = {
      title: 'Invoices',
      description: 'Issue invoices, track send state, mark payments, void documents, and provide downloadable PDF records.',
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
            <p className="kujua-eyebrow" style={{ marginBottom: 14 }}>Billing operations</p>
            <h2 style={{ marginBottom: 12 }}>Invoices</h2>
            <p style={{ fontSize: '1rem', maxWidth: 760 }}>Issue invoices, track send state, mark payments, void documents, and provide downloadable PDF records.</p>
          </section>

<section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: 28 }}>
  <h3 style={{ marginBottom: 10 }}>No invoices created yet</h3>
  <p style={{ marginBottom: 20 }}>Use invoices for manual billing, follow-up charges, retainers, or work that happens outside the immediate booking checkout flow.</p>
  <Link href="/app/invoices/new" className="btn-primary">Create invoice</Link>
</section>

        </div>
      )
    }
