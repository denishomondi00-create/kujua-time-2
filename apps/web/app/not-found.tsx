import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
  robots: { index: false, follow: false },
}

const quickLinks = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'Product', href: '/product' },
  { label: 'For Coaches', href: '/solutions/coaches' },
  { label: 'For Teams', href: '/solutions/teams' },
  { label: 'Help Center', href: '/resources/help-center' },
  { label: 'Start Free', href: '/signup' },
]

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: 'var(--kujua-gray-50)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <Link
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '48px',
          textDecoration: 'none',
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            background: 'var(--kujua-primary-teal)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M9 2C5.13 2 2 5.13 2 9s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm0 2.5c.83 0 1.5.67 1.5 1.5S9.83 7.5 9 7.5 7.5 6.83 7.5 6 8.17 4.5 9 4.5zm0 9c-1.75 0-3.29-.9-4.19-2.26.02-1.39 2.8-2.15 4.19-2.15 1.38 0 4.17.76 4.19 2.15C12.29 12.6 10.75 13.5 9 13.5z"
              fill="white"
            />
          </svg>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.125rem',
            fontWeight: 700,
            color: 'var(--kujua-charcoal)',
            letterSpacing: '-0.01em',
          }}
        >
          Kujua Time
        </span>
      </Link>

      <div style={{ maxWidth: '480px', width: '100%', textAlign: 'center' }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '8rem',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: 'var(--kujua-gray-200)',
            marginBottom: '8px',
            userSelect: 'none',
          }}
        >
          404
        </div>

        <div
          style={{
            width: 64,
            height: 3,
            background: 'var(--kujua-primary-amber)',
            borderRadius: '2px',
            margin: '0 auto 32px',
          }}
        />

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'var(--kujua-charcoal)',
            letterSpacing: '-0.02em',
            marginBottom: '16px',
          }}
        >
          Page not found
        </h1>

        <p
          style={{
            fontSize: '1rem',
            color: 'var(--kujua-gray-600)',
            lineHeight: 1.7,
            marginBottom: '40px',
          }}
        >
          The page you are looking for has moved, been removed, or never existed.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '48px',
          }}
        >
          <Link href="/" className="btn-primary">Back to homepage</Link>
          <Link href="/resources/help-center" className="btn-secondary">Help center</Link>
        </div>

        <div
          style={{
            padding: '24px',
            background: 'var(--kujua-white)',
            border: '1px solid var(--kujua-gray-200)',
            borderRadius: '16px',
            textAlign: 'left',
          }}
        >
          <p
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--kujua-gray-600)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '16px',
            }}
          >
            Popular pages
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
            }}
          >
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  fontSize: '0.875rem',
                  color: 'var(--kujua-gray-800)',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  background: 'var(--kujua-gray-50)',
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 2l5 5-5 5" />
                </svg>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
