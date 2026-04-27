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
      {/* Desktop sidebar */}
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
          overflowY: 'auto',
        }}
      >
        <Link href="/" className="kujua-brand-link kujua-brand-link-compact" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', padding: '6px 8px', borderRadius: 14 }}>
          <img
            src="/kujuatime-logo-cropped.png"
            alt="Kujua Time logo"
            width={52}
            height={52}
            style={{ width: 52, height: 52, borderRadius: 14, flexShrink: 0 }}
          />
          <div style={{ minWidth: 0 }}>
            <div className="kujua-wordmark kujua-wordmark-light kujua-wordmark-stacked" style={{ fontSize: '1.14rem' }}>
              <span>Kujua</span>
              <span className="kujua-wordmark-accent">Time</span>
            </div>
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

      {/* Main content column */}
      <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <header
          className="dashboard-header"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            padding: '16px 24px',
            background: 'rgba(244,246,248,0.96)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--kujua-gray-200)',
          }}
        >
          {/* Left: hamburger + title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1 }}>
            <button
              type="button"
              onClick={() => setMobileNavOpen((v) => !v)}
              style={{
                display: 'none',
                flexShrink: 0,
                width: 40,
                height: 40,
                borderRadius: 10,
                border: '1px solid var(--kujua-gray-200)',
                background: 'var(--kujua-white)',
                color: 'var(--kujua-charcoal)',
                cursor: 'pointer',
                fontSize: '1.1rem',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="dashboard-mobile-toggle"
              aria-label="Toggle navigation"
            >
              {mobileNavOpen ? '✕' : '☰'}
            </button>
            <div style={{ minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--kujua-gray-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Dashboard
              </p>
              <h1
                className="dashboard-header-title"
                style={{ fontSize: '1.4rem', margin: '2px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                {currentSection}
              </h1>
            </div>
          </div>

          {/* Right: search + actions */}
          <div className="dashboard-header-actions" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <input
              type="search"
              placeholder="Search…"
              className="kujua-input dashboard-header-search"
              style={{ width: 'clamp(160px, 22vw, 320px)', background: 'var(--kujua-white)' }}
            />
            <Link
              href="/app/event-types/new"
              className="btn-primary dashboard-create-btn"
              style={{ padding: '11px 16px', whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              <span className="dashboard-create-btn-text">New event type</span>
              <span className="dashboard-create-btn-icon" style={{ display: 'none', fontSize: '1.2rem', lineHeight: 1 }}>＋</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '10px 14px',
                borderRadius: 9999,
                border: '1px solid var(--kujua-gray-200)',
                background: 'var(--kujua-white)',
                color: 'var(--kujua-charcoal)',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                flexShrink: 0,
                opacity: logoutMutation.isPending ? 0.6 : 1,
              }}
            >
              {logoutMutation.isPending ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="h-4 w-4" />
              )}
              <span className="dashboard-logout-text">Log out</span>
            </button>
          </div>
        </header>

        {/* Mobile nav drawer — only in DOM when open, CSS shows/hides per breakpoint */}
        {mobileNavOpen && (
          <div
            className="dashboard-mobile-drawer"
            style={{
              display: 'none',
              borderBottom: '1px solid var(--kujua-gray-200)',
              background: 'var(--kujua-white)',
              overflowY: 'auto',
              maxHeight: 'calc(100vh - 64px)',
            }}
          >
            <div style={{ padding: '16px 20px', display: 'grid', gap: 16 }}>
              {navigation.map((group) => (
                <div key={group.heading}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--kujua-gray-400)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                    {group.heading}
                  </div>
                  <div style={{ display: 'grid', gap: 4 }}>
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileNavOpen(false)}
                        style={{
                          padding: '11px 14px',
                          borderRadius: 10,
                          textDecoration: 'none',
                          background: isActive(pathname, item.href) ? 'var(--kujua-gray-100)' : 'transparent',
                          color: isActive(pathname, item.href) ? 'var(--kujua-primary-teal)' : 'var(--kujua-gray-800)',
                          fontWeight: 600,
                          fontSize: '0.9375rem',
                          borderLeft: isActive(pathname, item.href) ? '3px solid var(--kujua-primary-teal)' : '3px solid transparent',
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
                  cursor: 'pointer',
                }}
              >
                {logoutMutation.isPending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
                Log out
              </button>
            </div>
          </div>
        )}

        <main className="dashboard-main" style={{ padding: '24px' }}>{children}</main>
      </div>

      <style>{`
        /* ── Tablet: hide sidebar, show hamburger ── */
        @media (max-width: 1024px) {
          .dashboard-shell {
            grid-template-columns: 1fr !important;
          }
          .dashboard-sidebar {
            display: none !important;
          }
          .dashboard-mobile-toggle {
            display: inline-flex !important;
          }
          .dashboard-mobile-drawer {
            display: block !important;
          }
        }

        /* ── Small tablet / large phone ── */
        @media (max-width: 768px) {
          .dashboard-header {
            padding: 12px 16px !important;
          }
          .dashboard-header-search {
            display: none !important;
          }
          .dashboard-main {
            padding: 16px !important;
          }
        }

        /* ── Phone ── */
        @media (max-width: 480px) {
          .dashboard-header {
            padding: 10px 12px !important;
            gap: 8px !important;
          }
          .dashboard-header-title {
            font-size: 1.15rem !important;
          }
          .dashboard-create-btn-text {
            display: none !important;
          }
          .dashboard-create-btn-icon {
            display: inline !important;
          }
          .dashboard-logout-text {
            display: none !important;
          }
          .dashboard-create-btn {
            padding: 10px 12px !important;
          }
          .dashboard-main {
            padding: 12px !important;
          }
        }
      `}</style>
    </div>
  )
}
