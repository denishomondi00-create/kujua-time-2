'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useMemo, useState } from 'react'
import { LoaderCircle, LogOut } from 'lucide-react'

import { useLogoutMutation } from '@/features/auth/mutations'
import { AUTH_REDIRECTS, getAuthErrorMessage } from '@/features/auth/utils'

const navigation = [
  {
    heading: 'Workspace',
    items: [
      { label: 'Home', href: '/app' },
      { label: 'Calendar', href: '/app/calendar' },
      { label: 'Bookings', href: '/app/bookings' },
      { label: 'Clients', href: '/app/clients' },
      { label: 'Event Types', href: '/app/event-types' },
      { label: 'Forms', href: '/app/forms' },
    ],
  },
  {
    heading: 'Operations',
    items: [
      { label: 'Payments', href: '/app/payments' },
      { label: 'Invoices', href: '/app/invoices' },
      { label: 'Automations', href: '/app/automations' },
      { label: 'Team', href: '/app/team' },
      { label: 'Reports', href: '/app/reports' },
      { label: 'Settings', href: '/app/settings' },
    ],
  },
]

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const logoutMutation = useLogoutMutation()

  const currentSection = useMemo(() => {
    for (const group of navigation) {
      for (const item of group.items) {
        if (isActive(pathname, item.href)) return item.label
      }
    }
    return 'Dashboard'
  }, [pathname])

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync()
      router.replace(AUTH_REDIRECTS.logoutFallback)
      router.refresh()
    } catch (error) {
      console.error(getAuthErrorMessage(error))
    }
  }

  return (
    <div
      className="dashboard-shell"
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '280px minmax(0, 1fr)',
        background: 'var(--kujua-gray-100)',
      }}
    >
      <aside
        className="dashboard-sidebar"
        style={{
          background: 'var(--kujua-charcoal)',
          color: 'white',
          padding: '24px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', padding: '6px 8px', borderRadius: 14 }}>
          <div style={{ width: 38, height: 38, borderRadius: 12, background: 'var(--kujua-primary-teal)', display: 'grid', placeItems: 'center', fontWeight: 700 }}>
            KT
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'white' }}>Kujua Time</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--kujua-gray-400)' }}>Service business workspace</div>
          </div>
        </Link>

        <div
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 18,
            padding: '14px 16px',
          }}
        >
          <div style={{ fontSize: '0.78rem', color: 'var(--kujua-gray-400)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
            Current workspace
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'white' }}>Workspace</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--kujua-gray-400)', marginTop: 4 }}>
            Booking, payments, and clients in one operating view.
          </div>
        </div>

        <nav style={{ display: 'grid', gap: 18, marginTop: 4 }}>
          {navigation.map((group) => (
            <div key={group.heading}>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--kujua-gray-400)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 8,
                  padding: '0 10px',
                }}
              >
                {group.heading}
              </div>
              <div style={{ display: 'grid', gap: 4 }}>
                {group.items.map((item) => {
                  const active = isActive(pathname, item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      style={{
                        textDecoration: 'none',
                        color: active ? 'white' : 'var(--kujua-gray-400)',
                        background: active ? 'rgba(13,78,92,0.38)' : 'transparent',
                        border: active ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
                        borderRadius: 12,
                        padding: '11px 12px',
                        fontWeight: 600,
                        fontSize: '0.9375rem',
                        transition: 'background 0.15s, color 0.15s',
                      }}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div
          style={{
            marginTop: 'auto',
            padding: '16px',
            borderRadius: 18,
            background: 'rgba(232,122,62,0.12)',
            border: '1px solid rgba(232,122,62,0.16)',
          }}
        >
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'white', marginBottom: 6 }}>Public booking page</div>
          <p style={{ fontSize: '0.875rem', color: 'var(--kujua-gray-400)', marginBottom: 14 }}>
            Preview how your booking page will look before you publish changes.
          </p>
          <Link href="/app/event-types" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '11px 16px' }}>
            Manage event types
          </Link>
        </div>
      </aside>

      <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            padding: '18px 24px',
            background: 'rgba(244,246,248,0.94)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--kujua-gray-200)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
            <button
              type="button"
              onClick={() => setMobileNavOpen((value) => !value)}
              style={{
                display: 'none',
                width: 42,
                height: 42,
                borderRadius: 12,
                border: '1px solid var(--kujua-gray-200)',
                background: 'var(--kujua-white)',
                color: 'var(--kujua-charcoal)',
              }}
              className="dashboard-mobile-toggle"
              aria-label="Toggle navigation"
            >
              ☰
            </button>
            <div style={{ minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--kujua-gray-600)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Dashboard
              </p>
              <h1 style={{ fontSize: '1.5rem', margin: '4px 0 0' }}>{currentSection}</h1>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <input
              type="search"
              placeholder="Search bookings, clients, invoices..."
              className="kujua-input"
              style={{ width: 'min(340px, 100%)', background: 'var(--kujua-white)' }}
            />
            <Link href="/app/event-types/new" className="btn-primary" style={{ padding: '12px 18px' }}>
              Create event type
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--kujua-gray-200)] bg-[var(--kujua-white)] px-4 py-3 text-sm font-semibold text-[var(--kujua-charcoal)] transition hover:bg-[var(--kujua-gray-100)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {logoutMutation.isPending ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="h-4 w-4" />
              )}
              Log out
            </button>
          </div>
        </header>

        {mobileNavOpen && (
          <div
            style={{
              display: 'none',
              padding: '18px 24px',
              borderBottom: '1px solid var(--kujua-gray-200)',
              background: 'var(--kujua-white)',
            }}
            className="dashboard-mobile-drawer"
          >
            <div style={{ display: 'grid', gap: 18 }}>
              {navigation.map((group) => (
                <div key={group.heading}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--kujua-gray-400)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                    {group.heading}
                  </div>
                  <div style={{ display: 'grid', gap: 6 }}>
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileNavOpen(false)}
                        style={{
                          padding: '10px 12px',
                          borderRadius: 10,
                          textDecoration: 'none',
                          background: isActive(pathname, item.href) ? 'var(--kujua-gray-100)' : 'transparent',
                          color: isActive(pathname, item.href) ? 'var(--kujua-primary-teal)' : 'var(--kujua-gray-800)',
                          fontWeight: 600,
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 12,
                  border: '1px solid var(--kujua-gray-200)',
                  background: 'var(--kujua-white)',
                  color: 'var(--kujua-charcoal)',
                  fontWeight: 600,
                }}
              >
                {logoutMutation.isPending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
                Log out
              </button>
            </div>
          </div>
        )}

        <main style={{ padding: '24px' }}>{children}</main>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .dashboard-shell {
            grid-template-columns: 1fr !important;
          }

          .dashboard-sidebar {
            display: none !important;
          }

          .dashboard-mobile-toggle,
          .dashboard-mobile-drawer {
            display: inline-flex !important;
          }

          .dashboard-mobile-drawer {
            display: block !important;
          }
        }
      `}</style>
    </div>
  )
}
