/* ─────────────────────────────────────────────────────────────
 * @kujua-time/embed – Inline root
 *
 * Manages the lifecycle of the inline embed mode:
 *   resolve target → mount container → create iframe →
 *   listen for messages → auto-resize → destroy
 *
 * The inline mode renders the booking widget directly inside
 * a host element, seamlessly integrated into the page flow.
 * ───────────────────────────────────────────────────────────── */

import type { KujuaTimeInitOptions, KujuaTimeInstance, EmbedThemeOverrides } from '../sdk/types'
import { EmbedEventEmitter } from '../sdk/events'
import { resolveTheme } from '../theme/tokens'
import { createBookingIframe, destroyIframe } from '../shared/iframe'
import { listenToWidget, sendThemeUpdate } from '../shared/post-message'
import { createResizeController } from '../shared/resize'
import { resolveTarget, createContainer, injectGlobalStyle, noop } from '../shared/utils'
import { INLINE_CSS, INLINE_STYLE_ID } from './inline-theme'

export function createInlineRoot(options: KujuaTimeInitOptions): KujuaTimeInstance {
  const emitter = new EmbedEventEmitter()
  const theme = resolveTheme(options.theme)

  let targetEl: HTMLElement
  let container: HTMLDivElement | null = null
  let iframe: HTMLIFrameElement | null = null
  let styleEl: HTMLStyleElement | null = null
  let stopListening: (() => void) | null = null
  let resizeCtrl: ReturnType<typeof createResizeController> | null = null
  let isDestroyed = false

  // ── Wire user callbacks ───────────────────────────────

  if (options.onBooked) emitter.on('booked', options.onBooked)
  if (options.onClosed) emitter.on('closed', options.onClosed)
  if (options.onError) emitter.on('error', options.onError)

  // ── Mount ─────────────────────────────────────────────

  function mount() {
    if (!options.target) {
      throw new Error(
        '[KujuaTime] Inline mode requires a "target" CSS selector, e.g. target: "#booking-root".'
      )
    }

    targetEl = resolveTarget(options.target)

    // Inject global styles (only once)
    if (!document.getElementById(INLINE_STYLE_ID)) {
      styleEl = injectGlobalStyle(INLINE_CSS, INLINE_STYLE_ID)
    }

    // Container
    container = createContainer(
      `kt-inline-${options.workspaceSlug}`,
      'kt-inline-container kt-inline-container--loading',
    )

    // Loading indicator
    const loader = document.createElement('div')
    loader.className = 'kt-inline-loader'
    loader.innerHTML = `
      <div class="kt-inline-spinner"></div>
      <span>Loading booking widget…</span>
    `
    container.appendChild(loader)

    // Create iframe
    iframe = createBookingIframe({
      workspaceSlug: options.workspaceSlug,
      path: options.path,
      theme: options.theme,
      width: '100%',
      initialHeight: '650px',
      className: 'kt-inline-iframe',
    })

    // Hide iframe until loaded
    iframe.style.opacity = '0'
    iframe.style.position = 'absolute'

    container.appendChild(iframe)
    targetEl.appendChild(container)

    // ── Resize controller ───────────────────────────────

    resizeCtrl = createResizeController(iframe)

    // ── Listen for messages ─────────────────────────────

    stopListening = listenToWidget({
      onReady: () => {
        if (!iframe || !container) return

        // Remove loader, show iframe
        const loaderEl = container.querySelector('.kt-inline-loader')
        loaderEl?.remove()
        container.classList.remove('kt-inline-container--loading')

        iframe.style.opacity = '1'
        iframe.style.position = 'static'

        emitter.emit('ready', undefined as never)
      },
      onBooked: (payload) => emitter.emit('booked', payload),
      onClosed: () => emitter.emit('closed', undefined as never),
      onError: (err) => emitter.emit('error', err),
      onResize: (data) => resizeCtrl?.handleResize(data.height),
    })

    // Fallback: show iframe after a timeout even if 'ready' never fires
    setTimeout(() => {
      if (!iframe || iframe.style.opacity === '1') return
      const loaderEl = container?.querySelector('.kt-inline-loader')
      loaderEl?.remove()
      container?.classList.remove('kt-inline-container--loading')
      if (iframe) {
        iframe.style.opacity = '1'
        iframe.style.position = 'static'
      }
    }, 8000)
  }

  // ── Destroy ───────────────────────────────────────────

  function destroy() {
    if (isDestroyed) return
    isDestroyed = true

    stopListening?.()
    resizeCtrl?.destroy()

    if (iframe) {
      destroyIframe(iframe)
      iframe = null
    }

    container?.remove()
    container = null

    // Only remove style if no other inline widgets exist
    if (!document.querySelector('.kt-inline-container')) {
      styleEl?.remove()
      styleEl = null
    }

    emitter.emit('destroyed', undefined as never)
    emitter.removeAll()
  }

  // ── Theme update ──────────────────────────────────────

  function updateTheme(overrides: EmbedThemeOverrides) {
    if (isDestroyed || !iframe) return
    sendThemeUpdate(iframe, overrides)
    emitter.emit('theme-updated', undefined as never)
  }

  // ── Init ──────────────────────────────────────────────

  mount()

  // ── Public interface ──────────────────────────────────

  return {
    destroy,
    updateTheme,
    open: noop,   // inline mode is always visible
    close: noop,  // inline mode cannot be closed
  }
}
