import type { Metadata } from 'next'

    export const metadata: Metadata = {
      title: 'Webhook settings',
      description: 'Register destinations, choose supported events, and inspect delivery policies for outbound automation hooks.',
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
            <p className="kujua-eyebrow" style={{ marginBottom: 14 }}>Outgoing events</p>
            <h2 style={{ marginBottom: 12 }}>Webhook settings</h2>
            <p style={{ fontSize: '1rem', maxWidth: 760 }}>Register destinations, choose supported events, and inspect delivery policies for outbound automation hooks.</p>
          </section>

<section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: 24 }}>
  <p style={{ marginBottom: 16 }}>Supported events include booking.created, booking.canceled, booking.rescheduled, payment.succeeded, invoice.created, client.created, and form.submitted.</p>
  <button type="button" className="btn-primary">Add webhook endpoint</button>
</section>

        </div>
      )
    }
