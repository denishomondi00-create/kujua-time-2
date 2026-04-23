/* ─────────────────────────────────────────────────────────────
 * @kujua-time/embed – Modal root
 *
 * Manages the full lifecycle of the modal embed:
 *   mount → open → listen → close → destroy
 *
 * Handles focus trapping, body scroll locking, Escape key,
 * backdrop clicks, and cross-origin postMessage events.
 * ───────────────────────────────────────────────────────────── */

import type { KujuaTimeInitOptions, KujuaTimeInstance, EmbedThemeOverrides } from '../sdk/types'
import { EmbedEventEmitter } from '../sdk/events'
import { resolveTheme } from '../theme/tokens'
import { listenToWidget, sendThemeUpdate } from '../shared/post-message'
import { createResizeController } from '../shared/resize'
import { lockBodyScroll, trapFocus, injectGlobalStyle } from '../shared/utils'
import { destroyIframe } from '../shared/iframe'
import {
  buildModalFrame,
  showModalFrame,
  hideModalFrame,
  type ModalFrameElements,
} from './modal-frame'
import { MODAL_CSS, MODAL_STYLE_ID } from './modal-theme'

export function createModalRoot(options: KujuaTimeInitOptions): KujuaTimeInstance {
  const emitter = new EmbedEventEmitter()
  const theme = resolveTheme(options.theme)

  let elements: ModalFrameElements | null = null
  let styleEl: HTMLStyleElement | null = null
  let unlockScroll: (() => void) | null = null
  let untrapFocus: (() => void) | null = null
  let stopListening: (() => void) | null = null
  let resizeCtrl: ReturnType<typeof createResizeController> | null = null
  let isOpen = false
  let isDestroyed = false

  // ── Wire user callbacks to emitter ────────────────────

  if (options.onBooked) emitter.on('booked', options.onBooked)
  if (options.onClosed) emitter.on('closed', options.onClosed)
  if (options.onError) emitter.on('error', options.onError)

  // ── Build DOM (hidden) ────────────────────────────────

  function mount() {
    styleEl = injectGlobalStyle(MODAL_CSS, MODAL_STYLE_ID)

    elements = buildModalFrame({
      workspaceSlug: options.workspaceSlug,
      path: options.path,
      theme: options.theme,
    })

    // Backdrop click closes
    elements.backdrop.addEventListener('click', (e) => {
      if (e.target === elements!.backdrop) close()
    })

    // Close button
    elements.closeButton.addEventListener('click', () => close())

    // Escape key
    document.addEventListener('keydown', handleEscape)

    // PostMessage from iframe
    stopListening = listenToWidget({
      onReady: () => emitter.emit('ready', undefined as never),
      onBooked: (payload) => {
        emitter.emit('booked', payload)
      },
      onClosed: () => close(),
      onError: (err) => emitter.emit('error', err),
      onResize: (data) => resizeCtrl?.handleResize(data.height),
    })

    // Resize controller
    resizeCtrl = createResizeController(elements.iframe, {
      maxHeight: window.innerHeight - 80,
    })

    // Append to body but keep hidden
    document.body.appendChild(elements.backdrop)
  }

  // ── Open ──────────────────────────────────────────────

  function open() {
    if (isDestroyed || isOpen) return

    if (!elements) mount()

    isOpen = true
    unlockScroll = lockBodyScroll()
    untrapFocus = trapFocus(elements!.panel)
    showModalFrame(elements!)

    // Focus the close button for keyboard users
    requestAnimationFrame(() => elements?.closeButton.focus())
  }

  // ── Close ─────────────────────────────────────────────

  async function close() {
    if (!isOpen || !elements) return

    isOpen = false
    await hideModalFrame(elements)

    unlockScroll?.()
    unlockScroll = null
    untrapFocus?.()
    untrapFocus = null

    emitter.emit('closed', undefined as never)
  }

  // ── Destroy ───────────────────────────────────────────

  function destroy() {
    if (isDestroyed) return
    isDestroyed = true

    document.removeEventListener('keydown', handleEscape)
    stopListening?.()
    resizeCtrl?.destroy()
    unlockScroll?.()
    untrapFocus?.()

    if (elements) {
      destroyIframe(elements.iframe)
      elements.backdrop.remove()
      elements = null
    }

    styleEl?.remove()
    styleEl = null

    emitter.emit('destroyed', undefined as never)
    emitter.removeAll()
  }

  // ── Theme update ──────────────────────────────────────

  function updateTheme(overrides: EmbedThemeOverrides) {
    if (isDestroyed || !elements) return
    sendThemeUpdate(elements.iframe, overrides)
    emitter.emit('theme-updated', undefined as never)
  }

  // ── Helpers ───────────────────────────────────────────

  function handleEscape(e: KeyboardEvent) {
    if (e.key === 'Escape' && isOpen) {
      e.preventDefault()
      close()
    }
  }

  // ── Auto-open on init ─────────────────────────────────

  mount()
  open()

  // ── Public interface ──────────────────────────────────

  return { destroy, updateTheme, open, close }
}
