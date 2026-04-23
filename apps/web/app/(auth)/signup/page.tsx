import type { Metadata } from 'next'
import Link from 'next/link'

import { SignupForm } from '@/features/auth/components'
import { redirectIfAuthenticated } from '@/features/auth/server'

export const metadata: Metadata = {
  title: 'Sign up',
  description: 'Create your Kujua Time account and launch your booking page.',
}

export default async function SignupPage() {
  await redirectIfAuthenticated()

  return (
    <div>
      <p className="kujua-eyebrow" style={{ marginBottom: 14 }}>Start free</p>
      <h1 style={{ fontSize: '2rem', marginBottom: 10 }}>Create your account</h1>
      <p style={{ marginBottom: 28 }}>
        Set up your workspace, connect your calendar, and publish your first booking page.
      </p>

      <SignupForm />

      <p style={{ fontSize: '0.9375rem', marginTop: 22 }}>
        Already have an account?{' '}
        <Link href="/login" style={{ color: 'var(--kujua-primary-teal)', fontWeight: 600 }}>
          Log in
        </Link>
      </p>
    </div>
  )
}
