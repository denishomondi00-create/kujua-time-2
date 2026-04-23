import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Kujua Time – Scheduling, Payments & Client Management',
  description:
    'Branded appointment scheduling for freelancers, service businesses, practitioners, and growing teams. Book appointments, collect payments, create client records, and automate reminders.',
  alternates: { canonical: 'https://kujuatime.com' },
}

const trustBullets = [
  'Let clients book you in minutes',
  'Sync calendars and avoid double bookings',
  'Collect payments and deposits automatically',
  'Turn bookings into organized client records',
  'Automate reminders and follow-ups',
]

const features = [
  {
    title: 'Branded booking pages',
    description:
      'Create a booking experience with your logo, accent colours, and clean public pages that feel like your business.',
    href: '/features/booking-pages',
  },
  {
    title: 'Payments and deposits',
    description:
      'Collect full payment or deposits during booking with Stripe and Paystack-first support for African service businesses.',
    href: '/features/payments',
  },
  {
    title: 'Client CRM',
    description:
      'Every booking becomes an operational record with client details, booking history, notes, and form responses.',
    href: '/features/client-management',
  },
  {
    title: 'Automated reminders',
    description:
      'Send confirmations, reminder emails, payment receipts, and post-session follow-ups from one workflow layer.',
    href: '/features/reminders',
  },
  {
    title: 'Workflow automation',
    description:
      'Run template-based automations triggered by booking, payment, and form events without wiring separate tools together.',
    href: '/features/automations',
  },
  {
    title: 'Team scheduling',
    description:
      'Support shared ownership, round robin routing, and team-level scheduling operations as you grow.',
    href: '/features/team-scheduling',
  },
]

const industries = [
  { emoji: '🎯', title: 'Coaches', subtitle: 'Discovery calls, coaching sessions, and follow-ups', href: '/solutions/coaches' },
  { emoji: '💆', title: 'Beauty & Wellness', subtitle: 'Appointments, deposits, and reduced no-shows', href: '/solutions/beauty-wellness' },
  { emoji: '📚', title: 'Tutors & Trainers', subtitle: 'Class scheduling, session packs, and intake forms', href: '/solutions/tutors' },
  { emoji: '🌿', title: 'Therapists', subtitle: 'Recurring sessions and client continuity', href: '/solutions/therapists' },
  { emoji: '💼', title: 'Consultants', subtitle: 'Strategy calls, onboarding, and payment collection', href: '/solutions/consultants' },
  { emoji: '🏢', title: 'Growing Teams', subtitle: 'Shared availability, routing, and team workflows', href: '/solutions/teams' },
]

const faq = [
  {
    q: 'Does Kujua Time work with Paystack?',
    a: 'Yes. Paystack is part of the launch product design alongside Stripe support.',
  },
  {
    q: 'Can I accept payment at the time of booking?',
    a: 'Yes. Event types can be configured for full payment, deposit collection, or optional payment depending on the workflow.',
  },
  {
    q: 'Does it sync with Google Calendar?',
    a: 'Yes. The architecture includes Google Calendar integration with conflict detection and busy-time reflection.',
  },
  {
    q: 'Can I embed the booking page on my website?',
    a: 'Yes. Kujua Time includes an embed widget so you can place booking flows directly on your site.',
  },
]

export default function HomePage() {
  return (
    <>
      <section
        className="bg-mesh"
        style={{
          background: 'var(--kujua-gradient-hero)',
          paddingTop: '88px',
          paddingBottom: '96px',
        }}
      >
        <div className="kujua-container">
          <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ marginBottom: '24px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 16px',
                  background: 'rgba(13,78,92,0.08)',
                  border: '1px solid rgba(13,78,92,0.12)',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--kujua-primary-teal)',
                  letterSpacing: '0.04em',
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    background: 'var(--kujua-primary-amber)',
                    borderRadius: '50%',
                  }}
                />
                SCHEDULING FOR SERVICE BUSINESSES
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: 800,
                color: 'var(--kujua-charcoal)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '24px',
              }}
            >
              A better way to <span style={{ color: 'var(--kujua-primary-teal)' }}>schedule</span>, get paid, and <span style={{ color: 'var(--kujua-primary-amber)' }}>manage clients</span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.0625rem, 2vw, 1.25rem)',
                color: 'var(--kujua-gray-600)',
                lineHeight: 1.65,
                marginBottom: '40px',
                maxWidth: '620px',
                marginInline: 'auto',
              }}
            >
              Branded appointment scheduling for freelancers, practitioners, service businesses, and growing teams. One platform that books, charges, and follows up automatically.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
              <Link href="/signup" className="btn-primary" style={{ fontSize: '1rem', padding: '14px 32px' }}>
                Start for free
              </Link>
              <Link href="/product-tour" className="btn-secondary" style={{ fontSize: '1rem', padding: '13px 32px' }}>
                See how it works
              </Link>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 24px', justifyContent: 'center' }}>
              {trustBullets.map((bullet) => (
                <div key={bullet} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--kujua-gray-600)' }}>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="var(--kujua-success)" strokeWidth="2" strokeLinecap="round">
                    <path d="M2 7l4 4 7-7" />
                  </svg>
                  {bullet}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ borderTop: '1px solid var(--kujua-gray-200)', borderBottom: '1px solid var(--kujua-gray-200)', padding: '28px 0', background: 'var(--kujua-white)' }}>
        <div className="kujua-container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px 32px', alignItems: 'center', justifyContent: 'center' }}>
            {[
              'Built for service businesses',
              'Paystack-first payment support',
              'Google Calendar integration',
              'Client CRM created from bookings',
              'Automations powered by events',
            ].map((item) => (
              <span key={item} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--kujua-gray-600)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--kujua-primary-teal)' }} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '96px 0 80px', background: 'var(--kujua-gray-50)' }}>
        <div className="kujua-container">
          <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', marginBottom: '64px' }}>
            <span className="kujua-eyebrow" style={{ marginBottom: '16px', display: 'block' }}>The Problem</span>
            <h2 style={{ marginBottom: '20px' }}>You should not need five tools to run your bookings</h2>
            <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)' }}>
              Most service businesses stitch together a scheduler, a payment link, a spreadsheet, a reminder tool, and a CRM. Kujua Time is designed to replace that stack with one coherent workflow.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {[
              { problem: 'Clients forget appointments', solution: 'Automated confirmations and reminder flows' },
              { problem: 'Payment collection happens too late', solution: 'Collect full payment or deposits at booking' },
              { problem: 'Client information is scattered', solution: 'Create organized client records from every booking' },
              { problem: 'Availability drifts across calendars', solution: 'Sync calendars and detect conflicts early' },
            ].map((item) => (
              <div key={item.problem} style={{ padding: '28px 24px', background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: '16px', boxShadow: 'var(--kujua-shadow-sm)' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--kujua-secondary-rose)', marginBottom: '8px', fontWeight: 500 }}>{item.problem}</p>
                <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--kujua-charcoal)' }}>{item.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '96px 0', background: 'var(--kujua-white)' }}>
        <div className="kujua-container">
          <div className="section-heading" style={{ marginBottom: '64px' }}>
            <span className="kujua-eyebrow" style={{ marginBottom: '16px', display: 'block' }}>Everything you need</span>
            <h2>One system that does five jobs at once</h2>
            <p style={{ marginTop: '16px', fontSize: '1.0625rem' }}>
              Every booking can check availability, collect payment, create or update the client record, and trigger the right communication workflow from one reliable backend path.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {features.map((feature) => (
              <Link key={feature.title} href={feature.href} style={{ textDecoration: 'none' }}>
                <div className="kujua-card" style={{ padding: '28px 28px 24px' }}>
                  <div className="feature-icon" style={{ marginBottom: '20px' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <path d="M8 2v4M16 2v4M3 10h18" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '1.125rem', marginBottom: '10px', color: 'var(--kujua-charcoal)' }}>{feature.title}</h3>
                  <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, marginBottom: '20px' }}>{feature.description}</p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--kujua-primary-teal)' }}>
                    Learn more
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '96px 0', background: 'var(--kujua-gray-50)' }}>
        <div className="kujua-container">
          <div className="section-heading" style={{ marginBottom: '56px' }}>
            <span className="kujua-eyebrow" style={{ marginBottom: '16px', display: 'block' }}>Built for your business</span>
            <h2>Designed for different service workflows</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
            {industries.map((card) => (
              <Link key={card.title} href={card.href} style={{ textDecoration: 'none' }}>
                <div className="kujua-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '2rem', lineHeight: 1 }}>{card.emoji}</span>
                  <div>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--kujua-charcoal)', marginBottom: '3px' }}>{card.title}</p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--kujua-gray-600)', lineHeight: 1.4 }}>{card.subtitle}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/solutions" className="btn-secondary">See all solutions</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '96px 0', background: 'var(--kujua-white)' }}>
        <div className="kujua-container">
          <div className="section-heading" style={{ marginBottom: '56px' }}>
            <span className="kujua-eyebrow" style={{ marginBottom: '16px', display: 'block' }}>Pricing</span>
            <h2>Start free and grow into deeper workflows</h2>
            <p style={{ marginTop: '16px', fontSize: '1.0625rem' }}>
              The launch pricing structure is built around Free, Standard, Pro, and Premium tiers with increasingly advanced scheduling, operations, and team controls.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', maxWidth: '900px', margin: '0 auto' }}>
            {[
              { name: 'Free', description: 'Best for trying Kujua Time.', highlights: ['1 user', '1 event type', '1 connected calendar', 'Unlimited bookings', 'Basic booking page'] },
              { name: 'Standard', description: 'Best for solo professionals and growing service businesses.', highlights: ['Unlimited event types', 'Custom branding', 'Forms and intake', 'Reminder workflows', 'Stripe + Paystack'], recommended: true },
              { name: 'Pro', description: 'Best for practices and advanced service operators.', highlights: ['Group bookings', 'Packages and passes', 'Invoices', 'Round robin', 'Advanced analytics'] },
            ].map((plan) => (
              <div key={plan.name} style={{ padding: '32px 28px', background: plan.recommended ? 'var(--kujua-primary-teal)' : 'var(--kujua-white)', border: `1.5px solid ${plan.recommended ? 'var(--kujua-primary-teal)' : 'var(--kujua-gray-200)'}`, borderRadius: '20px', boxShadow: plan.recommended ? 'var(--kujua-shadow-lg)' : 'var(--kujua-shadow-sm)', position: 'relative' }}>
                {plan.recommended ? <span style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', background: 'var(--kujua-primary-amber)', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '4px 14px', borderRadius: '9999px', whiteSpace: 'nowrap' }}>RECOMMENDED PATH</span> : null}
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.875rem', fontWeight: 700, color: plan.recommended ? 'rgba(255,255,255,0.7)' : 'var(--kujua-gray-600)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{plan.name}</p>
                <p style={{ fontSize: '0.875rem', color: plan.recommended ? 'rgba(255,255,255,0.75)' : 'var(--kujua-gray-600)', marginBottom: '24px' }}>{plan.description}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
                  {plan.highlights.map((highlight) => (
                    <div key={highlight} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: plan.recommended ? 'rgba(255,255,255,0.9)' : 'var(--kujua-gray-800)' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={plan.recommended ? 'rgba(255,255,255,0.7)' : 'var(--kujua-success)'} strokeWidth="2" strokeLinecap="round">
                        <path d="M2 7l4 4 6-6" />
                      </svg>
                      {highlight}
                    </div>
                  ))}
                </div>
                <Link href="/pricing" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px', borderRadius: '9999px', fontFamily: 'var(--font-display)', fontSize: '0.9375rem', fontWeight: 600, textDecoration: 'none', background: plan.recommended ? 'white' : 'var(--kujua-primary-amber)', color: plan.recommended ? 'var(--kujua-primary-teal)' : 'white' }}>
                  Explore plan details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '96px 0', background: 'var(--kujua-gray-50)' }}>
        <div className="kujua-container">
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span className="kujua-eyebrow" style={{ marginBottom: '16px', display: 'block' }}>FAQ</span>
              <h2>Frequently asked questions</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {faq.map((item) => (
                <details key={item.q} style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: '14px', overflow: 'hidden' }}>
                  <summary style={{ padding: '20px 24px', fontFamily: 'var(--font-display)', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--kujua-charcoal)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', listStyle: 'none' }}>
                    {item.q}
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="var(--kujua-gray-400)" strokeWidth="2" strokeLinecap="round">
                      <path d="M4 7l5 5 5-5" />
                    </svg>
                  </summary>
                  <p style={{ padding: '0 24px 20px', fontSize: '0.9375rem', color: 'var(--kujua-gray-600)', lineHeight: 1.7 }}>
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '96px 24px', background: 'var(--kujua-gradient-warm)', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'white', marginBottom: '20px' }}>Start booking in minutes</h2>
          <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, marginBottom: '40px' }}>
            Set up your booking page, connect your calendar, and start running a cleaner service workflow from one system.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 36px', background: 'white', color: 'var(--kujua-primary-teal)', borderRadius: '9999px', fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, textDecoration: 'none' }}>
              Start for free
            </Link>
            <Link href="/pricing" style={{ display: 'inline-flex', alignItems: 'center', padding: '13px 32px', background: 'transparent', color: 'white', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: '9999px', fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, textDecoration: 'none' }}>
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
