import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Product – All Features',
  description:
    'Explore everything Kujua Time offers: branded booking pages, calendar sync, payments, client CRM, automations, and team scheduling for service businesses.',
  alternates: { canonical: 'https://kujuatime.com/product' },
}

const pillars = [
  {
    icon: '📅',
    title: 'Scheduling',
    description: 'One-on-one, group, and recurring sessions with smart availability rules, timezone-aware slots, and rescheduling flows.',
    features: ['Event types with custom availability', 'Buffers and minimum-notice rules', 'Timezone-aware slot generation', 'Reschedule and cancel flows', 'Booking approvals'],
    href: '/features/scheduling',
    color: 'var(--kujua-primary-teal)',
    bg: 'rgba(13,78,92,0.07)',
  },
  {
    icon: '🎨',
    title: 'Brand Presence',
    description: 'A booking page that looks like your brand — with your logo, colours, and clean public-facing pages.',
    features: ['Logo, cover image, and accent colour', 'Custom URL slug', 'Website embed widget', 'Simple sharing to email, WhatsApp, and social profiles'],
    href: '/features/booking-pages',
    color: 'var(--kujua-primary-amber)',
    bg: 'rgba(232,122,62,0.10)',
  },
  {
    icon: '🔄',
    title: 'Calendar & Meetings',
    description: 'Google Calendar integration with conflict detection and meeting location preferences.',
    features: ['Google Calendar support at launch', 'Conflict detection', 'Busy event reflection', 'Zoom, Google Meet, phone, WhatsApp, and in-person options'],
    href: '/features/calendar-sync',
    color: 'var(--kujua-secondary-sage)',
    bg: 'rgba(91,138,114,0.10)',
  },
  {
    icon: '👥',
    title: 'Client CRM',
    description: 'Every booking auto-creates or updates a client record with history, notes, form answers, and lifecycle context.',
    features: ['Auto-created from bookings', 'Booking history and notes', 'Internal tags and lifecycle stages', 'Block and export controls'],
    href: '/features/client-management',
    color: 'var(--kujua-info)',
    bg: 'rgba(58,124,165,0.10)',
  },
  {
    icon: '💳',
    title: 'Payments & Billing',
    description: 'Collect full payment or deposits at booking time with Stripe and Paystack support.',
    features: ['Full payment or deposit per event type', 'Stripe and Paystack integrations', 'Invoices later in deeper tiers', 'Refund and transaction history support'],
    href: '/features/payments',
    color: 'var(--kujua-success)',
    bg: 'rgba(45,140,106,0.10)',
  },
  {
    icon: '⚡',
    title: 'Workflow Automation',
    description: 'Confirmations, reminders, post-session follow-ups, and rebooking nudges run from a single event-driven workflow layer.',
    features: ['Booking confirmation emails', '24h and 2h reminder templates', 'Post-session follow-up flows', 'Cancellation, no-show, and payment workflows'],
    href: '/features/automations',
    color: 'var(--kujua-ai-accent)',
    bg: 'rgba(123,94,167,0.10)',
  },
]

export default function ProductPage() {
  return (
    <>
      <section style={{ padding: '80px 0 72px', background: 'var(--kujua-gray-50)', textAlign: 'center' }}>
        <div className="kujua-container">
          <span className="kujua-eyebrow" style={{ marginBottom: '20px', display: 'block' }}>Product</span>
          <h1 style={{ maxWidth: '680px', margin: '0 auto 20px' }}>
            Everything you need to run a service business booking workflow
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--kujua-gray-600)', maxWidth: '560px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Kujua Time combines scheduling, payments, client records, and automations into one clean system — without the complexity of enterprise-heavy software.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup" className="btn-primary">Start for free</Link>
            <Link href="/product-tour" className="btn-secondary">Watch product tour</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '96px 0', background: 'var(--kujua-white)' }}>
        <div className="kujua-container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
            {pillars.map((pillar, index) => (
              <div key={pillar.title} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center' }}>
                <div style={{ order: index % 2 === 0 ? 1 : 2 }}>
                  <div style={{ width: 56, height: 56, background: pillar.bg, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.625rem', marginBottom: '20px' }}>
                    {pillar.icon}
                  </div>
                  <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>{pillar.title}</h2>
                  <p style={{ fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '28px', color: 'var(--kujua-gray-600)' }}>{pillar.description}</p>
                  <Link href={pillar.href} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-display)', fontSize: '0.9375rem', fontWeight: 600, color: pillar.color, textDecoration: 'none' }}>
                    Explore {pillar.title}
                  </Link>
                </div>

                <div style={{ order: index % 2 === 0 ? 2 : 1, background: pillar.bg, borderRadius: '20px', padding: '32px' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: pillar.color, marginBottom: '20px' }}>
                    What&apos;s included
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {pillar.features.map((feature) => (
                      <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: 22, height: 22, borderRadius: '50%', background: pillar.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M2 5.5l3 3 4-4" />
                          </svg>
                        </div>
                        <span style={{ fontSize: '0.9375rem', color: 'var(--kujua-gray-800)' }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 24px', background: 'var(--kujua-gradient-warm)', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <h2 style={{ color: 'white', marginBottom: '16px' }}>Ready to see it in action?</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '36px', fontSize: '1.0625rem' }}>
            Take the product tour or start building your booking workflow now.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup" style={{ display: 'inline-flex', padding: '13px 32px', background: 'white', color: 'var(--kujua-primary-teal)', borderRadius: '9999px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9375rem', textDecoration: 'none' }}>
              Start for free
            </Link>
            <Link href="/product-tour" style={{ display: 'inline-flex', padding: '12px 32px', background: 'transparent', color: 'white', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: '9999px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }}>
              Watch tour
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
