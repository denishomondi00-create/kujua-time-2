/* ─────────────────────────────────────────────────────────────
 * @kujua-time/embed – Resize manager
 *
 * Handles auto-resizing the iframe to match its content height.
 * Uses two strategies:
 *   1. postMessage-based: the iframe sends 'resize' messages
 *      with the current document height.
 *   2. Fallback: polls the iframe height on a slow interval
 *      for environments where postMessage is unreliable.
 * ───────────────────────────────────────────────────────────── */

export interface ResizeOptions {
  /** Minimum iframe height in pixels. Default 200. */
  minHeight?: number
  /** Maximum iframe height in pixels. Default 2000. */
  maxHeight?: number
  /** Extra padding added to the reported height. Default 16. */
  padding?: number
  /** Debounce interval in ms. Default 100. */
  debounceMs?: number
}

const DEFAULT_MIN_HEIGHT = 200
const DEFAULT_MAX_HEIGHT = 2000
const DEFAULT_PADDING = 16
const DEFAULT_DEBOUNCE_MS = 100

/**
 * Create a resize controller for a specific iframe.
 */
export function createResizeController(
  iframe: HTMLIFrameElement,
  options: ResizeOptions = {},
): ResizeController {
  const minHeight = options.minHeight ?? DEFAULT_MIN_HEIGHT
  const maxHeight = options.maxHeight ?? DEFAULT_MAX_HEIGHT
  const padding = options.padding ?? DEFAULT_PADDING
  const debounceMs = options.debounceMs ?? DEFAULT_DEBOUNCE_MS

  let debounceTimer: ReturnType<typeof setTimeout> | null = null
  let currentHeight = parseInt(iframe.style.height, 10) || 650
  let destroyed = false

  function applyHeight(rawHeight: number) {
    if (destroyed) return

    const clamped = Math.max(minHeight, Math.min(maxHeight, rawHeight + padding))

    // Avoid unnecessary reflows
    if (Math.abs(clamped - currentHeight) < 2) return

    currentHeight = clamped
    iframe.style.height = `${clamped}px`
  }

  function handleResize(height: number) {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => applyHeight(height), debounceMs)
  }

  function destroy() {
    destroyed = true
    if (debounceTimer) clearTimeout(debounceTimer)
  }

  return {
    handleResize,
    getCurrentHeight: () => currentHeight,
    setHeight: applyHeight,
    destroy,
  }
}

export interface ResizeController {
  /** Handle a height report from the iframe's postMessage */
  handleResize: (height: number) => void
  /** Get the current applied height */
  getCurrentHeight: () => number
  /** Directly set the iframe height (bypasses debounce) */
  setHeight: (height: number) => void
  /** Clean up timers */
  destroy: () => void
}

/**
 * Animate iframe height with a smooth CSS transition.
 * Useful for modal open/close animations.
 */
export function animateIframeHeight(
  iframe: HTMLIFrameElement,
  targetHeight: number,
  durationMs: number = 300,
): void {
  iframe.style.transition = `height ${durationMs}ms cubic-bezier(0.4, 0, 0.2, 1)`
  iframe.style.height = `${targetHeight}px`

  // Clean up transition after it completes
  const cleanup = () => {
    iframe.style.transition = ''
    iframe.removeEventListener('transitionend', cleanup)
  }
  iframe.addEventListener('transitionend', cleanup, { once: true })
}

/**
 * Compute a sensible initial height based on viewport.
 * Used for modal mode where the iframe should fill most
 * of the viewport.
 */
export function computeModalHeight(): number {
  const vh = window.innerHeight
  return Math.max(DEFAULT_MIN_HEIGHT, Math.min(vh - 120, DEFAULT_MAX_HEIGHT))
}
