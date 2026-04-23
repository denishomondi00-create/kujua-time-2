import { Fragment } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing – Simple, transparent plans',
  description:
    'Explore Kujua Time plan structure from Free to Premium. Compare capabilities across scheduling, client management, payments, automations, and team features.',
  alternates: { canonical: 'https://kujuatime.com/pricing' },
}

const plans = [
  {
    name: 'Free',
    tagline: 'Try Kujua Time with essential scheduling tools.',
    priceLabel: 'Free',
    cta: 'Start for free',
    ctaHref: '/signup',
    highlights: ['1 user', '1 event type', '1 connected calendar', 'Unlimited bookings', 'Basic booking page', 'Email confirmations and reminders', 'Basic client management'],
  },
  {
    name: 'Standard',
    tagline: 'For solo professionals and growing service businesses.',
    priceLabel: 'Contact sales',
    cta: 'Talk to sales',
    ctaHref: '/resources/contact',
    recommended: true,
    highlights: ['Everything in Free', 'Unlimited event types', 'Up to 6 calendars', 'Two-way Google Calendar sync', 'Custom branding', 'Forms and intake questions', 'Reminder and follow-up workflows', 'Stripe and Paystack', 'Basic reporting'],
  },
  {
    name: 'Pro',
    tagline: 'For practices and advanced service operators.',
    priceLabel: 'Contact sales',
    cta: 'Talk to sales',
    ctaHref: '/resources/contact',
    highlights: ['Everything in Standard', 'Group bookings', 'Packages and passes', 'Invoices', 'Waitlist', 'Advanced reminders', 'Round-robin scheduling', 'Analytics dashboard'],
  },
  {
    name: 'Premium',
    tagline: 'For larger teams and expanding organisations.',
    priceLabel: 'Custom',
    cta: 'Contact sales',
    ctaHref: '/resources/contact',
    highlights: ['Everything in Pro', 'Advanced roles and permissions', 'Audit logs', 'White-label domain', 'Advanced routing', 'Retention and deletion controls', 'Dedicated support', 'SSO and SAML later'],
  },
]

const compareFeatures = [
  {
    category: 'Scheduling',
    rows: [
      { label: 'Event types', free: '1', standard: 'Unlimited', pro: 'Unlimited', premium: 'Unlimited' },
      { label: 'Calendars', free: '1', standard: 'Up to 6', pro: 'Expanded support', premium: 'Custom scale' },
      { label: 'Bookings per month', free: 'Unlimited', standard: 'Unlimited', pro: 'Unlimited', premium: 'Unlimited' },
      { label: 'Two-way Google Calendar sync', free: false, standard: true, pro: true, premium: true },
      { label: 'Group bookings', free: false, standard: false, pro: true, premium: true },
      { label: 'Round-robin scheduling', free: false, standard: false, pro: true, premium: true },
    ],
  },
  {
    category: 'Payments',
    rows: [
      { label: 'Stripe and Paystack', free: true, standard: true, pro: true, premium: true },
      { label: 'Deposits', free: true, standard: true, pro: true, premium: true },
      { label: 'Invoices', free: false, standard: false, pro: true, premium: true },
      { label: 'Packages and passes', free: false, standard: false, pro: true, premium: true },
    ],
  },
  {
    category: 'Client Management',
    rows: [
      { label: 'Auto-created client records', free: true, standard: true, pro: true, premium: true },
      { label: 'Forms and intake', free: false, standard: true, pro: true, premium: true },
      { label: 'Client portal', free: false, standard: false, pro: true, premium: true },
      { label: 'Data export', free: false, standard: true, pro: true, premium: true },
    ],
  },
]

function FeatureValue({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return value ? (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--kujua-success)" strokeWidth="2.5" strokeLinecap="round" style={{ display: 'inline-block' }}>
        <path d="M2 8l5 5 7-7" />
      </svg>
    ) : (
      <span style={{ color: 'var(--kujua-gray-300)', fontSize: '1.125rem' }}>—</span>
    )
  }

  return (
    <span style={{ fontSize: '0.8125rem', color: 'var(--kujua-gray-700)' }}>
      {value}
    </span>
  )
}

export default function PricingPage() {
  return (
    <>
      <section style={{ padding: '80px 0 72px', background: 'var(--kujua-gray-50)', textAlign: 'center' }}>
        <div className="kujua-container">
          <span className="kujua-eyebrow" style={{ marginBottom: '20px', display: 'block' }}>Pricing</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', marginBottom: '20px', maxWidth: '640px', marginInline: 'auto' }}>
            Simple plans built around how service businesses grow
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--kujua-gray-600)', maxWidth: '560px', margin: '0 auto 48px' }}>
            Start with core scheduling, then add payments, client workflows, automation, and team controls as the business grows.
          </p>
        </div>
      </section>

      <section style={{ padding: '64px 0 96px', background: 'var(--kujua-white)' }}>
        <div className="kujua-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', alignItems: 'start' }}>
            {plans.map((plan) => (
              <div key={plan.name} style={{ padding: '32px 24px', background: plan.recommended ? 'var(--kujua-primary-teal)' : 'var(--kujua-white)', border: `1.5px solid ${plan.recommended ? 'var(--kujua-primary-teal)' : 'var(--kujua-gray-200)'}`, borderRadius: '20px', boxShadow: plan.recommended ? 'var(--kujua-shadow-xl)' : 'var(--kujua-shadow-sm)', position: 'relative' }}>
                {plan.recommended ? <span style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', background: 'var(--kujua-primary-amber)', color: 'white', fontSize: '0.6875rem', fontWeight: 800, padding: '4px 14px', borderRadius: '9999px', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>MOST POPULAR</span> : null}
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700, color: plan.recommended ? 'white' : 'var(--kujua-charcoal)', marginBottom: '6px' }}>{plan.name}</p>
                <p style={{ fontSize: '0.875rem', color: plan.recommended ? 'rgba(255,255,255,0.65)' : 'var(--kujua-gray-600)', marginBottom: '20px', lineHeight: 1.5 }}>{plan.tagline}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '24px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: plan.recommended ? 'white' : 'var(--kujua-charcoal)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                    {plan.priceLabel}
                  </span>
                </div>
                <Link href={plan.ctaHref} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '12px', borderRadius: '9999px', fontFamily: 'var(--font-display)', fontSize: '0.9375rem', fontWeight: 600, textDecoration: 'none', marginBottom: '24px', background: plan.recommended ? 'white' : 'var(--kujua-primary-amber)', color: plan.recommended ? 'var(--kujua-primary-teal)' : 'white' }}>
                  {plan.cta}
                </Link>
                <div style={{ borderTop: `1px solid ${plan.recommended ? 'rgba(255,255,255,0.15)' : 'var(--kujua-gray-100)'}`, paddingTop: '24px' }}>
                  {plan.highlights.map((highlight) => (
                    <div key={highlight} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px', fontSize: '0.875rem', color: plan.recommended ? 'rgba(255,255,255,0.85)' : 'var(--kujua-gray-700)' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={plan.recommended ? 'rgba(255,255,255,0.6)' : 'var(--kujua-success)'} strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                        <path d="M2 7l4 4 6-6" />
                      </svg>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 96px', background: 'var(--kujua-white)' }}>
        <div className="kujua-container">
          <h2 style={{ textAlign: 'center', marginBottom: '48px' }}>Full feature comparison</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', minWidth: '640px' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px 16px', width: '40%', color: 'var(--kujua-gray-600)', fontWeight: 600 }}>Feature</th>
                  {plans.map((plan) => (
                    <th key={plan.name} style={{ textAlign: 'center', padding: '12px 8px', fontFamily: 'var(--font-display)', fontSize: '0.9375rem', fontWeight: 700, color: plan.recommended ? 'var(--kujua-primary-teal)' : 'var(--kujua-charcoal)' }}>
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareFeatures.map((group) => (
                  <Fragment key={group.category}>
                    <tr>
                      <td colSpan={5} style={{ padding: '16px 16px 8px', fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--kujua-gray-400)', textTransform: 'uppercase', letterSpacing: '0.07em', background: 'var(--kujua-gray-50)', borderTop: '1px solid var(--kujua-gray-200)' }}>
                        {group.category}
                      </td>
                    </tr>
                    {group.rows.map((row) => (
                      <tr key={row.label} style={{ borderBottom: '1px solid var(--kujua-gray-100)' }}>
                        <td style={{ padding: '12px 16px', color: 'var(--kujua-gray-800)' }}>{row.label}</td>
                        {(['free', 'standard', 'pro', 'premium'] as const).map((key) => (
                          <td key={key} style={{ textAlign: 'center', padding: '12px 8px' }}>
                            <FeatureValue value={row[key]} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 24px', background: 'var(--kujua-gradient-warm)', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <h2 style={{ color: 'white', marginBottom: '16px' }}>Start with the right plan</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '36px', fontSize: '1.0625rem' }}>
            Begin with free scheduling or talk to the team about the right launch plan for your business.
          </p>
          <Link href="/signup" style={{ display: 'inline-flex', padding: '14px 36px', background: 'white', color: 'var(--kujua-primary-teal)', borderRadius: '9999px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
            Get started free
          </Link>
        </div>
      </section>
    </>
  )
}
