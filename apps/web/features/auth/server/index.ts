import 'server-only'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { AUTH_REDIRECTS, getAuthSession } from '@/features/auth/utils'

export async function getAuthSessionServer() {
  const cookieStore = await cookies()

  return getAuthSession({
    cookie: cookieStore.toString(),
  })
}

export async function requireAuthenticatedUser(redirectTo = '/login') {
  const session = await getAuthSessionServer()

  if (!session.isAuthenticated || !session.user) {
    redirect(redirectTo)
  }

  return session
}

export async function redirectIfAuthenticated(redirectTo = AUTH_REDIRECTS.guestOnlyDefault) {
  const session = await getAuthSessionServer()

  if (session.isAuthenticated) {
    redirect(redirectTo)
  }

  return session
}
