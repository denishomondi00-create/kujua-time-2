import Link from 'next/link'

import { BOOKING_STATUS_OPTIONS, formatBookingAmount, formatBookingDateRange, getBookingStatusTone } from '@/features/bookings/utils'
import type { BookingDetail, BookingListItem, BookingPaymentStatus, BookingStatus } from '@/features/bookings/schemas'

function StatusPill({ label, tone }: { label: string; tone: { background: string; color: string } }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9999,
        padding: '4px 10px',
        fontSize: '0.75rem',
        fontWeight: 700,
        background: tone.background,
        color: tone.color,
      }}
    >
      {label}
    </span>
  )
}

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return <StatusPill label={status.replace('_', ' ')} tone={getBookingStatusTone(status)} />
}

export function BookingPaymentBadge({ status }: { status: BookingPaymentStatus }) {
  return <StatusPill label={status.replace('_', ' ')} tone={getBookingStatusTone(status)} />
}

type ToolbarProps = {
  search: string
  status?: BookingStatus
  onSearchChange(value: string): void
  onStatusChange(value?: BookingStatus): void
}

export function BookingsToolbar({ search, status, onSearchChange, onStatusChange }: ToolbarProps) {
  return (
    <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
        <div>
          <p className="kujua-eyebrow" style={{ marginBottom: 12 }}>Bookings</p>
          <h2 style={{ marginBottom: 8 }}>Track appointment activity from confirmation to completion</h2>
          <p style={{ maxWidth: 760 }}>
            Review booking status, payment coverage, reminders, and intake context from a single operational list.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <input
            type="search"
            className="kujua-input"
            placeholder="Search by client, event type, or reference"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            style={{ width: 280 }}
          />
          <Link href="/app/calendar" className="btn-secondary">Open calendar</Link>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => onStatusChange(undefined)}
          className={!status ? 'btn-teal' : 'btn-secondary'}
          style={{ padding: '10px 16px' }}
        >
          All
        </button>

        {BOOKING_STATUS_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onStatusChange(option.value)}
            className={status === option.value ? 'btn-teal' : 'btn-secondary'}
            style={{ padding: '10px 16px' }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  )
}

export function BookingsTable({ items }: { items: BookingListItem[] }) {
  return (
    <div style={{ overflowX: 'auto', background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 960 }}>
        <thead>
          <tr style={{ background: 'var(--kujua-gray-50)' }}>
            {['Client', 'Event type', 'Date & time', 'Status', 'Payment', 'Amount', 'Open'].map((column) => (
              <th key={column} style={{ padding: '14px 18px', textAlign: 'left', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--kujua-gray-400)' }}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((booking) => (
            <tr key={booking.id} style={{ borderTop: '1px solid var(--kujua-gray-100)' }}>
              <td style={{ padding: '16px 18px' }}>
                <div style={{ fontWeight: 700, color: 'var(--kujua-charcoal)' }}>{booking.clientName}</div>
                <div style={{ fontSize: '0.875rem' }}>{booking.clientEmail}</div>
              </td>
              <td style={{ padding: '16px 18px' }}>{booking.eventTypeName}</td>
              <td style={{ padding: '16px 18px' }}>{formatBookingDateRange(booking.startAt, booking.endAt, booking.timezone)}</td>
              <td style={{ padding: '16px 18px' }}><BookingStatusBadge status={booking.status} /></td>
              <td style={{ padding: '16px 18px' }}><BookingPaymentBadge status={booking.paymentStatus} /></td>
              <td style={{ padding: '16px 18px' }}>{formatBookingAmount(booking.amount, booking.currency)}</td>
              <td style={{ padding: '16px 18px' }}>
                <Link href={`/app/bookings/${booking.id}`} style={{ color: 'var(--kujua-primary-teal)', fontWeight: 700 }}>
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

export function BookingEmptyState() {
  return (
    <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: 28 }}>
      <h3 style={{ marginBottom: 10 }}>No bookings to show yet</h3>
      <p style={{ marginBottom: 20 }}>
        Once a client books through your public page or you create a manual booking from the calendar,
        records will appear here with payment, reminder, and client history context.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link href="/app/event-types/new" className="btn-primary">Create event type</Link>
        <Link href="/app/forms" className="btn-secondary">Review intake forms</Link>
      </div>
    </section>
  )
}

export function BookingSummaryCard({ booking }: { booking: BookingDetail }) {
  return (
    <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 20, padding: 24 }}>
      <h3 style={{ marginBottom: 16 }}>Booking summary</h3>
      <div style={{ display: 'grid', gap: 12 }}>
        {[
          ['Reference', booking.reference],
          ['Client', booking.clientName],
          ['Event type', booking.eventTypeName],
          ['Date & time', formatBookingDateRange(booking.startAt, booking.endAt, booking.timezone)],
          ['Meeting location', booking.meetingLocation ?? 'Not set'],
          ['Amount', formatBookingAmount(booking.amount, booking.currency)],
        ].map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, paddingBottom: 12, borderBottom: '1px solid var(--kujua-gray-100)' }}>
            <span style={{ color: 'var(--kujua-gray-600)' }}>{label}</span>
            <span style={{ color: 'var(--kujua-charcoal)', fontWeight: 600, textAlign: 'right' }}>{value}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export function BookingTimeline({ booking }: { booking: BookingDetail }) {
  return (
    <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 20, padding: 24 }}>
      <h3 style={{ marginBottom: 16 }}>Activity timeline</h3>
      {booking.timeline.length === 0 ? (
        <p style={{ margin: 0 }}>Timeline events will appear here once reminder, payment, and booking actions run.</p>
      ) : (
        <div style={{ display: 'grid', gap: 14 }}>
          {booking.timeline.map((item) => (
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

export function BookingDetailPanel({ booking }: { booking: BookingDetail }) {
  return (
    <div className="booking-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 360px', gap: 16 }}>
      <section style={{ display: 'grid', gap: 16 }}>
        <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 20, padding: 24 }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
            <BookingStatusBadge status={booking.status} />
            <BookingPaymentBadge status={booking.paymentStatus} />
          </div>
          <h2 style={{ marginBottom: 10 }}>{booking.clientName}</h2>
          <p style={{ marginBottom: 12 }}>{booking.eventTypeName}</p>
          {booking.notes ? (
            <div style={{ padding: 16, borderRadius: 16, background: 'var(--kujua-gray-50)', border: '1px solid var(--kujua-gray-200)' }}>
              <strong style={{ display: 'block', marginBottom: 8, color: 'var(--kujua-charcoal)' }}>Notes</strong>
              <p style={{ margin: 0 }}>{booking.notes}</p>
            </div>
          ) : null}
        </section>
        <BookingTimeline booking={booking} />
      </section>
      <BookingSummaryCard booking={booking} />
      <style>{`
        @media (max-width: 980px) {
          .booking-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
