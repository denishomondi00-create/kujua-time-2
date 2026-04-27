'use client'

import { useState, useMemo } from 'react'

type View = 'day' | 'week' | 'month'

interface CalEvent {
  id: string
  title: string
  date: string   // YYYY-MM-DD
  startTime: string
  endTime: string
  description: string
}

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]
const DAY_SHORTS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
const HOURS = Array.from({ length: 13 }, (_, i) => i + 7) // 7 AM – 7 PM
const TIME_OPTIONS = Array.from({ length: 24 * 2 }, (_, i) => {
  const h = Math.floor(i / 2)
  const m = i % 2 === 0 ? '00' : '30'
  const label = h === 0 ? `12:00 AM` : h < 12 ? `${h}:${m} AM` : h === 12 ? `12:${m} PM` : `${h - 12}:${m} PM`
  const value = `${String(h).padStart(2, '0')}:${m}`
  return { label, value }
})

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

function toYMD(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function fmtHour(h: number) {
  if (h === 0) return '12 AM'
  if (h < 12) return `${h} AM`
  if (h === 12) return '12 PM'
  return `${h - 12} PM`
}

// ── Create Event Modal ────────────────────────────────────────────────────────
function CreateEventModal({
  initialDate,
  onClose,
  onSave,
}: {
  initialDate: Date
  onClose: () => void
  onSave: (event: CalEvent) => void
}) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(toYMD(initialDate))
  const [startTime, setStartTime] = useState('09:00')
  const [endTime, setEndTime] = useState('10:00')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) { setError('Event title is required.'); return }
    if (startTime >= endTime) { setError('End time must be after start time.'); return }
    onSave({
      id: `evt-${Date.now()}`,
      title: title.trim(),
      date,
      startTime,
      endTime,
      description,
    })
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{
        background: 'var(--kujua-white)',
        borderRadius: 24,
        padding: '28px 24px',
        width: '100%',
        maxWidth: 480,
        boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h3 style={{ margin: 0 }}>New event</h3>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'var(--kujua-gray-100)', border: 'none', borderRadius: 10,
              width: 36, height: 36, cursor: 'pointer', fontSize: '1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--kujua-gray-700)',
            }}
          >✕</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
          {error && (
            <div style={{
              padding: '10px 14px', borderRadius: 12,
              background: 'var(--kujua-error-bg)', border: '1px solid var(--kujua-error)',
              color: 'var(--kujua-error)', fontSize: '0.875rem',
            }}>
              {error}
            </div>
          )}

          <div style={{ display: 'grid', gap: 6 }}>
            <label style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--kujua-charcoal)' }}>
              Event title <span style={{ color: 'var(--kujua-error)' }}>*</span>
            </label>
            <input
              className="kujua-input"
              type="text"
              placeholder="e.g. Strategy session with client"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setError('') }}
              autoFocus
            />
          </div>

          <div style={{ display: 'grid', gap: 6 }}>
            <label style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--kujua-charcoal)' }}>Date</label>
            <input
              className="kujua-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ display: 'grid', gap: 6 }}>
              <label style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--kujua-charcoal)' }}>Start</label>
              <select
                className="kujua-input"
                value={startTime}
                onChange={(e) => { setStartTime(e.target.value); setError('') }}
              >
                {TIME_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div style={{ display: 'grid', gap: 6 }}>
              <label style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--kujua-charcoal)' }}>End</label>
              <select
                className="kujua-input"
                value={endTime}
                onChange={(e) => { setEndTime(e.target.value); setError('') }}
              >
                {TIME_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 6 }}>
            <label style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--kujua-charcoal)' }}>
              Description <span style={{ fontWeight: 400, color: 'var(--kujua-gray-500)' }}>(optional)</span>
            </label>
            <textarea
              className="kujua-input"
              rows={3}
              placeholder="Notes about this event…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ resize: 'vertical', minHeight: 72 }}
            />
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
            <button type="button" className="btn-secondary" onClick={onClose} style={{ padding: '10px 20px' }}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" style={{ padding: '10px 24px' }}>
              Create event
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Day view ──────────────────────────────────────────────────────────────────
function DayView({
  date, today, events, onSlotClick,
}: {
  date: Date; today: Date; events: CalEvent[]; onSlotClick: (hour: number) => void
}) {
  const isToday = sameDay(date, today)
  const nowHour = today.getHours()
  const ymd = toYMD(date)
  const dayEvents = events.filter(e => e.date === ymd)

  const label = new Intl.DateTimeFormat('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  }).format(date)

  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 12, marginBottom: 16, padding: '14px 18px', borderRadius: 16,
        background: isToday ? 'rgba(13,78,92,0.05)' : 'var(--kujua-gray-50)',
        border: `1px solid ${isToday ? 'var(--kujua-primary-teal)' : 'var(--kujua-gray-200)'}`,
        flexWrap: 'wrap',
      }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--kujua-charcoal)' }}>{label}</div>
          {isToday && <div style={{ fontSize: '0.8rem', color: 'var(--kujua-primary-teal)', marginTop: 2 }}>Today</div>}
        </div>
        {dayEvents.length > 0 && (
          <span style={{
            padding: '4px 12px', borderRadius: 9999,
            background: 'var(--kujua-primary-teal)', color: 'white',
            fontSize: '0.8rem', fontWeight: 700,
          }}>
            {dayEvents.length} event{dayEvents.length > 1 ? 's' : ''}
          </span>
        )}
      </div>

      <div style={{
        border: '1px solid var(--kujua-gray-200)', borderRadius: 16, overflow: 'hidden',
      }}>
        {HOURS.map((h, i) => {
          const isNow = isToday && h === nowHour
          const isAvail = h >= 9 && h <= 17
          const slotEvents = dayEvents.filter(e => {
            const sh = parseInt(e.startTime.split(':')[0])
            return sh === h
          })

          return (
            <div
              key={h}
              onClick={() => onSlotClick(h)}
              style={{
                display: 'grid',
                gridTemplateColumns: '72px 1fr',
                borderBottom: i < HOURS.length - 1 ? '1px solid var(--kujua-gray-100)' : 'none',
                background: isNow ? 'rgba(13,78,92,0.04)' : 'var(--kujua-white)',
                cursor: 'pointer',
                transition: 'background 0.12s',
              }}
            >
              <div style={{
                padding: '12px 8px 12px 16px',
                fontSize: '0.78rem', fontWeight: 600,
                color: isNow ? 'var(--kujua-primary-teal)' : 'var(--kujua-gray-400)',
                borderRight: '1px solid var(--kujua-gray-100)',
                display: 'flex', alignItems: 'center',
              }}>
                {fmtHour(h)}
              </div>
              <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, minHeight: 52, flexWrap: 'wrap' }}>
                {slotEvents.map(ev => (
                  <div key={ev.id} style={{
                    padding: '5px 10px', borderRadius: 8,
                    background: 'var(--kujua-primary-teal)', color: 'white',
                    fontSize: '0.8rem', fontWeight: 600,
                  }}>
                    {ev.title} · {ev.startTime}–{ev.endTime}
                  </div>
                ))}
                {slotEvents.length === 0 && isAvail && (
                  <div style={{
                    padding: '4px 10px', borderRadius: 8,
                    background: 'rgba(91,138,114,0.10)',
                    color: 'var(--kujua-secondary-sage)',
                    fontSize: '0.78rem', fontWeight: 600,
                  }}>
                    Available — click to add event
                  </div>
                )}
                {slotEvents.length === 0 && !isAvail && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--kujua-gray-300)' }}>—</span>
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
function WeekView({
  days, today, events, onDayClick, onAddEvent,
}: {
  days: Date[]
  today: Date
  events: CalEvent[]
  onDayClick: (d: Date) => void
  onAddEvent: (d: Date) => void
}) {
  const [selectedDay, setSelectedDay] = useState<Date>(() => {
    return days.find(d => sameDay(d, today)) ?? days[0]
  })

  const effectiveSelected = days.some(d => sameDay(d, selectedDay)) ? selectedDay : days[0]
  const selectedYMD = toYMD(effectiveSelected)
  const selectedLabel = new Intl.DateTimeFormat('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  }).format(effectiveSelected)
  const selectedEvents = events.filter(e => e.date === selectedYMD)

  return (
    <>
      {/* ── Desktop: 7-column card grid (≥641px) ── */}
      <div className="cal-week-desktop">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
          gap: 8,
        }}>
          {days.map((day, i) => {
            const isToday = sameDay(day, today)
            const ymd = toYMD(day)
            const dayEvts = events.filter(e => e.date === ymd)
            return (
              <div
                key={i}
                style={{
                  border: isToday ? '2px solid var(--kujua-primary-teal)' : '1px solid var(--kujua-gray-200)',
                  background: isToday ? 'rgba(13,78,92,0.04)' : 'var(--kujua-white)',
                  borderRadius: 14,
                  padding: '12px 10px',
                  minHeight: 150,
                  display: 'grid',
                  gridTemplateRows: 'auto 1fr auto',
                  gap: 8,
                }}
              >
                {/* Day header */}
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => onDayClick(day)}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--kujua-gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {DAY_SHORTS[i]}
                  </div>
                  <div style={{
                    marginTop: 4,
                    width: 28, height: 28, borderRadius: '50%',
                    background: isToday ? 'var(--kujua-primary-teal)' : 'transparent',
                    color: isToday ? 'white' : 'var(--kujua-charcoal)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '0.875rem',
                  }}>
                    {day.getDate()}
                  </div>
                </div>

                {/* Events area */}
                <div style={{ display: 'grid', gap: 4, alignContent: 'start' }}>
                  {dayEvts.map(ev => (
                    <div key={ev.id} style={{
                      padding: '4px 7px', borderRadius: 7,
                      background: 'var(--kujua-primary-teal)', color: 'white',
                      fontSize: '0.7rem', fontWeight: 600,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {ev.title}
                    </div>
                  ))}
                  {dayEvts.length === 0 && (
                    <div style={{
                      padding: '4px 7px', borderRadius: 7,
                      background: 'rgba(91,138,114,0.10)',
                      color: 'var(--kujua-secondary-sage)',
                      fontSize: '0.7rem', fontWeight: 600,
                    }}>
                      Available
                    </div>
                  )}
                </div>

                {/* Add button */}
                <button
                  type="button"
                  onClick={() => onAddEvent(day)}
                  style={{
                    all: 'unset', cursor: 'pointer',
                    display: 'block', textAlign: 'center',
                    padding: '4px', borderRadius: 8,
                    fontSize: '0.7rem', color: 'var(--kujua-gray-400)',
                    border: '1px dashed var(--kujua-gray-200)',
                    transition: 'color 0.12s, border-color 0.12s',
                  }}
                >
                  + Add
                </button>
              </div>
            )
          })}
        </div>
        <p style={{ margin: '10px 0 0', fontSize: '0.78rem', color: 'var(--kujua-gray-400)', textAlign: 'center' }}>
          Click a day heading to see full detail · Click + Add to create an event
        </p>
      </div>

      {/* ── Mobile: compact day strip + detail panel (≤640px) ── */}
      <div className="cal-week-mobile">
        {/* Day strip */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 2,
          background: 'var(--kujua-gray-50)',
          border: '1px solid var(--kujua-gray-200)',
          borderRadius: 16, padding: '10px 6px',
          marginBottom: 14,
        }}>
          {days.map((day, i) => {
            const isToday = sameDay(day, today)
            const isSelected = sameDay(day, effectiveSelected)
            const hasEvents = events.some(e => e.date === toYMD(day))
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedDay(day)}
                style={{
                  all: 'unset', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  padding: '4px 0',
                }}
              >
                <span style={{
                  fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase',
                  color: isSelected ? 'var(--kujua-primary-teal)' : 'var(--kujua-gray-500)',
                  letterSpacing: '0.03em',
                }}>
                  {DAY_SHORTS[i][0]}
                </span>
                <span style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: isSelected ? 'var(--kujua-primary-teal)' : 'transparent',
                  color: isSelected ? 'white' : isToday ? 'var(--kujua-primary-teal)' : 'var(--kujua-charcoal)',
                  border: isToday && !isSelected ? '2px solid var(--kujua-primary-teal)' : '2px solid transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '0.875rem',
                }}>
                  {day.getDate()}
                </span>
                {/* event dot */}
                <span style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: hasEvents ? 'var(--kujua-primary-teal)' : 'transparent',
                }} />
              </button>
            )
          })}
        </div>

        {/* Selected day detail */}
        <div style={{
          border: '1px solid var(--kujua-gray-200)', borderRadius: 16, overflow: 'hidden',
        }}>
          <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid var(--kujua-gray-100)',
            background: 'var(--kujua-gray-50)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{ fontWeight: 700, color: 'var(--kujua-charcoal)' }}>{selectedLabel}</div>
            <button
              type="button"
              onClick={() => onAddEvent(effectiveSelected)}
              className="btn-primary"
              style={{ padding: '6px 14px', fontSize: '0.8rem' }}
            >
              + Add event
            </button>
          </div>
          <div style={{ padding: '12px 16px', display: 'grid', gap: 8 }}>
            {selectedEvents.length > 0 ? (
              selectedEvents.map(ev => (
                <div key={ev.id} style={{
                  padding: '10px 14px', borderRadius: 12,
                  background: 'var(--kujua-primary-teal)', color: 'white',
                }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{ev.title}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.85, marginTop: 2 }}>
                    {ev.startTime} – {ev.endTime}
                  </div>
                </div>
              ))
            ) : (
              <>
                <div style={{
                  padding: '10px 12px', borderRadius: 12,
                  background: 'rgba(91,138,114,0.10)', color: 'var(--kujua-secondary-sage)',
                  fontWeight: 600, fontSize: '0.875rem',
                }}>
                  Availability open
                </div>
                <div style={{
                  padding: '10px 12px', borderRadius: 12,
                  background: 'var(--kujua-gray-50)',
                  border: '1px dashed var(--kujua-gray-200)',
                  color: 'var(--kujua-gray-500)', fontSize: '0.875rem',
                }}>
                  No events yet — tap + Add event to create one
                </div>
              </>
            )}
          </div>
          <div style={{ padding: '10px 16px', borderTop: '1px solid var(--kujua-gray-100)' }}>
            <button
              type="button"
              onClick={() => onDayClick(effectiveSelected)}
              style={{
                all: 'unset', cursor: 'pointer',
                fontSize: '0.85rem', fontWeight: 600,
                color: 'var(--kujua-primary-teal)',
              }}
            >
              View full day →
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

// ── Month view ────────────────────────────────────────────────────────────────
function MonthView({
  currentDate, today, events, onDayClick,
}: {
  currentDate: Date; today: Date; events: CalEvent[]; onDayClick: (d: Date) => void
}) {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const cells = useMemo(() => {
    const firstDay = new Date(year, month, 1)
    const startDow = (firstDay.getDay() + 6) % 7
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
        display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
        gap: 1, background: 'var(--kujua-gray-200)',
        border: '1px solid var(--kujua-gray-200)', borderRadius: 16, overflow: 'hidden',
      }}>
        {DAY_SHORTS.map((d) => (
          <div key={d} style={{
            background: 'var(--kujua-gray-50)', padding: '10px 4px',
            textAlign: 'center', fontSize: '0.72rem', fontWeight: 700,
            color: 'var(--kujua-gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em',
          }}>
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          if (!day) {
            return <div key={`e-${i}`} style={{ background: 'var(--kujua-gray-50)', minHeight: 56 }} />
          }
          const date = new Date(year, month, day)
          const isToday = sameDay(date, today)
          const isPast = date < today && !isToday
          const ymd = toYMD(date)
          const dayEvts = events.filter(e => e.date === ymd)

          return (
            <button
              key={i}
              type="button"
              onClick={() => onDayClick(date)}
              style={{
                all: 'unset', cursor: 'pointer',
                background: isToday ? 'rgba(13,78,92,0.06)' : 'var(--kujua-white)',
                minHeight: 56, padding: '8px 6px',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 3,
                opacity: isPast ? 0.5 : 1,
              }}
            >
              <span style={{
                width: 26, height: 26, borderRadius: '50%',
                background: isToday ? 'var(--kujua-primary-teal)' : 'transparent',
                color: isToday ? 'white' : 'var(--kujua-charcoal)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: isToday ? 700 : 500, fontSize: '0.8125rem',
                flexShrink: 0,
              }}>
                {day}
              </span>
              {dayEvts.slice(0, 2).map(ev => (
                <span key={ev.id} style={{
                  width: '100%', padding: '2px 4px', borderRadius: 4,
                  background: 'var(--kujua-primary-teal)', color: 'white',
                  fontSize: '0.62rem', fontWeight: 600,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {ev.title}
                </span>
              ))}
              {dayEvts.length > 2 && (
                <span style={{ fontSize: '0.62rem', color: 'var(--kujua-gray-500)' }}>
                  +{dayEvts.length - 2} more
                </span>
              )}
            </button>
          )
        })}
      </div>
      <p style={{ margin: '10px 0 0', fontSize: '0.78rem', color: 'var(--kujua-gray-400)', textAlign: 'center' }}>
        Tap a day to view details and add events
      </p>
    </div>
  )
}

// ── Main calendar ─────────────────────────────────────────────────────────────
export default function CalendarView() {
  const [view, setView] = useState<View>('week')
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    const d = new Date(); d.setHours(0, 0, 0, 0); return d
  })
  const [events, setEvents] = useState<CalEvent[]>([])
  const [showModal, setShowModal] = useState(false)
  const [modalDate, setModalDate] = useState<Date>(new Date())
  const [modalHour, setModalHour] = useState<number | null>(null)

  const today = useMemo(() => {
    const d = new Date(); d.setHours(0, 0, 0, 0); return d
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
  function goToday() { setCurrentDate(new Date(today)) }

  const weekDays = useMemo(() => {
    const start = mondayOf(currentDate)
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start); d.setDate(start.getDate() + i); return d
    })
  }, [currentDate])

  const title = useMemo(() => {
    if (view === 'day') {
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
      }).format(currentDate)
    }
    if (view === 'week') {
      const s = weekDays[0], e = weekDays[6]
      if (s.getMonth() === e.getMonth()) {
        return `${MONTH_NAMES[s.getMonth()]} ${s.getDate()}–${e.getDate()}, ${s.getFullYear()}`
      }
      return `${MONTH_NAMES[s.getMonth()]} ${s.getDate()} – ${MONTH_NAMES[e.getMonth()]} ${e.getDate()}`
    }
    return `${MONTH_NAMES[currentDate.getMonth()]} ${currentDate.getFullYear()}`
  }, [view, currentDate, weekDays])

  function openModal(date: Date, hour?: number) {
    setModalDate(date)
    setModalHour(hour ?? null)
    setShowModal(true)
  }

  function handleDayClick(d: Date) {
    setCurrentDate(d); setView('day')
  }

  function handleSlotClick(hour: number) {
    openModal(currentDate, hour)
  }

  function handleSaveEvent(evt: CalEvent) {
    // Pre-fill time from slot click
    const saved = modalHour !== null
      ? {
          ...evt,
          startTime: `${String(modalHour).padStart(2, '0')}:00`,
          endTime: `${String(modalHour + 1).padStart(2, '0')}:00`,
        }
      : evt
    setEvents((prev) => [...prev, saved])
    setShowModal(false)
    setModalHour(null)
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
          padding: 14px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
        .cal-view-group { display: flex; gap: 6px; }
        .cal-view-btn {
          padding: 9px 18px; border-radius: 9999px;
          border: 1px solid var(--kujua-gray-200);
          background: var(--kujua-white); color: var(--kujua-gray-700);
          font-weight: 600; font-size: 0.875rem; cursor: pointer;
          transition: background 0.15s, color 0.15s; white-space: nowrap;
        }
        .cal-view-btn:hover { background: var(--kujua-gray-100); }
        .cal-view-btn-active {
          background: var(--kujua-primary-teal);
          border-color: var(--kujua-primary-teal); color: white;
        }
        .cal-view-btn-active:hover { opacity: 0.9; background: var(--kujua-primary-teal); }
        .cal-nav { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
        .cal-nav-arrow {
          width: 36px; height: 36px; border-radius: 10px;
          border: 1px solid var(--kujua-gray-200); background: var(--kujua-white);
          color: var(--kujua-charcoal); font-size: 1.1rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.12s;
        }
        .cal-nav-arrow:hover { background: var(--kujua-gray-100); }
        .cal-nav-title {
          font-weight: 600; font-size: 0.9rem;
          color: var(--kujua-charcoal); white-space: nowrap;
          min-width: 140px; text-align: center;
        }
        .cal-today-btn {
          padding: 7px 14px; border-radius: 9999px;
          border: 1px solid var(--kujua-gray-200); background: var(--kujua-white);
          color: var(--kujua-gray-700); font-weight: 600; font-size: 0.8125rem;
          cursor: pointer; white-space: nowrap; transition: background 0.12s;
        }
        .cal-today-btn:hover { background: var(--kujua-gray-100); }
        .cal-add-btn {
          padding: 9px 18px; border-radius: 9999px;
          background: var(--kujua-orange); border: none;
          color: white; font-weight: 700; font-size: 0.875rem;
          cursor: pointer; white-space: nowrap; transition: opacity 0.12s;
          flex-shrink: 0;
        }
        .cal-add-btn:hover { opacity: 0.88; }

        /* Card */
        .cal-card {
          background: var(--kujua-white);
          border: 1px solid var(--kujua-gray-200);
          border-radius: 20px; padding: 20px;
        }

        /* Week view responsive */
        .cal-week-desktop { display: block; }
        .cal-week-mobile  { display: none; }

        /* Bottom panels */
        .cal-bottom-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 16px;
        }

        /* Responsive breakpoints */
        @media (max-width: 768px) {
          .cal-bottom-grid { grid-template-columns: 1fr; }
          .cal-card { padding: 14px; }
          .cal-toolbar { padding: 12px 14px; }
          .cal-nav-title { min-width: 110px; font-size: 0.82rem; }
        }
        @media (max-width: 640px) {
          .cal-week-desktop { display: none !important; }
          .cal-week-mobile  { display: block !important; }
        }
        @media (max-width: 540px) {
          .cal-toolbar { flex-direction: column; align-items: stretch; }
          .cal-view-group { justify-content: center; }
          .cal-nav { justify-content: center; }
          .cal-view-btn { flex: 1; text-align: center; padding: 9px 8px; }
          .cal-add-btn { width: 100%; justify-content: center; }
        }
      `}</style>

      {showModal && (
        <CreateEventModal
          initialDate={modalDate}
          onClose={() => { setShowModal(false); setModalHour(null) }}
          onSave={handleSaveEvent}
        />
      )}

      <div className="cal-shell">
        {/* Toolbar */}
        <div className="cal-toolbar">
          <div className="cal-view-group">
            {(['day','week','month'] as View[]).map((v) => (
              <button
                key={v} type="button"
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
          <button type="button" className="cal-add-btn" onClick={() => openModal(currentDate)}>
            + New event
          </button>
        </div>

        {/* Calendar view */}
        <div className="cal-card">
          {view === 'day' && (
            <DayView date={currentDate} today={today} events={events} onSlotClick={handleSlotClick} />
          )}
          {view === 'week' && (
            <WeekView days={weekDays} today={today} events={events} onDayClick={handleDayClick} onAddEvent={openModal} />
          )}
          {view === 'month' && (
            <MonthView currentDate={currentDate} today={today} events={events} onDayClick={handleDayClick} />
          )}
        </div>

        {/* Bottom info panels */}
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
