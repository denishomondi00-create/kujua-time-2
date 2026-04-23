import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Help Center',
  description: 'Find setup guides, product documentation, and answers to common questions.',
}

export default function Page() {
  return (
    <section className="kujua-section">
      <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '16px' }}>Help Center</h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)' }}>Find setup guides, product documentation, and answers to common questions.</p>
      </div>
    </section>
  )
}
