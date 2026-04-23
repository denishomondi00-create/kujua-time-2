import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Product Tour',
  description: 'A guided walkthrough of Kujua Time scheduling, payments, client CRM, and automation flows.',
}

const steps = [
  { title: 'Create your event type', description: 'Define duration, availability, booking rules, and payment behavior.' },
  { title: 'Customize the booking page', description: 'Add your brand, copy, and meeting preferences so the page matches your business.' },
  { title: 'Connect calendar and payments', description: 'Sync Google Calendar and turn on Stripe or Paystack for payment-backed booking.' },
  { title: 'Let the workflow run', description: 'Bookings create client records and trigger reminders and follow-up automatically.' },
]

export default function ProductTourPage() {
  return (
    <section className="kujua-section bg-mesh" style={{ background: 'var(--kujua-gray-50)' }}>
      <div className="kujua-container">
        <div className="section-heading" style={{ marginBottom: '48px' }}>
          <span className="kujua-eyebrow" style={{ marginBottom: '16px', display: 'block' }}>Product Tour</span>
          <h1>See Kujua Time in action</h1>
          <p style={{ marginTop: '16px', fontSize: '1.0625rem' }}>
            A simple walkthrough of how scheduling, payments, reminders, and client records work together.
          </p>
        </div>

        <div className="kujua-card" style={{ padding: '32px', marginBottom: '40px', background: 'var(--kujua-white)' }}>
          <div style={{ minHeight: '280px', borderRadius: '20px', background: 'var(--kujua-gradient-subtle)', border: '1px solid var(--kujua-gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px' }}>
            <div>
              <p className="kujua-badge kujua-badge-teal" style={{ marginBottom: '16px' }}>Guided walkthrough</p>
              <h3 style={{ marginBottom: '12px' }}>Tour player area</h3>
              <p>Replace this section with a product video or interactive demo when marketing assets are ready.</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {steps.map((step, index) => (
            <div key={step.title} className="kujua-card" style={{ padding: '24px' }}>
              <p className="kujua-badge kujua-badge-amber" style={{ marginBottom: '14px' }}>Step {index + 1}</p>
              <h3 style={{ marginBottom: '10px', fontSize: '1.0625rem' }}>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/signup" className="btn-primary">Ready? Start free</Link>
        </div>
      </div>
    </section>
  )
}
