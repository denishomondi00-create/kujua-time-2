'use client'

import type { ReactNode } from 'react'

import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
  verifyEmailSchema,
  type ForgotPasswordInput,
  type LoginInput,
  type ResetPasswordInput,
  type SignupInput,
  type VerifyEmailInput,
} from '@/features/auth/schemas'
import {
  getAuthErrorMessage,
  AUTH_REDIRECTS,
} from '@/features/auth/utils'
import {
  useForgotPasswordMutation,
  useLoginMutation,
  useResetPasswordMutation,
  useSignupMutation,
  useVerifyEmailMutation,
} from '@/features/auth/mutations'

type FieldProps = {
  label: string
  error?: string
  htmlFor: string
  children: ReactNode
  hint?: string
}

function Field({ label, error, htmlFor, children, hint }: FieldProps) {
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <label htmlFor={htmlFor} style={{ fontWeight: 600, color: 'var(--kujua-charcoal)' }}>
        {label}
      </label>
      {children}
      {hint ? <p style={{ margin: 0, fontSize: '0.875rem' }}>{hint}</p> : null}
      {error ? <p style={{ margin: 0, color: 'var(--kujua-error)', fontSize: '0.875rem' }}>{error}</p> : null}
    </div>
  )
}

function SubmitButton({ children, isLoading }: { children: ReactNode; isLoading?: boolean }) {
  return (
    <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', opacity: isLoading ? 0.75 : 1 }} disabled={isLoading}>
      {isLoading ? 'Please wait…' : children}
    </button>
  )
}

function InlineMessage({ tone = 'info', children }: { tone?: 'info' | 'success' | 'error'; children: ReactNode }) {
  const palette = useMemo(() => {
    if (tone === 'success') {
      return { background: 'var(--kujua-success-bg)', border: 'var(--kujua-success)', color: 'var(--kujua-success)' }
    }
    if (tone === 'error') {
      return { background: 'var(--kujua-error-bg)', border: 'var(--kujua-error)', color: 'var(--kujua-error)' }
    }
    return { background: 'var(--kujua-info-bg)', border: 'var(--kujua-info)', color: 'var(--kujua-info)' }
  }, [tone])

  return (
    <div
      style={{
        padding: '12px 14px',
        borderRadius: 14,
        background: palette.background,
        border: `1px solid ${palette.border}`,
        color: palette.color,
        fontSize: '0.9375rem',
      }}
    >
      {children}
    </div>
  )
}

export function LoginForm({ onSuccessRedirect = AUTH_REDIRECTS.afterLogin }: { onSuccessRedirect?: string }) {
  const mutation = useLoginMutation()
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: false },
  })

  const errorMessage = mutation.isError ? getAuthErrorMessage(mutation.error) : null

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values)
    window.location.assign(onSuccessRedirect)
  })

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 18 }}>
      {errorMessage ? <InlineMessage tone="error">{errorMessage}</InlineMessage> : null}

      <Field label="Work email" htmlFor="login-email" error={form.formState.errors.email?.message}>
        <input id="login-email" className="kujua-input" type="email" autoComplete="email" {...form.register('email')} />
      </Field>

      <Field label="Password" htmlFor="login-password" error={form.formState.errors.password?.message}>
        <input id="login-password" className="kujua-input" type="password" autoComplete="current-password" {...form.register('password')} />
      </Field>

      <label style={{ display: 'inline-flex', gap: 10, alignItems: 'center', fontSize: '0.9375rem' }}>
        <input type="checkbox" {...form.register('remember')} />
        Keep me signed in on this device
      </label>

      <SubmitButton isLoading={mutation.isPending}>Log in</SubmitButton>
    </form>
  )
}

export function SignupForm({ onSuccessRedirect = AUTH_REDIRECTS.afterSignup }: { onSuccessRedirect?: string }) {
  const mutation = useSignupMutation()
  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      businessName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values)
    window.location.assign(onSuccessRedirect)
  })

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 18 }}>
      {mutation.isError ? <InlineMessage tone="error">{getAuthErrorMessage(mutation.error)}</InlineMessage> : null}

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
        <Field label="First name" htmlFor="signup-first-name" error={form.formState.errors.firstName?.message}>
          <input id="signup-first-name" className="kujua-input" autoComplete="given-name" {...form.register('firstName')} />
        </Field>
        <Field label="Last name" htmlFor="signup-last-name" error={form.formState.errors.lastName?.message}>
          <input id="signup-last-name" className="kujua-input" autoComplete="family-name" {...form.register('lastName')} />
        </Field>
      </div>

      <Field label="Business name" htmlFor="signup-business-name" error={form.formState.errors.businessName?.message}>
        <input id="signup-business-name" className="kujua-input" autoComplete="organization" {...form.register('businessName')} />
      </Field>

      <Field label="Work email" htmlFor="signup-email" error={form.formState.errors.email?.message}>
        <input id="signup-email" className="kujua-input" type="email" autoComplete="email" {...form.register('email')} />
      </Field>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
        <Field label="Password" htmlFor="signup-password" error={form.formState.errors.password?.message}>
          <input id="signup-password" className="kujua-input" type="password" autoComplete="new-password" {...form.register('password')} />
        </Field>
        <Field label="Confirm password" htmlFor="signup-confirm-password" error={form.formState.errors.confirmPassword?.message}>
          <input id="signup-confirm-password" className="kujua-input" type="password" autoComplete="new-password" {...form.register('confirmPassword')} />
        </Field>
      </div>

      <SubmitButton isLoading={mutation.isPending}>Create account</SubmitButton>
    </form>
  )
}

export function ForgotPasswordForm() {
  const mutation = useForgotPasswordMutation()
  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values)
  })

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 18 }}>
      {mutation.isSuccess ? <InlineMessage tone="success">{mutation.data.message}</InlineMessage> : null}
      {mutation.isError ? <InlineMessage tone="error">{getAuthErrorMessage(mutation.error)}</InlineMessage> : null}

      <Field label="Work email" htmlFor="forgot-password-email" error={form.formState.errors.email?.message}>
        <input id="forgot-password-email" className="kujua-input" type="email" autoComplete="email" {...form.register('email')} />
      </Field>

      <SubmitButton isLoading={mutation.isPending}>Send reset link</SubmitButton>
    </form>
  )
}

export function ResetPasswordForm({ token }: { token: string }) {
  const mutation = useResetPasswordMutation()
  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token, password: '', confirmPassword: '' },
  })

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values)
    window.location.assign('/login')
  })

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 18 }}>
      {mutation.isSuccess ? <InlineMessage tone="success">{mutation.data.message}</InlineMessage> : null}
      {mutation.isError ? <InlineMessage tone="error">{getAuthErrorMessage(mutation.error)}</InlineMessage> : null}

      <Field label="New password" htmlFor="reset-password" error={form.formState.errors.password?.message}>
        <input id="reset-password" className="kujua-input" type="password" autoComplete="new-password" {...form.register('password')} />
      </Field>

      <Field label="Confirm new password" htmlFor="reset-password-confirm" error={form.formState.errors.confirmPassword?.message}>
        <input id="reset-password-confirm" className="kujua-input" type="password" autoComplete="new-password" {...form.register('confirmPassword')} />
      </Field>

      <SubmitButton isLoading={mutation.isPending}>Update password</SubmitButton>
    </form>
  )
}

export function VerifyEmailPanel({ token }: { token: string }) {
  const mutation = useVerifyEmailMutation()
  const form = useForm<VerifyEmailInput>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { token },
  })

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values)
  })

  return (
    <div style={{ display: 'grid', gap: 18 }}>
      <InlineMessage>
        Confirm your email address to activate booking pages, connect calendars, and start taking payments.
      </InlineMessage>

      {mutation.isSuccess ? <InlineMessage tone="success">{mutation.data.message}</InlineMessage> : null}
      {mutation.isError ? <InlineMessage tone="error">{getAuthErrorMessage(mutation.error)}</InlineMessage> : null}

      <form onSubmit={handleSubmit}>
        <SubmitButton isLoading={mutation.isPending}>Verify email</SubmitButton>
      </form>
    </div>
  )
}
