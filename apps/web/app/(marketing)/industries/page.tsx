import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description: 'Kujua Time adapts to education, healthcare, finance, professional services, real estate, and technology workflows.',
}

const industries = [
  { title: 'Education', href: '/industries/education' },
  { title: 'Technology', href: '/industries/technology' },
  { title: 'Financial Services', href: '/industries/financial-services' },
  { title: 'Professional Services', href: '/industries/professional-services' },
  { title: 'Healthcare', href: '/industries/healthcare' },
  { title: 'Real Estate', href: '/industries/real-estate' },
]

export default function IndustriesPage() {
  return (
    <section className="kujua-section" style={{ background: 'var(--kujua-gray-50)' }}>
      <div className="kujua-container">
        <div className="section-heading" style={{ marginBottom: '48px' }}>
          <span className="kujua-eyebrow" style={{ marginBottom: '16px', display: 'block' }}>Industries</span>
          <h1>Built to adapt to different service environments</h1>
          <p style={{ marginTop: '16px', fontSize: '1.0625rem' }}>
            The same product foundation can support different booking and client workflows across multiple sectors.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {industries.map((industry) => (
            <Link key={industry.href} href={industry.href} style={{ textDecoration: 'none' }}>
              <div className="kujua-card" style={{ padding: '24px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.0625rem' }}>{industry.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
