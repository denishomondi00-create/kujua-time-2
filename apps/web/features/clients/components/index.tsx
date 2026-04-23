import Link from 'next/link'

import { CLIENT_STAGE_OPTIONS, formatClientRevenue, getClientStageTone } from '@/features/clients/utils'
import type { Client, ClientDetail, ClientStage } from '@/features/clients/schemas'

function StagePill({ stage }: { stage: ClientStage }) {
  const tone = getClientStageTone(stage)

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: 9999,
        padding: '4px 10px',
        fontSize: '0.75rem',
        fontWeight: 700,
        background: tone.background,
        color: tone.color,
      }}
    >
      {stage.toUpperCase()}
    </span>
  )
}

type ToolbarProps = {
  search: string
  stage?: ClientStage
  onSearchChange(value: string): void
  onStageChange(value?: ClientStage): void
}

export function ClientsToolbar({ search, stage, onSearchChange, onStageChange }: ToolbarProps) {
  return (
    <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
        <div>
          <p className="kujua-eyebrow" style={{ marginBottom: 12 }}>Clients</p>
          <h2 style={{ marginBottom: 8 }}>Track client history, notes, revenue, and lifecycle stage</h2>
          <p style={{ maxWidth: 760 }}>
            Every confirmed booking should create or update a client record. Use this space to manage relationships,
            notes, invoices, and follow-up context across the full lifecycle.
          </p>
        </div>

        <input
          type="search"
          className="kujua-input"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name, email, or tag"
          style={{ width: 280 }}
        />
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button type="button" onClick={() => onStageChange(undefined)} className={!stage ? 'btn-teal' : 'btn-secondary'} style={{ padding: '10px 16px' }}>
          All
        </button>
        {CLIENT_STAGE_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onStageChange(option.value)}
            className={stage === option.value ? 'btn-teal' : 'btn-secondary'}
            style={{ padding: '10px 16px' }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  )
}

export function ClientsTable({ items }: { items: Client[] }) {
  return (
    <div style={{ overflowX: 'auto', background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 960 }}>
        <thead>
          <tr style={{ background: 'var(--kujua-gray-50)' }}>
            {['Client', 'Stage', 'Tags', 'Bookings', 'Revenue', 'Blocked', 'Open'].map((column) => (
              <th key={column} style={{ padding: '14px 18px', textAlign: 'left', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--kujua-gray-400)' }}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((client) => (
            <tr key={client.id} style={{ borderTop: '1px solid var(--kujua-gray-100)' }}>
              <td style={{ padding: '16px 18px' }}>
                <div style={{ fontWeight: 700, color: 'var(--kujua-charcoal)' }}>{client.fullName}</div>
                <div style={{ fontSize: '0.875rem' }}>{client.email}</div>
              </td>
              <td style={{ padding: '16px 18px' }}><StagePill stage={client.stage} /></td>
              <td style={{ padding: '16px 18px' }}>{client.tags.length ? client.tags.join(', ') : '—'}</td>
              <td style={{ padding: '16px 18px' }}>{client.totalBookings}</td>
              <td style={{ padding: '16px 18px' }}>{formatClientRevenue(client.totalRevenue, client.currency)}</td>
              <td style={{ padding: '16px 18px' }}>{client.isBlocked ? 'Yes' : 'No'}</td>
              <td style={{ padding: '16px 18px' }}>
                <Link href={`/app/clients/${client.id}`} style={{ color: 'var(--kujua-primary-teal)', fontWeight: 700 }}>
                  Open
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ClientsEmptyState() {
  return (
    <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: 28 }}>
      <h3 style={{ marginBottom: 10 }}>No clients yet</h3>
      <p style={{ marginBottom: 20 }}>
        Client records will be created automatically when people book, pay, or submit qualifying intake forms.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link href="/app/event-types/new" className="btn-primary">Create event type</Link>
        <Link href="/app/forms" className="btn-secondary">Attach intake forms</Link>
      </div>
    </section>
  )
}

export function ClientProfileCard({ client }: { client: ClientDetail }) {
  return (
    <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 20, padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'start', marginBottom: 16 }}>
        <div>
          <h2 style={{ marginBottom: 8 }}>{client.fullName}</h2>
          <p style={{ margin: 0 }}>{client.email}</p>
          {client.phone ? <p style={{ margin: '4px 0 0 0' }}>{client.phone}</p> : null}
        </div>
        <StagePill stage={client.stage} />
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {[
          ['Total bookings', String(client.totalBookings)],
          ['Total revenue', formatClientRevenue(client.totalRevenue, client.currency)],
          ['Invoices', String(client.invoicesCount)],
          ['Payments', String(client.paymentsCount)],
          ['Blocked', client.isBlocked ? 'Yes' : 'No'],
        ].map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, paddingBottom: 12, borderBottom: '1px solid var(--kujua-gray-100)' }}>
            <span style={{ color: 'var(--kujua-gray-600)' }}>{label}</span>
            <span style={{ color: 'var(--kujua-charcoal)', fontWeight: 600 }}>{value}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export function ClientNotesPanel({ client }: { client: ClientDetail }) {
  return (
    <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 20, padding: 24 }}>
      <h3 style={{ marginBottom: 16 }}>Notes</h3>
      {client.notes.length === 0 ? (
        <p style={{ margin: 0 }}>Notes added by your team will appear here.</p>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {client.notes.map((note) => (
            <div key={note.id} style={{ border: '1px solid var(--kujua-gray-200)', borderRadius: 16, padding: 16, background: 'var(--kujua-gray-50)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
                <strong style={{ color: 'var(--kujua-charcoal)' }}>{note.createdByName ?? 'Team member'}</strong>
                <span style={{ fontSize: '0.875rem' }}>{new Date(note.createdAt).toLocaleString()}</span>
              </div>
              <p style={{ margin: 0 }}>{note.content}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export function ClientTimeline({ client }: { client: ClientDetail }) {
  return (
    <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 20, padding: 24 }}>
      <h3 style={{ marginBottom: 16 }}>Timeline</h3>
      {client.timeline.length === 0 ? (
        <p style={{ margin: 0 }}>Bookings, payments, and form submissions will appear in the client timeline.</p>
      ) : (
        <div style={{ display: 'grid', gap: 14 }}>
          {client.timeline.map((item) => (
            <div key={item.id} style={{ display: 'grid', gap: 4, paddingLeft: 16, borderLeft: '2px solid var(--kujua-gray-200)' }}>
              <div style={{ color: 'var(--kujua-charcoal)', fontWeight: 700 }}>{item.title}</div>
              <div style={{ fontSize: '0.875rem' }}>{new Date(item.occurredAt).toLocaleString()}</div>
              {item.description ? <p style={{ margin: 0 }}>{item.description}</p> : null}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
