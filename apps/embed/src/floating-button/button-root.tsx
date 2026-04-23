/* ─────────────────────────────────────────────────────────────
 * @kujua-time/embed – Floating button root
 *
 * Creates a fixed-position floating action button (FAB) in the
 * bottom-right corner. Clicking it opens the booking modal.
 * The button uses the workspace's accent colour and includes
 * a subtle entry animation.
 * ───────────────────────────────────────────────────────────── */

import type { KujuaTimeInitOptions, KujuaTimeInstance, EmbedThemeOverrides } from '../sdk/types'
import { resolveTheme } from '../theme/tokens'
import { createModalRoot } from '../booking-modal/modal-root'
import { injectGlobalStyle } from '../shared/utils'

const FLOATING_CSS = `
  .kt-floating-button {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 999990;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 24px;
    border: none;
    border-radius: 9999px;
    font-family: 'Outfit', 'Inter', system-ui, sans-serif;
    font-size: 15px;
    font-weight: 600;
    line-height: 1;
    color: #ffffff;
    cursor: pointer;
    box-shadow:
      0 4px 14px rgba(13, 78, 92, 0.25),
      0 2px 6px rgba(13, 78, 92, 0.15);
    transition:
      transform 200ms cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1),
      opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateY(80px);
    opacity: 0;
  }

  .kt-floating-button--visible {
    transform: translateY(0);
    opacity: 1;
  }

  .kt-floating-button:hover {
    transform: translateY(-2px);
    box-shadow:
      0 8px 20px rgba(13, 78, 92, 0.30),
      0 4px 10px rgba(13, 78, 92, 0.18);
  }

  .kt-floating-button:active {
    transform: scale(0.97);
  }

  .kt-floating-button:focus-visible {
    outline: 3px solid rgba(13, 78, 92, 0.3);
    outline-offset: 3px;
  }

  .kt-floating-button svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  @media (max-width: 480px) {
    .kt-floating-button {
      bottom: 16px;
      right: 16px;
      padding: 12px 20px;
      font-size: 14px;
    }
  }
`

const FLOATING_STYLE_ID = 'kt-floating-styles'

const CALENDAR_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`

export function createFloatingRoot(options: KujuaTimeInitOptions): KujuaTimeInstance {
  const theme = resolveTheme(options.theme)
  let button: HTMLButtonElement | null = null
  let styleEl: HTMLStyleElement | null = null
  let modalInstance: KujuaTimeInstance | null = null
  let isDestroyed = false

  // ── Mount button ──────────────────────────────────────

  function mount() {
    styleEl = injectGlobalStyle(FLOATING_CSS, FLOATING_STYLE_ID)

    button = document.createElement('button')
    button.className = 'kt-floating-button'
    button.setAttribute('type', 'button')
    button.setAttribute('aria-label', 'Book an appointment')
    button.setAttribute('data-kujua-embed', 'true')
    button.style.background = theme.accentColor
    button.innerHTML = `${CALENDAR_ICON_SVG}<span>Book Now</span>`

    button.addEventListener('click', handleClick)

    document.body.appendChild(button)

    // Animate in after a short delay
    requestAnimationFrame(() => {
      setTimeout(() => {
        button?.classList.add('kt-floating-button--visible')
      }, 300)
    })
  }

  // ── Click handler ─────────────────────────────────────

  function handleClick() {
    if (modalInstance) {
      modalInstance.open()
    } else {
      // Create the modal on first click (lazy init)
      modalInstance = createModalRoot({
        ...options,
        mode: 'modal',
        onClosed: () => {
          options.onClosed?.()
          // Show the button again after modal closes
          button?.classList.add('kt-floating-button--visible')
        },
      })

      // Hide button while modal is open
      button?.classList.remove('kt-floating-button--visible')
    }
  }

  // ── Open (programmatic) ───────────────────────────────

  function open() {
    if (isDestroyed) return
    handleClick()
  }

  // ── Close ─────────────────────────────────────────────

  function close() {
    modalInstance?.close()
  }

  // ── Destroy ───────────────────────────────────────────

  function destroy() {
    if (isDestroyed) return
    isDestroyed = true

    modalInstance?.destroy()
    modalInstance = null

    button?.removeEventListener('click', handleClick)
    button?.remove()
    button = null

    styleEl?.remove()
    styleEl = null
  }

  // ── Theme update ──────────────────────────────────────

  function updateTheme(overrides: EmbedThemeOverrides) {
    if (isDestroyed) return

    const updated = resolveTheme(overrides)
    if (button) {
      button.style.background = updated.accentColor
    }
    modalInstance?.updateTheme(overrides)
  }

  // ── Init ──────────────────────────────────────────────

  mount()

  return { destroy, updateTheme, open, close }
}
