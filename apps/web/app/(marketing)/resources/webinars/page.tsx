import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Webinars',
  description: 'Explore live and recorded sessions about product use, workflow design, and service business operations.',
}

export default function Page() {
  return (
    <section className="kujua-section">
      <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '16px' }}>Webinars</h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)' }}>Explore live and recorded sessions about product use, workflow design, and service business operations.</p>
      </div>
    </section>
  )
}
