/* ─────────────────────────────────────────────────────────────
 * @kujua-time/embed – Modal theme
 *
 * CSS strings for the modal overlay, panel, and animations.
 * Injected as a global <style> because the modal backdrop
 * must cover the full viewport outside any shadow root.
 * ───────────────────────────────────────────────────────────── */

export const MODAL_CSS = `
  .kt-modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 999998;
    background: rgba(26, 29, 32, 0.55);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    opacity: 0;
    transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .kt-modal-backdrop--visible {
    opacity: 1;
  }

  .kt-modal-panel {
    position: fixed;
    z-index: 999999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.96);
    width: min(95vw, 520px);
    max-height: calc(100vh - 48px);
    background: #ffffff;
    border-radius: 24px;
    box-shadow:
      0 20px 25px rgba(13, 78, 92, 0.10),
      0 10px 10px rgba(13, 78, 92, 0.04);
    overflow: hidden;
    opacity: 0;
    transition:
      opacity 250ms cubic-bezier(0.4, 0, 0.2, 1),
      transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .kt-modal-panel--visible {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  .kt-modal-close {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 50%;
    background: rgba(244, 246, 248, 0.9);
    color: #4E565E;
    cursor: pointer;
    transition: background 150ms ease, color 150ms ease;
    font-size: 18px;
    line-height: 1;
    padding: 0;
  }

  .kt-modal-close:hover {
    background: rgba(226, 230, 234, 0.95);
    color: #1A1D20;
  }

  .kt-modal-close:focus-visible {
    outline: 2px solid #0D4E5C;
    outline-offset: 2px;
  }

  .kt-modal-iframe {
    display: block;
    width: 100%;
    border: none;
    border-radius: 24px;
  }

  @media (max-width: 600px) {
    .kt-modal-panel {
      width: 100vw;
      max-height: 100vh;
      top: auto;
      bottom: 0;
      left: 0;
      transform: translateY(100%);
      border-radius: 24px 24px 0 0;
    }

    .kt-modal-panel--visible {
      transform: translateY(0);
    }

    .kt-modal-iframe {
      border-radius: 24px 24px 0 0;
    }
  }
`

export const MODAL_STYLE_ID = 'kt-modal-styles'
