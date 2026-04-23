/* ─────────────────────────────────────────────────────────────
 * @kujua-time/embed – Iframe factory
 *
 * Creates and configures the booking iframe with proper
 * sandbox, allow, and styling attributes. The iframe loads
 * the public booking page from apps/web with ?embed=true
 * so the server can render a stripped-down booking shell.
 * ───────────────────────────────────────────────────────────── */

import { buildIframeUrl } from '../sdk/api'
import type { EmbedThemeOverrides } from '../sdk/types'

export interface CreateIframeOptions {
  workspaceSlug: string
  path?: string
  theme?: EmbedThemeOverrides
  /** Fixed width or '100%' for inline. Default '100%'. */
  width?: string
  /** Initial height before auto-resize kicks in. Default '650px'. */
  initialHeight?: string
  /** Extra CSS class names to add to the iframe element */
  className?: string
  /** Tab index for accessibility */
  tabIndex?: number
}

const IFRAME_SANDBOX = [
  'allow-scripts',
  'allow-same-origin',
  'allow-forms',
  'allow-popups',           // for Stripe/Paystack redirects
  'allow-popups-to-escape-sandbox',
].join(' ')

const IFRAME_ALLOW = [
  'payment',                // Payment Request API for Stripe/Paystack
  'clipboard-write',
].join('; ')

/**
 * Create a booking iframe element ready for DOM insertion.
 * Does NOT append it – the caller decides where it goes.
 */
export function createBookingIframe(options: CreateIframeOptions): HTMLIFrameElement {
  const iframe = document.createElement('iframe')

  const src = buildIframeUrl(options.workspaceSlug, options.path, options.theme)
  iframe.src = src

  // Security
  iframe.setAttribute('sandbox', IFRAME_SANDBOX)
  iframe.setAttribute('allow', IFRAME_ALLOW)

  // Presentation
  iframe.style.width = options.width ?? '100%'
  iframe.style.height = options.initialHeight ?? '650px'
  iframe.style.border = 'none'
  iframe.style.display = 'block'
  iframe.style.overflow = 'hidden'
  iframe.style.colorScheme = 'light'
  iframe.style.borderRadius = 'inherit'

  // Accessibility
  iframe.title = 'Kujua Time – Book an appointment'
  iframe.setAttribute('role', 'document')
  iframe.setAttribute('aria-label', 'Booking widget')
  if (typeof options.tabIndex === 'number') {
    iframe.tabIndex = options.tabIndex
  }

  // Loading optimisation
  iframe.loading = 'lazy'

  // Identification
  iframe.setAttribute('data-kujua-embed', 'true')
  iframe.id = `kt-embed-${options.workspaceSlug}`

  if (options.className) {
    iframe.className = options.className
  }

  return iframe
}

/**
 * Update the iframe src to reflect new theme overrides without
 * a full reload – uses postMessage instead when the iframe is
 * already loaded.
 */
export function updateIframeSrc(
  iframe: HTMLIFrameElement,
  workspaceSlug: string,
  path?: string,
  theme?: EmbedThemeOverrides,
): void {
  const newSrc = buildIframeUrl(workspaceSlug, path, theme)
  if (iframe.src !== newSrc) {
    iframe.src = newSrc
  }
}

/**
 * Safely remove an iframe from the DOM and clean up.
 */
export function destroyIframe(iframe: HTMLIFrameElement): void {
  iframe.src = 'about:blank'
  iframe.remove()
}
