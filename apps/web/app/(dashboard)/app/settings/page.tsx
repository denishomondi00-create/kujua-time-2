import type { Metadata } from 'next'

    export const metadata: Metadata = {
      title: 'Settings',
      description: 'Manage business profile, branding, calendars, meeting locations, payments, notifications, webhooks, and data controls.',
    }

    export default function Page() {
      return (
        <div style={{ display: 'grid', gap: 24 }}>
          <section
            style={{
              background: 'var(--kujua-white)',
              border: '1px solid var(--kujua-gray-200)',
              borderRadius: 24,
              padding: '28px',
              boxShadow: 'var(--kujua-shadow-sm)',
            }}
          >
            <p className="kujua-eyebrow" style={{ marginBottom: 14 }}>Workspace configuration</p>
            <h2 style={{ marginBottom: 12 }}>Settings</h2>
            <p style={{ fontSize: '1rem', maxWidth: 760 }}>Manage business profile, branding, calendars, meeting locations, payments, notifications, webhooks, and data controls.</p>
          </section>

<section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
  {[
    ['General', '/app/settings/general'],
    ['Branding', '/app/settings/branding'],
    ['Calendars', '/app/settings/calendars'],
    ['Meeting locations', '/app/settings/meeting-locations'],
    ['Payments', '/app/settings/payments'],
    ['Notifications', '/app/settings/notifications'],
    ['Billing', '/app/settings/billing'],
    ['Webhooks', '/app/settings/webhooks'],
    ['Security', '/app/settings/security'],
    ['Data', '/app/settings/data'],
  ].map(([label, href]) => (
    <a key={label} href={href} style={{ textDecoration: 'none', background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 20, padding: 20, color: 'var(--kujua-charcoal)' }}>
      <h3 style={{ marginBottom: 10 }}>{label}</h3>
      <p style={{ margin: 0 }}>Open the {label.toLowerCase()} configuration screen.</p>
    </a>
  ))}
</section>

        </div>
      )
    }
