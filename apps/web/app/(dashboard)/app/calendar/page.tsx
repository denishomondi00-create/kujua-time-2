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
    <>
      <style>{`
        .cal-week-scroll {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          margin: 0 -4px;
          padding: 0 4px 8px;
        }
        .cal-week-grid {
          display: grid;
          grid-template-columns: repeat(7, minmax(148px, 1fr));
          gap: 10px;
          min-width: 0;
        }
        .cal-bottom-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 16px;
        }
        .cal-header-row {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 22px;
          align-items: flex-start;
        }
        .cal-view-btns {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }
        @media (max-width: 1024px) {
          .cal-week-grid {
            grid-template-columns: repeat(7, minmax(130px, 1fr));
          }
        }
        @media (max-width: 768px) {
          .cal-bottom-grid {
            grid-template-columns: 1fr !important;
          }
          .cal-week-grid {
            grid-template-columns: repeat(7, minmax(120px, 1fr));
            gap: 8px;
          }
          .cal-header-row {
            margin-bottom: 16px;
          }
        }
        @media (max-width: 480px) {
          .cal-week-grid {
            grid-template-columns: repeat(7, 110px);
            gap: 6px;
          }
          .cal-view-btns button {
            padding: 8px 12px !important;
            font-size: 0.8125rem !important;
          }
        }
      `}</style>

      <div style={{ display: 'grid', gap: 20 }}>
        <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: '24px' }}>
          <div className="cal-header-row">
            <div>
              <p className="kujua-eyebrow" style={{ marginBottom: 12 }}>Calendar</p>
              <h2 style={{ marginBottom: 8 }}>Plan availability and monitor live booking load</h2>
              <p style={{ maxWidth: 640, margin: 0 }}>
                Review the current week, spot blocked time from connected calendars, and open booking details from the side panel.
              </p>
            </div>
            <div className="cal-view-btns">
              <button className="btn-secondary" type="button" style={{ padding: '10px 18px' }}>Day</button>
              <button className="btn-teal" type="button" style={{ padding: '10px 18px' }}>Week</button>
              <button className="btn-secondary" type="button" style={{ padding: '10px 18px' }}>Month</button>
            </div>
          </div>

          <div className="cal-week-scroll">
            <div className="cal-week-grid">
              {weekDays.map((day) => (
                <div
                  key={`${day.label}-${day.date}`}
                  style={{
                    border: day.isToday ? '1.5px solid var(--kujua-primary-teal)' : '1px solid var(--kujua-gray-200)',
                    background: day.isToday ? 'rgba(13,78,92,0.03)' : 'var(--kujua-white)',
                    borderRadius: 16,
                    padding: '14px 12px',
                    minHeight: 180,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6, marginBottom: 14 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--kujua-charcoal)' }}>{day.label}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--kujua-gray-600)', marginTop: 2 }}>{day.date}</div>
                    </div>
                    {day.isToday && (
                      <span className="kujua-badge kujua-badge-teal" style={{ fontSize: '0.7rem', padding: '2px 8px', flexShrink: 0 }}>Today</span>
                    )}
                  </div>
                  <div style={{ display: 'grid', gap: 6 }}>
                    <div style={{ padding: '8px 10px', borderRadius: 10, background: 'rgba(91,138,114,0.10)', color: 'var(--kujua-secondary-sage)', fontWeight: 600, fontSize: '0.8rem' }}>
                      Availability open
                    </div>
                    <div style={{ padding: '8px 10px', borderRadius: 10, background: 'var(--kujua-gray-50)', border: '1px dashed var(--kujua-gray-200)', color: 'var(--kujua-gray-600)', fontSize: '0.8rem' }}>
                      No bookings yet
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cal-bottom-grid">
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
                  <span style={{ color: 'var(--kujua-primary-teal)', fontWeight: 700, flexShrink: 0 }}>•</span>
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
    </>
  )
}
