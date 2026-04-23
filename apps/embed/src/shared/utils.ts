/* ─────────────────────────────────────────────────────────────
 * @kujua-time/embed – Shared utilities
 *
 * DOM helpers, unique IDs, and validation used across all
 * embed modes (modal, inline, floating button).
 * ───────────────────────────────────────────────────────────── */

/**
 * Generate a short unique ID for widget DOM elements.
 */
export function uid(prefix: string = 'kt'): string {
  const random = Math.random().toString(36).slice(2, 8)
  return `${prefix}-${random}`
}

/**
 * Resolve a CSS selector to an element, throwing if not found.
 */
export function resolveTarget(selector: string): HTMLElement {
  const el = document.querySelector<HTMLElement>(selector)
  if (!el) {
    throw new Error(
      `[KujuaTime] Target element not found: "${selector}". ` +
      `Make sure the element exists in the DOM before calling KujuaTime.init().`
    )
  }
  return el
}

/**
 * Wait for the DOM to be ready, then run callback.
 */
export function onReady(fn: () => void): void {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn, { once: true })
  } else {
    fn()
  }
}

/**
 * Create a styled container div with Kujua identification.
 */
export function createContainer(id: string, className?: string): HTMLDivElement {
  const div = document.createElement('div')
  div.id = id
  div.setAttribute('data-kujua-embed', 'true')
  if (className) {
    div.className = className
  }
  return div
}

/**
 * Inject a <style> block into the document head.
 * Returns the element for later removal.
 */
export function injectGlobalStyle(css: string, id?: string): HTMLStyleElement {
  const style = document.createElement('style')
  style.setAttribute('data-kujua-embed-style', 'true')
  if (id) style.id = id
  style.textContent = css
  document.head.appendChild(style)
  return style
}

/**
 * Remove all Kujua embed elements from the document.
 */
export function removeAllEmbedElements(): void {
  document.querySelectorAll('[data-kujua-embed]').forEach((el) => el.remove())
  document.querySelectorAll('[data-kujua-embed-style]').forEach((el) => el.remove())
}

/**
 * Trap focus inside a container for accessibility (modal use).
 * Returns a cleanup function.
 */
export function trapFocus(container: HTMLElement): () => void {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'iframe',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ')

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Tab') return

    const focusable = container.querySelectorAll<HTMLElement>(focusableSelectors)
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (event.shiftKey) {
      if (document.activeElement === first) {
        event.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }

  container.addEventListener('keydown', handleKeyDown)
  return () => container.removeEventListener('keydown', handleKeyDown)
}

/**
 * Lock body scroll (for modal overlay).
 * Returns cleanup function to restore scroll.
 */
export function lockBodyScroll(): () => void {
  const scrollY = window.scrollY
  const originalStyle = document.body.style.cssText

  document.body.style.position = 'fixed'
  document.body.style.top = `-${scrollY}px`
  document.body.style.left = '0'
  document.body.style.right = '0'
  document.body.style.overflow = 'hidden'

  return () => {
    document.body.style.cssText = originalStyle
    window.scrollTo(0, scrollY)
  }
}

/**
 * Simple noop function for default callbacks.
 */
export function noop(): void {
  // intentionally empty
}

/**
 * Check if we're running in a browser environment.
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}
