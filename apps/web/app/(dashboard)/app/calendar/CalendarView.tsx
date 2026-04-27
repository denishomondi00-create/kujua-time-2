'use client'

import { useState, useMemo } from 'react'

type View = 'day' | 'week' | 'month'

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]
const DAY_SHORTS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
const HOURS = Array.from({ length: 13 }, (_, i) => i + 7) // 7 AM – 7 PM

function mondayOf(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  const dow = (d.getDay() + 6) % 7
  d.setDate(d.getDate() - dow)
  return d
}

function sameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString()
}

function fmtHour(h: number) {
  if (h === 0) return '12 AM'
  if (h < 12) return `${h} AM`
  if (h === 12) return '12 PM'
  return `${h - 12} PM`
}

// ── Day view ─────────────────────────────────────────────────────────────────
function DayView({ date, today }: { date: Date; today: Date }) {
  const isToday = sameDay(date, today)
  const nowHour = today.getHours()
  const label = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(date)

  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20,
        padding: '14px 18px', borderRadius: 16,
        background: isToday ? 'rgba(13,78,92,0.06)' : 'var(--kujua-gray-50)',
        border: `1px solid ${isToday ? 'var(--kujua-primary-teal)' : 'var(--kujua-gray-200)'}`,
      }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--kujua-charcoal)' }}>{label}</div>
          {isToday && <div style={{ fontSize: '0.8rem', color: 'var(--kujua-primary-teal)', marginTop: 2 }}>Today</div>}
        </div>
      </div>

      <div style={{ display: 'grid', gap: 0, border: '1px solid var(--kujua-gray-200)', borderRadius: 16, overflow: 'hidden' }}>
        {HOURS.map((h, i) => {
          const isNow = isToday && h === nowHour
          const isAvail = h >= 9 && h <= 17
          return (
            <div
              key={h}
              style={{
                display: 'grid',
                gridTemplateColumns: '72px 1fr',
                borderBottom: i < HOURS.length - 1 ? '1px solid var(--kujua-gray-100)' : 'none',
                background: isNow ? 'rgba(13,78,92,0.04)' : 'var(--kujua-white)',
              }}
            >
              <div style={{
                padding: '12px 10px 12px 16px',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: isNow ? 'var(--kujua-primary-teal)' : 'var(--kujua-gray-500)',
                borderRight: '1px solid var(--kujua-gray-100)',
                display: 'flex',
                alignItems: 'center',
              }}>
                {fmtHour(h)}
              </div>
              <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', minHeight: 52 }}>
                {isAvail ? (
                  <div style={{
                    padding: '4px 10px', borderRadius: 8,
                    background: 'rgba(91,138,114,0.10)',
                    color: 'var(--kujua-secondary-sage)',
                    fontSize: '0.8rem', fontWeight: 600,
                  }}>
                    Availability open
                  </div>
                ) : (
                  <div style={{ fontSize: '0.78rem', color: 'var(--kujua-gray-300)' }}>—</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Week view ─────────────────────────────────────────────────────────────────
function WeekView({ days, today, onDayClick }: { days: Date[]; today: Date; onDayClick: (d: Date) => void }) {
  return (
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as never, margin: '0 -2px', padding: '0 2px 4px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(120px, 1fr))', gap: 8, minWidth: 600 }}>
        {days.map((day, i) => {
          const isToday = sameDay(day, today)
          return (
            <button
              key={i}
              type="button"
              onClick={() => onDayClick(day)}
              style={{
                all: 'unset',
                cursor: 'pointer',
                display: 'block',
                border: isToday ? '2px solid var(--kujua-primary-teal)' : '1px solid var(--kujua-gray-200)',
                background: isToday ? 'rgba(13,78,92,0.04)' : 'var(--kujua-white)',
                borderRadius: 16,
                padding: '14px 12px',
                minHeight: 180,
                textAlign: 'left',
                transition: 'box-shadow 0.15s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--kujua-charcoal)' }}>
                    {DAY_SHORTS[i]}
                  </div>
                  <div style={{
                    marginTop: 4,
                    width: 30, height: 30, borderRadius: '50%',
                    background: isToday ? 'var(--kujua-primary-teal)' : 'transparent',
                    color: isToday ? 'white' : 'var(--kujua-gray-700)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '0.875rem',
                  }}>
                    {day.getDate()}
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gap: 6 }}>
                <div style={{
                  padding: '7px 10px', borderRadius: 10,
                  background: 'rgba(91,138,114,0.10)',
                  color: 'var(--kujua-secondary-sage)',
                  fontSize: '0.75rem', fontWeight: 600,
                }}>
                  Available
                </div>
                <div style={{
                  padding: '7px 10px', borderRadius: 10,
                  background: 'var(--kujua-gray-50)',
                  border: '1px dashed var(--kujua-gray-200)',
                  color: 'var(--kujua-gray-500)',
                  fontSize: '0.75rem',
                }}>
                  No bookings
                </div>
              </div>
            </button>
          )
        })}
      </div>
      <p style={{ margin: '10px 0 0', fontSize: '0.78rem', color: 'var(--kujua-gray-400)', textAlign: 'center' }}>
        Tap a day to view details
      </p>
    </div>
  )
}

// ── Month view ────────────────────────────────────────────────────────────────
function MonthView({ currentDate, today, onDayClick }: { currentDate: Date; today: Date; onDayClick: (d: Date) => void }) {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const cells = useMemo(() => {
    const firstDay = new Date(year, month, 1)
    const startDow = (firstDay.getDay() + 6) % 7 // Mon=0
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const arr: (number | null)[] = [
      ...Array(startDow).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ]
    while (arr.length % 7 !== 0) arr.push(null)
    return arr
  }, [year, month])

  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
        gap: 1,
        background: 'var(--kujua-gray-200)',
        border: '1px solid var(--kujua-gray-200)',
        borderRadius: 16,
        overflow: 'hidden',
      }}>
        {DAY_SHORTS.map((d) => (
          <div key={d} style={{
            background: 'var(--kujua-gray-50)',
            padding: '10px 4px',
            textAlign: 'center',
            fontSize: '0.72rem',
            fontWeight: 700,
            color: 'var(--kujua-gray-500)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          if (!day) {
            return <div key={`e-${i}`} style={{ background: 'var(--kujua-gray-50)', minHeight: 64 }} />
          }
          const date = new Date(year, month, day)
          const isToday = sameDay(date, today)
          const isPast = date < today && !isToday

          return (
            <button
              key={i}
              type="button"
              onClick={() => onDayClick(date)}
              style={{
                all: 'unset',
                cursor: 'pointer',
                background: isToday ? 'rgba(13,78,92,0.06)' : 'var(--kujua-white)',
                minHeight: 64,
                padding: '10px 8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 4,
                opacity: isPast ? 0.5 : 1,
              }}
            >
              <span style={{
                width: 28, height: 28, borderRadius: '50%',
                background: isToday ? 'var(--kujua-primary-teal)' : 'transparent',
                color: isToday ? 'white' : 'var(--kujua-charcoal)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: isToday ? 700 : 500,
                fontSize: '0.875rem',
                flexShrink: 0,
              }}>
                {day}
              </span>
              {!isPast && (
                <span style={{
                  fontSize: '0.65rem',
                  color: 'var(--kujua-secondary-sage)',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}>
                  Open
                </span>
              )}
            </button>
          )
        })}
      </div>
      <p style={{ margin: '10px 0 0', fontSize: '0.78rem', color: 'var(--kujua-gray-400)', textAlign: 'center' }}>
        Tap a day to view details
      </p>
    </div>
  )
}

// ── Main calendar component ───────────────────────────────────────────────────
export default function CalendarView() {
  const [view, setView] = useState<View>('week')
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  })
  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  function goNext() {
    setCurrentDate((prev) => {
      const d = new Date(prev)
      if (view === 'day') d.setDate(d.getDate() + 1)
      else if (view === 'week') d.setDate(d.getDate() + 7)
      else d.setMonth(d.getMonth() + 1)
      return d
    })
  }
  function goPrev() {
    setCurrentDate((prev) => {
      const d = new Date(prev)
      if (view === 'day') d.setDate(d.getDate() - 1)
      else if (view === 'week') d.setDate(d.getDate() - 7)
      else d.setMonth(d.getMonth() - 1)
      return d
    })
  }
  function goToday() {
    setCurrentDate(new Date(today))
  }

  const weekDays = useMemo(() => {
    const start = mondayOf(currentDate)
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start)
      d.setDate(start.getDate() + i)
      return d
    })
  }, [currentDate])

  const title = useMemo(() => {
    if (view === 'day') {
      return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }).format(currentDate)
    }
    if (view === 'week') {
      const s = weekDays[0], e = weekDays[6]
      if (s.getMonth() === e.getMonth()) {
        return `${MONTH_NAMES[s.getMonth()]} ${s.getDate()}–${e.getDate()}, ${s.getFullYear()}`
      }
      return `${MONTH_NAMES[s.getMonth()]} ${s.getDate()} – ${MONTH_NAMES[e.getMonth()]} ${e.getDate()}, ${e.getFullYear()}`
    }
    return `${MONTH_NAMES[currentDate.getMonth()]} ${currentDate.getFullYear()}`
  }, [view, currentDate, weekDays])

  function handleDayClick(d: Date) {
    setCurrentDate(d)
    setView('day')
  }

  return (
    <>
      <style>{`
        .cal-shell { display: grid; gap: 16px; }

        /* Toolbar */
        .cal-toolbar {
          background: var(--kujua-white);
          border: 1px solid var(--kujua-gray-200);
          border-radius: 20px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
        .cal-view-group {
          display: flex;
          gap: 6px;
        }
        .cal-view-btn {
          padding: 9px 18px;
          border-radius: 9999px;
          border: 1px solid var(--kujua-gray-200);
          background: var(--kujua-white);
          color: var(--kujua-gray-700);
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
          white-space: nowrap;
        }
        .cal-view-btn:hover {
          background: var(--kujua-gray-100);
        }
        .cal-view-btn-active {
          background: var(--kujua-primary-teal);
          border-color: var(--kujua-primary-teal);
          color: white;
        }
        .cal-view-btn-active:hover {
          background: var(--kujua-primary-teal);
          opacity: 0.9;
        }
        .cal-nav {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .cal-nav-arrow {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid var(--kujua-gray-200);
          background: var(--kujua-white);
          color: var(--kujua-charcoal);
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.15s;
        }
        .cal-nav-arrow:hover { background: var(--kujua-gray-100); }
        .cal-nav-title {
          font-weight: 600;
          font-size: 0.9375rem;
          color: var(--kujua-charcoal);
          white-space: nowrap;
          min-width: 160px;
          text-align: center;
        }
        .cal-today-btn {
          padding: 7px 14px;
          border-radius: 9999px;
          border: 1px solid var(--kujua-gray-200);
          background: var(--kujua-white);
          color: var(--kujua-gray-700);
          font-weight: 600;
          font-size: 0.8125rem;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.15s;
        }
        .cal-today-btn:hover { background: var(--kujua-gray-100); }

        /* Content card */
        .cal-card {
          background: var(--kujua-white);
          border: 1px solid var(--kujua-gray-200);
          border-radius: 20px;
          padding: 20px;
        }

        /* Bottom info panels */
        .cal-bottom-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 16px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .cal-toolbar {
            padding: 14px 16px;
            gap: 10px;
          }
          .cal-nav-title {
            font-size: 0.85rem;
            min-width: 130px;
          }
          .cal-bottom-grid {
            grid-template-columns: 1fr;
          }
          .cal-card {
            padding: 16px;
          }
        }
        @media (max-width: 540px) {
          .cal-toolbar {
            flex-direction: column;
            align-items: stretch;
          }
          .cal-view-group {
            justify-content: center;
          }
          .cal-nav {
            justify-content: center;
          }
          .cal-view-btn {
            flex: 1;
            text-align: center;
            padding: 9px 10px;
          }
          .cal-nav-title {
            min-width: 110px;
          }
        }
      `}</style>

      <div className="cal-shell">
        {/* Toolbar */}
        <div className="cal-toolbar">
          <div className="cal-view-group">
            {(['day', 'week', 'month'] as View[]).map((v) => (
              <button
                key={v}
                type="button"
                className={`cal-view-btn${view === v ? ' cal-view-btn-active' : ''}`}
                onClick={() => setView(v)}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
          <div className="cal-nav">
            <button type="button" className="cal-nav-arrow" onClick={goPrev} aria-label="Previous">‹</button>
            <span className="cal-nav-title">{title}</span>
            <button type="button" className="cal-nav-arrow" onClick={goNext} aria-label="Next">›</button>
            <button type="button" className="cal-today-btn" onClick={goToday}>Today</button>
          </div>
        </div>

        {/* Calendar view */}
        <div className="cal-card">
          {view === 'day' && <DayView date={currentDate} today={today} />}
          {view === 'week' && <WeekView days={weekDays} today={today} onDayClick={handleDayClick} />}
          {view === 'month' && <MonthView currentDate={currentDate} today={today} onDayClick={handleDayClick} />}
        </div>

        {/* Bottom info */}
        <div className="cal-bottom-grid">
          <div className="cal-card">
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
          <div className="cal-card">
            <h3 style={{ marginBottom: 14 }}>Booking detail panel</h3>
            <p style={{ marginBottom: 18 }}>Select a booking from the calendar to inspect payment status, client info, reminders, and activity history.</p>
            <div style={{ border: '1px dashed var(--kujua-gray-200)', borderRadius: 14, padding: 18, background: 'var(--kujua-gray-50)' }}>
              <p style={{ margin: 0, color: 'var(--kujua-gray-600)' }}>No booking selected.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
