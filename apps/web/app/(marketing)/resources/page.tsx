import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Educational content, help resources, and product updates from Kujua Time.',
}

const links = [
  { title: 'Learning Hub', href: '/resources/learning-hub' },
  { title: 'Blog', href: '/resources/blog' },
  { title: 'Webinars', href: '/resources/webinars' },
  { title: 'Ebooks', href: '/resources/ebooks' },
  { title: 'Customer Stories', href: '/resources/customer-stories' },
  { title: 'Help Center', href: '/resources/help-center' },
  { title: 'Community', href: '/resources/community' },
  { title: "What's New", href: '/resources/whats-new' },
]

export default function ResourcesPage() {
  return (
    <section className="kujua-section">
      <div className="kujua-container">
        <div className="section-heading" style={{ marginBottom: '48px' }}>
          <span className="kujua-eyebrow" style={{ marginBottom: '16px', display: 'block' }}>Resources</span>
          <h1>Resources and learning</h1>
          <p style={{ marginTop: '16px', fontSize: '1.0625rem' }}>
            Explore guides, support content, updates, and educational material for service businesses using Kujua Time.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {links.map((item) => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <div className="kujua-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.0625rem' }}>{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
