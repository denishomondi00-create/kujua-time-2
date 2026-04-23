import type { Metadata } from 'next'
import Link from 'next/link'

import { VerifyEmailPanel } from '@/features/auth/components'

export const metadata: Metadata = {
  title: 'Verify email',
  description: 'Verify your email address to continue to Kujua Time.',
}

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams?: Promise<{ token?: string }>
}) {
  const resolvedSearchParams = await searchParams
  const token = resolvedSearchParams?.token ?? ''

  return (
    <div>
      <p className="kujua-eyebrow" style={{ marginBottom: 14 }}>Email verification</p>
      <h1 style={{ fontSize: '2rem', marginBottom: 10 }}>Check your inbox</h1>
      <p style={{ marginBottom: 24 }}>
        Verify your email address to activate your workspace, connect calendars, and start accepting bookings.
      </p>

      {token ? <VerifyEmailPanel token={token} /> : (
        <div style={{ display: 'grid', gap: 12 }}>
          <div
            style={{
              padding: 20,
              borderRadius: 18,
              background: 'var(--kujua-gray-50)',
              border: '1px solid var(--kujua-gray-200)',
            }}
          >
            <p style={{ margin: 0, color: 'var(--kujua-gray-800)' }}>
              Open the verification link from your inbox, or paste the token into the URL if you are verifying manually.
            </p>
          </div>
          <Link href="/login" className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
            Return to login
          </Link>
        </div>
      )}
    </div>
  )
}
