import {
  authSessionSchema,
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
  verifyEmailSchema,
  type AuthSession,
  type ForgotPasswordInput,
  type LoginInput,
  type ResetPasswordInput,
  type SignupInput,
  type VerifyEmailInput,
} from '@/features/auth/schemas'

export const AUTH_REDIRECTS = {
  afterLogin: '/app',
  afterSignup: '/app',
  guestOnlyDefault: '/app',
  logoutFallback: '/login',
} as const

export const AUTH_QUERY_KEYS = {
  session: ['auth', 'session'] as const,
} as const

export class AuthApiError extends Error {
  readonly status: number
  readonly code?: string

  constructor(message: string, status: number, code?: string) {
    super(message)
    this.name = 'AuthApiError'
    this.status = status
    this.code = code
  }
}

type RequestOptions = RequestInit & {
  token?: string
  headers?: HeadersInit
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ''

function buildUrl(path: string) {
  if (!API_BASE_URL) return path
  return new URL(path, API_BASE_URL).toString()
}

async function requestJson<T>(path: string, init: RequestOptions = {}, parse?: (value: unknown) => T): Promise<T> {
  const headers = new Headers(init.headers)

  if (!headers.has('content-type') && init.body) {
    headers.set('content-type', 'application/json')
  }

  const response = await fetch(buildUrl(path), {
    ...init,
    headers,
    credentials: 'include',
  })

  const isJson = response.headers.get('content-type')?.includes('application/json')
  const payload = isJson ? await response.json() : null

  if (!response.ok) {
    const message =
      typeof payload?.message === 'string'
        ? payload.message
        : 'The request could not be completed.'
    const code = typeof payload?.code === 'string' ? payload.code : undefined
    throw new AuthApiError(message, response.status, code)
  }

  return parse ? parse(payload) : (payload as T)
}

export function getAuthErrorMessage(error: unknown) {
  if (error instanceof AuthApiError) return error.message
  if (error instanceof Error) return error.message
  return 'Something went wrong. Please try again.'
}

export async function getAuthSession(headers?: HeadersInit) {
  return requestJson<AuthSession>('/v1/auth/session', { method: 'GET', headers }, authSessionSchema.parse)
}

export async function login(payload: LoginInput) {
  const body = loginSchema.parse(payload)
  return requestJson<AuthSession>('/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(body),
  }, authSessionSchema.parse)
}

export async function signup(payload: SignupInput) {
  const body = signupSchema.parse(payload)
  return requestJson<AuthSession>('/v1/auth/signup', {
    method: 'POST',
    body: JSON.stringify(body),
  }, authSessionSchema.parse)
}

export async function forgotPassword(payload: ForgotPasswordInput) {
  const body = forgotPasswordSchema.parse(payload)
  return requestJson<{ success: true; message: string }>('/v1/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export async function resetPassword(payload: ResetPasswordInput) {
  const body = resetPasswordSchema.parse(payload)
  return requestJson<{ success: true; message: string }>('/v1/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export async function verifyEmail(payload: VerifyEmailInput) {
  const body = verifyEmailSchema.parse(payload)
  return requestJson<{ success: true; message: string }>('/v1/auth/verify-email', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export async function logout() {
  return requestJson<{ success: true }>('/v1/auth/logout', {
    method: 'POST',
  })
}
