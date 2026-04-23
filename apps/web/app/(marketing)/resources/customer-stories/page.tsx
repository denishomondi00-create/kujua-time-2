import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Customer Stories',
  description: 'Examples of how service businesses can use Kujua Time to simplify scheduling and follow-up.',
}

export default function Page() {
  return (
    <section className="kujua-section">
      <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '16px' }}>Customer Stories</h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)' }}>Examples of how service businesses can use Kujua Time to simplify scheduling and follow-up.</p>
      </div>
    </section>
  )
}
