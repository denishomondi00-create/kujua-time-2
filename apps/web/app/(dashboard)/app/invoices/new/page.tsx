import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create invoice',
  description: 'Create a new invoice for a client or booking-related service.',
}

export default function NewInvoicePage() {
  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: 24 }}>
        <p className="kujua-eyebrow" style={{ marginBottom: 12 }}>New invoice</p>
        <h2 style={{ marginBottom: 8 }}>Create a billable document</h2>
        <p style={{ maxWidth: 760 }}>Generate a manual invoice for a client, attach line items, and send it with a clear payment trail.</p>
      </section>
      <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 20, padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <label htmlFor="client" style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: 'var(--kujua-charcoal)' }}>Client</label>
            <input id="client" className="kujua-input" placeholder="Search or select a client" />
          </div>
          <div>
            <label htmlFor="dueDate" style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: 'var(--kujua-charcoal)' }}>Due date</label>
            <input id="dueDate" type="date" className="kujua-input" />
          </div>
        </div>
        <textarea className="kujua-input" rows={5} placeholder="Add invoice line items, payment notes, or service description" />
        <div style={{ marginTop: 16 }}>
          <button type="button" className="btn-primary">Save invoice draft</button>
        </div>
      </section>
    </div>
  )
}
