import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Solutions by Business Type',
  description:
    'See how Kujua Time adapts to coaches, consultants, therapists, tutors, wellness businesses, and growing teams.',
}

const cards = [
  { title: 'Coaches', description: 'Discovery calls, paid sessions, and follow-up workflows.', href: '/solutions/coaches' },
  { title: 'Consultants', description: 'Client onboarding, project calls, and invoice-linked workflows.', href: '/solutions/consultants' },
  { title: 'Tutors & Trainers', description: 'Repeat sessions, packs, and intake-based scheduling.', href: '/solutions/tutors' },
  { title: 'Therapists', description: 'Recurring appointments and structured client continuity.', href: '/solutions/therapists' },
  { title: 'Beauty & Wellness', description: 'Appointments, reminders, and payment-backed booking.', href: '/solutions/beauty-wellness' },
  { title: 'Small Businesses', description: 'A simple operating layer for service-led businesses.', href: '/solutions/small-business' },
  { title: 'Teams', description: 'Shared availability, routing, and ownership controls.', href: '/solutions/teams' },
]

export default function SolutionsPage() {
  return (
    <section className="kujua-section">
      <div className="kujua-container">
        <div className="section-heading" style={{ marginBottom: '48px' }}>
          <span className="kujua-eyebrow" style={{ marginBottom: '16px', display: 'block' }}>Solutions</span>
          <h1>Solutions for every service workflow</h1>
          <p style={{ marginTop: '16px', fontSize: '1.0625rem' }}>
            Kujua Time is designed for service operators who need scheduling, payments, and client management to work together.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {cards.map((card) => (
            <Link key={card.href} href={card.href} style={{ textDecoration: 'none' }}>
              <div className="kujua-card" style={{ padding: '24px' }}>
                <h3 style={{ marginBottom: '10px', fontSize: '1.125rem' }}>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
