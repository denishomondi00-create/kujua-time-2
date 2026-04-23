/* ─────────────────────────────────────────────────────────────
 * @kujua-time/embed – Modal frame builder
 *
 * Creates the modal DOM structure: backdrop → panel → close
 * button → iframe. This is pure DOM construction; lifecycle
 * management lives in modal-root.ts.
 * ───────────────────────────────────────────────────────────── */

import { createBookingIframe, type CreateIframeOptions } from '../shared/iframe'
import { computeModalHeight } from '../shared/resize'

export interface ModalFrameElements {
  backdrop: HTMLDivElement
  panel: HTMLDivElement
  closeButton: HTMLButtonElement
  iframe: HTMLIFrameElement
}

/**
 * Build the complete modal DOM tree.
 *
 * Structure:
 *   <div.kt-modal-backdrop>
 *     <div.kt-modal-panel role="dialog">
 *       <button.kt-modal-close aria-label="Close" />
 *       <iframe.kt-modal-iframe />
 *     </div>
 *   </div>
 */
export function buildModalFrame(
  iframeOptions: CreateIframeOptions,
): ModalFrameElements {
  // ── Backdrop ──────────────────────────────────────────

  const backdrop = document.createElement('div')
  backdrop.className = 'kt-modal-backdrop'
  backdrop.setAttribute('data-kujua-embed', 'true')

  // ── Panel ─────────────────────────────────────────────

  const panel = document.createElement('div')
  panel.className = 'kt-modal-panel'
  panel.setAttribute('role', 'dialog')
  panel.setAttribute('aria-modal', 'true')
  panel.setAttribute('aria-label', 'Book an appointment')

  // ── Close button ──────────────────────────────────────

  const closeButton = document.createElement('button')
  closeButton.className = 'kt-modal-close'
  closeButton.setAttribute('aria-label', 'Close booking widget')
  closeButton.setAttribute('type', 'button')
  closeButton.innerHTML = '&#x2715;' // ✕ cross mark

  // ── Iframe ────────────────────────────────────────────

  const modalHeight = computeModalHeight()
  const iframe = createBookingIframe({
    ...iframeOptions,
    width: '100%',
    initialHeight: `${modalHeight}px`,
    className: 'kt-modal-iframe',
    tabIndex: 0,
  })

  // ── Assemble ──────────────────────────────────────────

  panel.appendChild(closeButton)
  panel.appendChild(iframe)
  backdrop.appendChild(panel)

  return { backdrop, panel, closeButton, iframe }
}

/**
 * Show the modal with enter animations.
 */
export function showModalFrame(elements: ModalFrameElements): void {
  // Force reflow before adding visible classes
  void elements.backdrop.offsetHeight

  requestAnimationFrame(() => {
    elements.backdrop.classList.add('kt-modal-backdrop--visible')
    elements.panel.classList.add('kt-modal-panel--visible')
  })
}

/**
 * Hide the modal with exit animations.
 * Returns a promise that resolves when the transition ends.
 */
export function hideModalFrame(elements: ModalFrameElements): Promise<void> {
  return new Promise((resolve) => {
    elements.backdrop.classList.remove('kt-modal-backdrop--visible')
    elements.panel.classList.remove('kt-modal-panel--visible')

    const onEnd = () => {
      elements.backdrop.removeEventListener('transitionend', onEnd)
      resolve()
    }

    elements.backdrop.addEventListener('transitionend', onEnd, { once: true })

    // Safety timeout in case transitionend never fires
    setTimeout(resolve, 350)
  })
}
