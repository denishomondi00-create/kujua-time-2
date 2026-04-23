'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { AUTH_QUERY_KEYS, forgotPassword, login, logout, resetPassword, signup, verifyEmail } from '@/features/auth/utils'

export function useLoginMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: login,
    onSuccess: (session) => {
      queryClient.setQueryData(AUTH_QUERY_KEYS.session, session)
    },
  })
}

export function useSignupMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signup,
    onSuccess: (session) => {
      queryClient.setQueryData(AUTH_QUERY_KEYS.session, session)
    },
  })
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: forgotPassword,
  })
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: resetPassword,
  })
}

export function useVerifyEmailMutation() {
  return useMutation({
    mutationFn: verifyEmail,
  })
}

export function useLogoutMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(AUTH_QUERY_KEYS.session, {
        isAuthenticated: false,
        user: null,
        workspace: null,
      })
      queryClient.removeQueries({ queryKey: AUTH_QUERY_KEYS.session })
    },
  })
}
