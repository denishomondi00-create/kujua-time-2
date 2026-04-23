import type { Metadata } from 'next'
import Link from 'next/link'

import { ForgotPasswordForm } from '@/features/auth/components'
import { redirectIfAuthenticated } from '@/features/auth/server'

export const metadata: Metadata = {
  title: 'Forgot password',
  description: 'Request a password reset link for your Kujua Time account.',
}

export default async function ForgotPasswordPage() {
  await redirectIfAuthenticated()

  return (
    <div>
      <p className="kujua-eyebrow" style={{ marginBottom: 14 }}>Password recovery</p>
      <h1 style={{ fontSize: '2rem', marginBottom: 10 }}>Reset your password</h1>
      <p style={{ marginBottom: 28 }}>
        Enter your account email and we will send you a secure password reset link.
      </p>

      <ForgotPasswordForm />

      <p style={{ marginTop: 22, fontSize: '0.9375rem' }}>
        Remembered your password?{' '}
        <Link href="/login" style={{ color: 'var(--kujua-primary-teal)', fontWeight: 600 }}>
          Log in
        </Link>
      </p>
    </div>
  )
}
