import type { Metadata } from 'next'
import Link from 'next/link'

import { LoginForm } from '@/features/auth/components'
import { redirectIfAuthenticated } from '@/features/auth/server'

export const metadata: Metadata = {
  title: 'Log in',
  description: 'Log in to your Kujua Time workspace.',
}

export default async function LoginPage() {
  await redirectIfAuthenticated()

  return (
    <div>
      <p className="kujua-eyebrow" style={{ marginBottom: 14 }}>Welcome back</p>
      <h1 style={{ fontSize: '2rem', marginBottom: 10 }}>Log in to your workspace</h1>
      <p style={{ marginBottom: 28 }}>
        Access your bookings, clients, payments, and automations from one dashboard.
      </p>

      <LoginForm />

      <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--kujua-gray-200)' }}>
        <p style={{ fontSize: '0.9375rem', marginBottom: 10 }}>New to Kujua Time?</p>
        <Link href="/signup" className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
          Create your account
        </Link>
      </div>
    </div>
  )
}
