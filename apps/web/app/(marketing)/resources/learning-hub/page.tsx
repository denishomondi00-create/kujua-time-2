import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Learning Hub',
  description: 'Guides and educational content for running cleaner scheduling and client workflows.',
}

export default function Page() {
  return (
    <section className="kujua-section">
      <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '16px' }}>Learning Hub</h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)' }}>Guides and educational content for running cleaner scheduling and client workflows.</p>
      </div>
    </section>
  )
}
