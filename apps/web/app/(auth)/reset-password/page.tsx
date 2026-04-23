import type { Metadata } from 'next'
import Link from 'next/link'

import { ResetPasswordForm } from '@/features/auth/components'
import { redirectIfAuthenticated } from '@/features/auth/server'

export const metadata: Metadata = {
  title: 'Reset password',
  description: 'Create a new password for your Kujua Time account.',
}

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams?: Promise<{ token?: string }>
}) {
  await redirectIfAuthenticated()
  const resolvedSearchParams = await searchParams
  const token = resolvedSearchParams?.token ?? ''

  return (
    <div>
      <p className="kujua-eyebrow" style={{ marginBottom: 14 }}>Create a new password</p>
      <h1 style={{ fontSize: '2rem', marginBottom: 10 }}>Choose a secure password</h1>
      <p style={{ marginBottom: 28 }}>
        Use a strong password you haven’t used elsewhere to keep your workspace secure.
      </p>

      <ResetPasswordForm token={token} />

      <p style={{ marginTop: 22, fontSize: '0.9375rem' }}>
        Need to return to login?{' '}
        <Link href="/login" style={{ color: 'var(--kujua-primary-teal)', fontWeight: 600 }}>
          Go back
        </Link>
      </p>
    </div>
  )
}
