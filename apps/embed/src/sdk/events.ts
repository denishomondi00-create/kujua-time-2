/* ─────────────────────────────────────────────────────────────
 * @kujua-time/embed – Event emitter
 *
 * Lightweight typed pub/sub for the embed SDK lifecycle.
 * Keeps the host page decoupled from internal widget state.
 * ───────────────────────────────────────────────────────────── */

import type { BookedPayload, EmbedError } from './types'

export type EmbedEventMap = {
  booked: BookedPayload
  closed: void
  ready: void
  error: EmbedError
  'theme-updated': void
  destroyed: void
}

type Handler<T> = (payload: T) => void

export class EmbedEventEmitter {
  private listeners = new Map<keyof EmbedEventMap, Set<Handler<any>>>()

  on<K extends keyof EmbedEventMap>(event: K, handler: Handler<EmbedEventMap[K]>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)!.add(handler)

    // Return unsubscribe function
    return () => {
      this.listeners.get(event)?.delete(handler)
    }
  }

  off<K extends keyof EmbedEventMap>(event: K, handler: Handler<EmbedEventMap[K]>): void {
    this.listeners.get(event)?.delete(handler)
  }

  emit<K extends keyof EmbedEventMap>(event: K, payload: EmbedEventMap[K]): void {
    const handlers = this.listeners.get(event)
    if (!handlers) return
    for (const handler of handlers) {
      try {
        handler(payload)
      } catch (err) {
        console.error(`[KujuaTime] Error in "${String(event)}" handler:`, err)
      }
    }
  }

  removeAll(): void {
    this.listeners.clear()
  }
}
