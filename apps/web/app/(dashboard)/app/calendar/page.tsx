import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calendar',
  description: 'View day, week, and month booking activity with availability context.',
}

function getWeekDays() {
  const now = new Date()
  const day = now.getDay()
  const diffToMonday = (day + 6) % 7
  const monday = new Date(now)
  monday.setDate(now.getDate() - diffToMonday)

  return Array.from({ length: 7 }).map((_, index) => {
    const date = new Date(monday)
    date.setDate(monday.getDate() + index)
    return {
      label: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date),
      date: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date),
      isToday: date.toDateString() === now.toDateString(),
    }
  })
}

export default function CalendarPage() {
  const weekDays = getWeekDays()

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 22 }}>
          <div>
            <p className="kujua-eyebrow" style={{ marginBottom: 12 }}>Calendar</p>
            <h2 style={{ marginBottom: 8 }}>Plan availability and monitor live booking load</h2>
            <p style={{ maxWidth: 700 }}>
              Review the current week, spot blocked time from connected calendars, and open booking details from the side panel.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button className="btn-secondary" type="button">Day</button>
            <button className="btn-teal" type="button">Week</button>
            <button className="btn-secondary" type="button">Month</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 12 }}>
          {weekDays.map((day) => (
            <div
              key={`${day.label}-${day.date}`}
              style={{
                border: day.isToday ? '1.5px solid var(--kujua-primary-teal)' : '1px solid var(--kujua-gray-200)',
                background: 'var(--kujua-white)',
                borderRadius: 18,
                padding: '16px',
                minHeight: 180,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--kujua-charcoal)' }}>{day.label}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--kujua-gray-600)' }}>{day.date}</div>
                </div>
                {day.isToday && (
                  <span className="kujua-badge kujua-badge-teal">Today</span>
                )}
              </div>
              <div style={{ display: 'grid', gap: 8 }}>
                <div style={{ padding: '10px 12px', borderRadius: 12, background: 'rgba(91,138,114,0.10)', color: 'var(--kujua-secondary-sage)', fontWeight: 600 }}>Availability open</div>
                <div style={{ padding: '10px 12px', borderRadius: 12, background: 'var(--kujua-gray-50)', border: '1px dashed var(--kujua-gray-200)', color: 'var(--kujua-gray-600)' }}>No confirmed bookings yet</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 16 }}>
        <div style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 20, padding: 24 }}>
          <h3 style={{ marginBottom: 14 }}>Availability and exceptions</h3>
          <p style={{ marginBottom: 18 }}>Manage working hours, exception dates, booking buffers, and minimum notice from your event type builder.</p>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              'Working hours are applied per event type.',
              'External busy windows block conflicting time slots.',
              'Booking holds protect checkout from double-booking races.',
            ].map((item) => (
              <div key={item} style={{ display: 'flex', gap: 10 }}>
                <span style={{ color: 'var(--kujua-primary-teal)', fontWeight: 700 }}>•</span>
                <p style={{ margin: 0, color: 'var(--kujua-gray-800)' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
        <aside style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 20, padding: 24 }}>
          <h3 style={{ marginBottom: 14 }}>Booking detail panel</h3>
          <p style={{ marginBottom: 18 }}>Select a booking from the calendar to inspect payment status, client info, reminders, and activity history.</p>
          <div style={{ border: '1px dashed var(--kujua-gray-200)', borderRadius: 16, padding: 18, background: 'var(--kujua-gray-50)' }}>
            <p style={{ margin: 0, color: 'var(--kujua-gray-600)' }}>No booking selected.</p>
          </div>
        </aside>
      </section>
    </div>
  )
}
