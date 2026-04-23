/* ─────────────────────────────────────────────────────────────
 * @kujua-time/embed – SDK type contracts
 *
 * These types mirror the public-booking schemas in apps/web
 * and define the host-facing SDK surface.
 * ───────────────────────────────────────────────────────────── */

// ── Display modes ──────────────────────────────────────────

export type EmbedMode = 'modal' | 'inline' | 'floating'

// ── Theme overrides (host → widget) ────────────────────────

export interface EmbedThemeOverrides {
  /** Primary accent colour applied to CTA buttons and highlights */
  accentColor?: string
  /** Softer accent for secondary elements */
  accentSoft?: string
  /** Border radius token, e.g. '1.5rem' or '8px' */
  radius?: string
  /** Font family override for the widget body text */
  fontFamily?: string
}

// ── Init options (public SDK surface) ──────────────────────

export interface KujuaTimeInitOptions {
  /** Embed display mode */
  mode: EmbedMode
  /** CSS selector for the mount target (required for 'inline', optional for 'modal') */
  target?: string
  /** Workspace slug identifying the business, e.g. 'acme-coaching' */
  workspaceSlug: string
  /** Optional path segments after the workspace slug, e.g. 'discovery-call' */
  path?: string
  /** Theme overrides to customise widget appearance */
  theme?: EmbedThemeOverrides
  /** Locale hint, e.g. 'en', 'sw'. Defaults to browser locale. */
  locale?: string

  // ── Callbacks ──────────────────────────────────────────

  /** Fires when a booking is successfully confirmed */
  onBooked?: (payload: BookedPayload) => void
  /** Fires when the modal or floating panel is closed by the user */
  onClosed?: () => void
  /** Fires on unrecoverable errors inside the widget */
  onError?: (error: EmbedError) => void
}

// ── Callback payloads ──────────────────────────────────────

export interface BookedPayload {
  bookingId: string
  publicBookingToken: string
  eventName: string
  startAt: string
  endAt: string
  clientName?: string
  clientEmail?: string
  status: 'confirmed' | 'pending_payment' | 'canceled'
}

export interface EmbedError {
  code: string
  message: string
  details?: unknown
}

// ── Post-message protocol ──────────────────────────────────

export type PostMessageDirection = 'host-to-widget' | 'widget-to-host'

export interface PostMessageEnvelope<T = unknown> {
  /** Namespace guard – always 'kujua-time' */
  ns: 'kujua-time'
  direction: PostMessageDirection
  type: PostMessageType
  payload: T
}

export type PostMessageType =
  | 'init'
  | 'theme-update'
  | 'resize'
  | 'booked'
  | 'closed'
  | 'error'
  | 'ready'
  | 'navigate'

// ── Internal widget state ──────────────────────────────────

export interface WidgetState {
  mode: EmbedMode
  workspaceSlug: string
  path?: string
  theme: ResolvedTheme
  iframeUrl: string
  ready: boolean
}

export interface ResolvedTheme {
  accentColor: string
  accentSoft: string
  radius: string
  fontFamily: string
}

// ── Slot & booking hold mirrors (for post-message payloads) ──

export interface PublicSlot {
  startAt: string
  endAt: string
  label: string
  available: boolean
}

export interface BookingHold {
  id: string
  expiresAt: string
  publicEventId: string
  timezone: string
  startAt: string
  endAt: string
  formCompleted: boolean
  client: {
    fullName?: string
    email?: string
    phone?: string
    notes?: string
  }
}

// ── Destroy handle returned by init ────────────────────────

export interface KujuaTimeInstance {
  /** Remove widget from the DOM and clean up listeners */
  destroy: () => void
  /** Update theme overrides at runtime */
  updateTheme: (overrides: EmbedThemeOverrides) => void
  /** Programmatically open the modal (no-op for inline mode) */
  open: () => void
  /** Programmatically close the modal (no-op for inline mode) */
  close: () => void
}
