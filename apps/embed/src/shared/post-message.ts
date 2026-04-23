/* ─────────────────────────────────────────────────────────────
 * @kujua-time/embed – PostMessage protocol
 *
 * Typed, namespaced cross-origin messaging between the host
 * page and the booking iframe. Every message is wrapped in a
 * PostMessageEnvelope with ns:'kujua-time' so we can safely
 * ignore unrelated messages on the window.
 * ───────────────────────────────────────────────────────────── */

import type {
  PostMessageEnvelope,
  PostMessageType,
  PostMessageDirection,
  BookedPayload,
  EmbedError,
  EmbedThemeOverrides,
} from '../sdk/types'
import { POST_MESSAGE_NS } from '../sdk/version'
import { getAppOrigin } from '../sdk/api'

// ── Outbound (host → iframe) ───────────────────────────────

/**
 * Send a typed message from the host page into the iframe.
 */
export function sendToWidget(
  iframe: HTMLIFrameElement,
  type: PostMessageType,
  payload: unknown = {},
): void {
  const targetOrigin = getAppOrigin()
  const envelope: PostMessageEnvelope = {
    ns: POST_MESSAGE_NS,
    direction: 'host-to-widget',
    type,
    payload,
  }

  iframe.contentWindow?.postMessage(envelope, targetOrigin)
}

/**
 * Send an init message with resolved config into the iframe.
 */
export function sendInitMessage(
  iframe: HTMLIFrameElement,
  config: {
    workspaceSlug: string
    path?: string
    theme?: EmbedThemeOverrides
    locale?: string
  },
): void {
  sendToWidget(iframe, 'init', config)
}

/**
 * Send updated theme overrides into the iframe.
 */
export function sendThemeUpdate(
  iframe: HTMLIFrameElement,
  theme: EmbedThemeOverrides,
): void {
  sendToWidget(iframe, 'theme-update', theme)
}

// ── Inbound (iframe → host) ────────────────────────────────

export type MessageHandler = {
  onReady?: () => void
  onBooked?: (payload: BookedPayload) => void
  onClosed?: () => void
  onError?: (error: EmbedError) => void
  onResize?: (payload: { height: number }) => void
}

/**
 * Start listening for messages from the booking iframe.
 * Returns a cleanup function to remove the listener.
 */
export function listenToWidget(handlers: MessageHandler): () => void {
  const expectedOrigin = getAppOrigin()

  function handleMessage(event: MessageEvent) {
    // Security: only accept messages from our app origin
    if (event.origin !== expectedOrigin) return

    const data = event.data as PostMessageEnvelope | undefined
    if (!data || data.ns !== POST_MESSAGE_NS) return
    if (data.direction !== 'widget-to-host') return

    switch (data.type) {
      case 'ready':
        handlers.onReady?.()
        break
      case 'booked':
        handlers.onBooked?.(data.payload as BookedPayload)
        break
      case 'closed':
        handlers.onClosed?.()
        break
      case 'error':
        handlers.onError?.(data.payload as EmbedError)
        break
      case 'resize':
        handlers.onResize?.(data.payload as { height: number })
        break
    }
  }

  window.addEventListener('message', handleMessage)
  return () => window.removeEventListener('message', handleMessage)
}

// ── Utilities ──────────────────────────────────────────────

/**
 * Type guard to check if a MessageEvent contains a valid
 * Kujua Time envelope.
 */
export function isKujuaMessage(event: MessageEvent): boolean {
  const data = event.data
  return (
    data &&
    typeof data === 'object' &&
    data.ns === POST_MESSAGE_NS
  )
}
