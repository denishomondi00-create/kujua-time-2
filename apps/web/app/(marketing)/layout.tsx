"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

interface NavItem {
  label: string
  href?: string
  children?: {
    heading?: string
    items: { label: string; href: string; description?: string; icon?: string }[]
  }[]
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Product',
    children: [
      {
        heading: 'Core Features',
        items: [
          { label: 'Scheduling', href: '/features/scheduling', description: 'Availability, booking rules, and slots', icon: '📅' },
          { label: 'Booking Pages', href: '/features/booking-pages', description: 'Branded public booking experiences', icon: '🎨' },
          { label: 'Calendar Sync', href: '/features/calendar-sync', description: 'Google Calendar sync and conflict checks', icon: '🔄' },
          { label: 'Payments', href: '/features/payments', description: 'Stripe and Paystack collection flows', icon: '💳' },
          { label: 'Reminders', href: '/features/reminders', description: 'Confirmations and reminder workflows', icon: '🔔' },
        ],
      },
      {
        heading: 'Operations',
        items: [
          { label: 'Client Management', href: '/features/client-management', description: 'Auto-created client records and notes', icon: '👥' },
          { label: 'Forms', href: '/features/forms', description: 'Intake questions and data capture', icon: '📋' },
          { label: 'Automations', href: '/features/automations', description: 'Template-based follow-up workflows', icon: '⚡' },
          { label: 'Team Scheduling', href: '/features/team-scheduling', description: 'Routing and team availability', icon: '🏢' },
          { label: 'Integrations', href: '/features/integrations', description: 'Calendar, meeting, payment, and webhook support', icon: '🔗' },
        ],
      },
    ],
  },
  {
    label: 'Solutions',
    children: [
      {
        heading: 'By Role',
        items: [
          { label: 'Coaches', href: '/solutions/coaches', description: 'Discovery calls, sessions, and follow-up', icon: '🎯' },
          { label: 'Consultants', href: '/solutions/consultants', description: 'Client onboarding and strategy sessions', icon: '💼' },
          { label: 'Tutors & Trainers', href: '/solutions/tutors', description: 'Classes, repeat sessions, and packs', icon: '📚' },
          { label: 'Therapists', href: '/solutions/therapists', description: 'Recurring sessions and intake workflows', icon: '🌿' },
        ],
      },
      {
        heading: 'By Business',
        items: [
          { label: 'Beauty & Wellness', href: '/solutions/beauty-wellness', description: 'Appointments, reminders, and deposits', icon: '✨' },
          { label: 'Small Business', href: '/solutions/small-business', description: 'A simple operations layer for service teams', icon: '🚀' },
          { label: 'Teams', href: '/solutions/teams', description: 'Multi-staff scheduling and routing', icon: '👫' },
        ],
      },
    ],
  },
  {
    label: 'Industries',
    children: [
      {
        items: [
          { label: 'Education', href: '/industries/education', icon: '🎓' },
          { label: 'Healthcare', href: '/industries/healthcare', icon: '🏥' },
          { label: 'Financial Services', href: '/industries/financial-services', icon: '📊' },
          { label: 'Professional Services', href: '/industries/professional-services', icon: '⚖️' },
          { label: 'Real Estate', href: '/industries/real-estate', icon: '🏡' },
          { label: 'Technology', href: '/industries/technology', icon: '💻' },
        ],
      },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  {
    label: 'Resources',
    children: [
      {
        heading: 'Learn',
        items: [
          { label: 'Resources', href: '/resources', description: 'Guides, education, and help' },
          { label: 'Blog', href: '/resources/blog', description: 'Articles for service businesses' },
          { label: 'Help Center', href: '/resources/help-center', description: 'Documentation and support' },
          { label: 'Product Tour', href: '/product-tour', description: 'A guided look through the product' },
        ],
      },
      {
        heading: 'Company',
        items: [
          { label: 'About', href: '/resources/about', description: 'Our position and product philosophy' },
          { label: 'Customers', href: '/customers', description: 'How service businesses use Kujua Time' },
          { label: 'Developers', href: '/developers', description: 'API, webhooks, and embeds' },
          { label: 'Contact', href: '/resources/contact', description: 'Talk to sales or support' },
        ],
      },
    ],
  },
]

function Navbar() {
  const pathname = usePathname()
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveMenu(null)
  }, [pathname])

  const openMenu = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveMenu(label)
  }

  const scheduleClose = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 120)
  }

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 'var(--z-sticky)',
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.98)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${scrolled ? 'var(--kujua-gray-200)' : 'transparent'}`,
        transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
        boxShadow: scrolled ? 'var(--kujua-shadow-sm)' : 'none',
      }}
    >
      <div
        className="kujua-container"
        style={{
          height: 68,
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
        }}
      >
        <Link
          href="/"
          className="kujua-brand-link kujua-brand-link-compact"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <img
            src="/kujuatime-logo-cropped.png"
            alt="Kujua Time logo"
            width={44}
            height={44}
            style={{ width: 44, height: 44, borderRadius: '12px' }}
          />
          <span className="kujua-wordmark kujua-wordmark-stacked" style={{ fontSize: '1.2rem' }}>
            <span>Kujua</span>
            <span className="kujua-wordmark-accent">Time</span>
          </span>
        </Link>

        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            flex: 1,
          }}
          className="hidden-mobile"
        >
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              style={{ position: 'relative' }}
              onMouseEnter={() => item.children && openMenu(item.label)}
              onMouseLeave={() => item.children && scheduleClose()}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  style={{
                    padding: '8px 14px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: pathname === item.href ? 'var(--kujua-primary-teal)' : 'var(--kujua-gray-800)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                  }}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  style={{
                    padding: '8px 14px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: activeMenu === item.label ? 'var(--kujua-primary-teal)' : 'var(--kujua-gray-800)',
                    background: activeMenu === item.label ? 'var(--kujua-gray-100)' : 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                  }}
                >
                  {item.label}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    style={{
                      transform: activeMenu === item.label ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                    }}
                  >
                    <path d="M2 4l4 4 4-4" />
                  </svg>
                </button>
              )}

              {item.children && activeMenu === item.label ? (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--kujua-white)',
                    border: '1px solid var(--kujua-gray-200)',
                    borderRadius: '16px',
                    boxShadow: 'var(--kujua-shadow-xl)',
                    padding: '20px',
                    display: 'flex',
                    gap: '32px',
                    minWidth: '480px',
                    zIndex: 200,
                  }}
                  onMouseEnter={() => openMenu(item.label)}
                  onMouseLeave={scheduleClose}
                >
                  {item.children.map((col, index) => (
                    <div key={index} style={{ flex: 1, minWidth: 0 }}>
                      {col.heading ? (
                        <p
                          style={{
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: 'var(--kujua-gray-400)',
                            marginBottom: '10px',
                            paddingLeft: '10px',
                          }}
                        >
                          {col.heading}
                        </p>
                      ) : null}
                      {col.items.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px',
                            padding: '9px 10px',
                            borderRadius: '10px',
                            textDecoration: 'none',
                          }}
                        >
                          {sub.icon ? <span style={{ fontSize: '1rem', marginTop: '1px' }}>{sub.icon}</span> : null}
                          <div>
                            <p
                              style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: 'var(--kujua-charcoal)',
                                marginBottom: sub.description ? '2px' : 0,
                              }}
                            >
                              {sub.label}
                            </p>
                            {sub.description ? (
                              <p
                                style={{
                                  fontSize: '0.8125rem',
                                  color: 'var(--kujua-gray-600)',
                                  lineHeight: 1.4,
                                }}
                              >
                                {sub.description}
                              </p>
                            ) : null}
                          </div>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginLeft: 'auto',
            flexShrink: 0,
          }}
          className="hidden-mobile"
        >
          <Link
            href="/login"
            style={{
              padding: '8px 16px',
              fontFamily: 'var(--font-display)',
              fontSize: '0.9rem',
              fontWeight: 500,
              color: 'var(--kujua-gray-800)',
              borderRadius: '9999px',
              textDecoration: 'none',
            }}
          >
            Log in
          </Link>
          <Link href="/signup" className="btn-primary" style={{ padding: '9px 22px', fontSize: '0.875rem' }}>
            Start free
          </Link>
        </div>

        <button
          className="show-mobile"
          onClick={() => setMobileOpen((current) => !current)}
          style={{
            marginLeft: 'auto',
            background: 'none',
            border: 'none',
            padding: '8px',
            borderRadius: '8px',
            cursor: 'pointer',
            color: 'var(--kujua-gray-800)',
          }}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen ? (
        <div
          style={{
            background: 'var(--kujua-white)',
            borderTop: '1px solid var(--kujua-gray-200)',
            padding: '16px 20px 24px',
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              {item.href ? (
                <Link
                  href={item.href}
                  style={{
                    display: 'block',
                    padding: '13px 4px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--kujua-charcoal)',
                    borderBottom: '1px solid var(--kujua-gray-100)',
                    textDecoration: 'none',
                  }}
                >
                  {item.label}
                </Link>
              ) : (
                <>
                  <p
                    style={{
                      padding: '13px 4px 8px',
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--kujua-charcoal)',
                      borderBottom: '1px solid var(--kujua-gray-100)',
                    }}
                  >
                    {item.label}
                  </p>
                  {item.children?.map((col) =>
                    col.items.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 8px',
                          fontSize: '0.9375rem',
                          color: 'var(--kujua-gray-800)',
                          textDecoration: 'none',
                        }}
                      >
                        {sub.icon ? <span>{sub.icon}</span> : null}
                        {sub.label}
                      </Link>
                    ))
                  )}
                </>
              )}
            </div>
          ))}
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <Link href="/login" className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
              Log in
            </Link>
            <Link href="/signup" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
              Start free
            </Link>
          </div>
        </div>
      ) : null}

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  )
}

const FOOTER_LINKS = {
  Product: [
    { label: 'Scheduling', href: '/features/scheduling' },
    { label: 'Booking Pages', href: '/features/booking-pages' },
    { label: 'Calendar Sync', href: '/features/calendar-sync' },
    { label: 'Payments', href: '/features/payments' },
    { label: 'Reminders', href: '/features/reminders' },
    { label: 'Client Management', href: '/features/client-management' },
    { label: 'Automations', href: '/features/automations' },
    { label: 'Team Scheduling', href: '/features/team-scheduling' },
  ],
  Solutions: [
    { label: 'Coaches', href: '/solutions/coaches' },
    { label: 'Consultants', href: '/solutions/consultants' },
    { label: 'Tutors & Trainers', href: '/solutions/tutors' },
    { label: 'Therapists', href: '/solutions/therapists' },
    { label: 'Beauty & Wellness', href: '/solutions/beauty-wellness' },
    { label: 'Teams', href: '/solutions/teams' },
  ],
  Industries: [
    { label: 'Education', href: '/industries/education' },
    { label: 'Healthcare', href: '/industries/healthcare' },
    { label: 'Financial Services', href: '/industries/financial-services' },
    { label: 'Professional Services', href: '/industries/professional-services' },
    { label: 'Real Estate', href: '/industries/real-estate' },
  ],
  Resources: [
    { label: 'Resources', href: '/resources' },
    { label: 'Blog', href: '/resources/blog' },
    { label: 'Help Center', href: '/resources/help-center' },
    { label: 'Developers', href: '/developers' },
    { label: 'Security', href: '/security' },
    { label: "What's New", href: '/resources/whats-new' },
  ],
  Company: [
    { label: 'About', href: '/resources/about' },
    { label: 'Contact', href: '/resources/contact' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Product Tour', href: '/product-tour' },
  ],
}

function Footer() {
  return (
    <footer
      style={{
        background: 'var(--kujua-charcoal)',
        color: 'var(--kujua-gray-400)',
        paddingTop: '72px',
        paddingBottom: '48px',
        marginTop: 'auto',
      }}
    >
      <div className="kujua-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '48px',
            marginBottom: '64px',
          }}
        >
          <div style={{ maxWidth: '280px' }}>
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
                marginBottom: '20px',
              }}
            >
              <img
                src="/kujuatime-logo-cropped.png"
                alt="Kujua Time logo"
                width={34}
                height={34}
                style={{ width: 34, height: 34, borderRadius: '9px' }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.0625rem',
                  fontWeight: 700,
                  color: 'white',
                  letterSpacing: '-0.015em',
                }}
              >
                Kujua Time
              </span>
            </Link>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: '24px', color: 'var(--kujua-gray-400)' }}>
              Book the appointment, collect the payment, create the client record, and run the reminders automatically.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '40px',
            }}
          >
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                    marginBottom: '16px',
                  }}
                >
                  {category}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--kujua-gray-400)',
                        textDecoration: 'none',
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <p style={{ fontSize: '0.875rem', color: 'var(--kujua-gray-400)' }}>
            © {new Date().getFullYear()} Kujua Time. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Service', href: '/terms' },
              { label: 'Cookie Policy', href: '/cookies' },
              { label: 'Security', href: '/security' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--kujua-gray-600)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  )
}
