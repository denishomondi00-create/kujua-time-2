"use client"

import { useEffect } from 'react'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      console.error('[GlobalError]', error.digest, error.message)
    }
  }, [error])

  return (
    <html lang="en">
      <head>
        <title>Something went wrong | Kujua Time</title>
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: system-ui, -apple-system, sans-serif;
            background: #F4F6F8;
            color: #1A1D20;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
          }
          .container { max-width: 480px; width: 100%; text-align: center; }
          .icon-wrap {
            width: 72px;
            height: 72px;
            background: rgba(13,78,92,0.08);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 28px;
          }
          h1 {
            font-size: 1.625rem;
            font-weight: 700;
            letter-spacing: -0.02em;
            color: #1A1D20;
            margin-bottom: 12px;
          }
          p {
            font-size: 1rem;
            color: #6B737A;
            line-height: 1.6;
            margin-bottom: 32px;
          }
          .actions {
            display: flex;
            gap: 12px;
            justify-content: center;
            flex-wrap: wrap;
          }
          .btn-primary {
            display: inline-flex;
            align-items: center;
            padding: 12px 24px;
            font-size: 0.9375rem;
            font-weight: 600;
            color: #fff;
            background: #E87A3E;
            border: none;
            border-radius: 9999px;
            cursor: pointer;
            transition: background 0.2s;
          }
          .btn-primary:hover { background: #D1692E; }
          .btn-secondary {
            display: inline-flex;
            align-items: center;
            padding: 11px 24px;
            font-size: 0.9375rem;
            font-weight: 600;
            color: #0D4E5C;
            background: transparent;
            border: 1.5px solid #0D4E5C;
            border-radius: 9999px;
            cursor: pointer;
            text-decoration: none;
          }
          .digest {
            margin-top: 24px;
            font-size: 0.75rem;
            color: #A5AEB8;
            font-family: monospace;
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <div className="icon-wrap">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0D4E5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h1>Something went wrong</h1>
          <p>An unexpected error occurred. Please try again or return to the homepage.</p>
          <div className="actions">
            <button className="btn-primary" onClick={reset}>Try again</button>
            <button className="btn-secondary" onClick={() => { window.location.href = '/' }} type="button">Go to homepage</button>
          </div>
          {error.digest ? <p className="digest">Error ID: {error.digest}</p> : null}
        </div>
      </body>
    </html>
  )
}
