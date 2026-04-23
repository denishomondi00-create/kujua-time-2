import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security & Compliance',
  description: 'Security design principles, data protection controls, and trust posture for Kujua Time.',
}

export default function SecurityPage() {
  return (
    <section className="kujua-section">
      <div className="kujua-container" style={{ maxWidth: '760px' }}>
        <div className="text-center" style={{ marginBottom: '48px' }}>
          <span className="kujua-eyebrow" style={{ marginBottom: '16px', display: 'block' }}>Trust & Security</span>
          <h1>Your booking workflow should be trustworthy by design</h1>
        </div>
        <div className="kujua-prose" style={{ marginInline: 'auto' }}>
          <h3>Security baseline</h3>
          <p>Kujua Time is designed around authenticated access, role-aware permissions, secure webhook verification, rate limiting on public booking routes, and encrypted provider token storage.</p>
          <h3>Data protection controls</h3>
          <p>The architecture supports explicit retention and deletion controls, careful handling of temporary records, and clear separation between short-lived booking holds and permanent operational history.</p>
          <h3>Payment handling</h3>
          <p>Payment flows are intended to run through Stripe and Paystack provider integrations so booking value is granted from verified payment outcomes rather than untrusted client callbacks alone.</p>
          <h3>Operational auditability</h3>
          <p>As the product grows into larger-team workflows, the roadmap includes audit logging, retention controls, and stronger enterprise administration features.</p>
        </div>
      </div>
    </section>
  )
}
