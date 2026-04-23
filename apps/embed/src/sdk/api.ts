/* ─────────────────────────────────────────────────────────────
 * @kujua-time/embed – API helpers
 *
 * Builds URLs that point to the public booking pages served
 * by apps/web at /book/[workspaceSlug]/[[...path]].
 *
 * The iframe loads the same Next.js public booking route but
 * with ?embed=true so the server can strip the outer shell
 * and return only the interactive booking client.
 * ───────────────────────────────────────────────────────────── */

import type { EmbedThemeOverrides } from './types'

/**
 * Base URL of the Kujua Time web app that hosts public booking pages.
 * Can be overridden at build time via VITE_KUJUA_APP_URL.
 */
const APP_BASE_URL: string =
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_KUJUA_APP_URL) ||
  'https://app.kujuatime.com'

/**
 * Build the iframe source URL for a public booking page.
 *
 * The resulting URL follows the web app's route structure:
 *   /book/{workspaceSlug}/{path}?embed=true&accent=...
 */
export function buildIframeUrl(
  workspaceSlug: string,
  path?: string,
  theme?: EmbedThemeOverrides,
): string {
  const segments = ['/book', workspaceSlug]
  if (path) {
    segments.push(path)
  }
  const pathname = segments.join('/')

  const params = new URLSearchParams()
  params.set('embed', 'true')

  if (theme?.accentColor) {
    params.set('accent', theme.accentColor.replace('#', ''))
  }
  if (theme?.accentSoft) {
    params.set('accentSoft', theme.accentSoft.replace('#', ''))
  }
  if (theme?.radius) {
    params.set('radius', theme.radius)
  }
  if (theme?.fontFamily) {
    params.set('font', theme.fontFamily)
  }

  return `${APP_BASE_URL}${pathname}?${params.toString()}`
}

/**
 * Build a reschedule URL with token.
 */
export function buildRescheduleUrl(
  workspaceSlug: string,
  path: string | undefined,
  token: string,
): string {
  const base = buildIframeUrl(workspaceSlug, path)
  return `${base}&mode=reschedule&token=${encodeURIComponent(token)}`
}

/**
 * Build a cancellation URL with token.
 */
export function buildCancelUrl(
  workspaceSlug: string,
  path: string | undefined,
  token: string,
): string {
  const base = buildIframeUrl(workspaceSlug, path)
  return `${base}&mode=cancel&token=${encodeURIComponent(token)}`
}

/**
 * Validate that a workspace slug is safe for URL construction.
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(slug)
}

/**
 * Return the expected origin for postMessage security checks.
 */
export function getAppOrigin(): string {
  try {
    return new URL(APP_BASE_URL).origin
  } catch {
    return APP_BASE_URL
  }
}
