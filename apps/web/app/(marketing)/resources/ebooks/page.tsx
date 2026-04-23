import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ebooks & Guides',
  description: 'Downloadable resources for better booking systems, client operations, and automation planning.',
}

export default function Page() {
  return (
    <section className="kujua-section">
      <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '16px' }}>Ebooks & Guides</h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)' }}>Downloadable resources for better booking systems, client operations, and automation planning.</p>
      </div>
    </section>
  )
}
