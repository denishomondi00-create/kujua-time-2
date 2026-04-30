"use client"

import { useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"

import { AlertBanner } from "@/components/feedback/alert-banner"
import { LoadingState } from "@/components/feedback/loading-state"
import { useCreateBookingHoldMutation } from "@/features/public-booking/mutations"
import { usePublicSlotsQuery } from "@/features/public-booking/queries"
import type { BookingHold, PublicSlot } from "@/features/public-booking/schemas/public-booking.schemas"

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

function getTodayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

function getMaxStr() {
  const d = new Date()
  d.setDate(d.getDate() + 60)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

function toDateStr(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`
}

function parseDateStr(str: string) {
  const [y, m, d] = str.split("-").map(Number)
  return { year: y, month: m - 1, day: d }
}

function formatDayLabel(year: number, month: number, day: number) {
  return new Date(year, month, day).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })
}

export function SlotPicker({
  publicEventId,
  date,
  initialDate,
  timezone,
  initialSlots,
  selectedSlot,
  onDateChange,
  onSelectedSlotChange,
  onHoldCreated,
}: {
  publicEventId: string
  date: string
  initialDate: string
  timezone: string
  initialSlots: PublicSlot[]
  selectedSlot: PublicSlot | null
  onDateChange: (value: string) => void
  onSelectedSlotChange: (slot: PublicSlot | null) => void
  onHoldCreated: (hold: BookingHold) => void
}) {
  const { year: initYear, month: initMonth } = parseDateStr(date)
  const [viewYear, setViewYear] = useState(initYear)
  const [viewMonth, setViewMonth] = useState(initMonth)

  const today = getTodayStr()
  const maxDate = getMaxStr()

  const slotsQuery = usePublicSlotsQuery({ publicEventId, date, timezone })
  const createHold = useCreateBookingHoldMutation()

  const slots = useMemo(() => {
    if (slotsQuery.data && !slotsQuery.isPlaceholderData) return slotsQuery.data
    if (date === initialDate) return initialSlots
    return []
  }, [date, initialDate, initialSlots, slotsQuery.data, slotsQuery.isPlaceholderData])

  const availableSlots = useMemo(() => slots.filter((s) => s.available), [slots])

  const selectedSlotIsAvailable = selectedSlot
    ? slots.some((s) => s.startAt === selectedSlot.startAt && s.available)
    : false

  useEffect(() => {
    if (selectedSlotIsAvailable) return
    onSelectedSlotChange(availableSlots[0] ?? null)
  }, [availableSlots, onSelectedSlotChange, selectedSlotIsAvailable])

  // Calendar grid
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstDow = new Date(viewYear, viewMonth, 1).getDay()
  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  const { year: selYear, month: selMonth, day: selDay } = parseDateStr(date)

  function handleDayClick(day: number) {
    const ds = toDateStr(viewYear, viewMonth, day)
    if (ds < today || ds > maxDate) return
    onSelectedSlotChange(null)
    onDateChange(ds)
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11) }
    else setViewMonth((m) => m - 1)
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0) }
    else setViewMonth((m) => m + 1)
  }

  const prevMonthFirst = viewMonth === 0
    ? toDateStr(viewYear - 1, 11, 1)
    : toDateStr(viewYear, viewMonth - 1, 1)
  const nextMonthFirst = viewMonth === 11
    ? toDateStr(viewYear + 1, 0, 1)
    : toDateStr(viewYear, viewMonth + 1, 1)

  const canGoPrev = prevMonthFirst >= today.slice(0, 7) + "-01"
  const canGoNext = nextMonthFirst <= maxDate

  async function continueToDetails() {
    if (!selectedSlot || !selectedSlotIsAvailable) return
    const hold = await createHold.mutateAsync({
      publicEventId,
      timezone,
      startAt: selectedSlot.startAt,
      endAt: selectedSlot.endAt,
    })
    onHoldCreated(hold)
  }

  return (
    <section className="space-y-5">
      {/* Two-panel layout: calendar left, slots right */}
      <div className="grid gap-6 md:grid-cols-[1fr_220px] lg:grid-cols-[1fr_240px]">

        {/* ── Calendar ── */}
        <div className="space-y-3">
          {/* Month navigation */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={prevMonth}
              disabled={!canGoPrev}
              className="rounded-xl p-2 transition hover:bg-[var(--kt-muted)] disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4 text-[var(--kt-muted-foreground)]" />
            </button>
            <span className="text-sm font-semibold text-[var(--kt-foreground)]">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              disabled={!canGoNext}
              className="rounded-xl p-2 transition hover:bg-[var(--kt-muted)] disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4 text-[var(--kt-muted-foreground)]" />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7">
            {WEEKDAYS.map((d) => (
              <div
                key={d}
                className="py-1 text-center text-xs font-semibold uppercase tracking-wide text-[var(--kt-muted-foreground)]"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-y-1">
            {cells.map((day, idx) => {
              if (!day) return <div key={`pad-${idx}`} />
              const ds = toDateStr(viewYear, viewMonth, day)
              const isToday = ds === today
              const isSelected = ds === date
              const isDisabled = ds < today || ds > maxDate

              return (
                <button
                  key={ds}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleDayClick(day)}
                  aria-label={formatDayLabel(viewYear, viewMonth, day)}
                  aria-pressed={isSelected}
                  className="mx-auto flex aspect-square w-9 items-center justify-center rounded-full text-sm font-medium transition"
                  style={{
                    background: isSelected
                      ? "var(--kt-accent)"
                      : isToday
                        ? "color-mix(in srgb, var(--kt-accent) 12%, transparent)"
                        : "transparent",
                    color: isSelected
                      ? "#fff"
                      : isDisabled
                        ? "var(--kt-muted-foreground)"
                        : isToday
                          ? "var(--kt-accent)"
                          : "var(--kt-foreground)",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    opacity: isDisabled ? 0.35 : 1,
                    outline: isToday && !isSelected
                      ? "2px solid color-mix(in srgb, var(--kt-accent) 35%, transparent)"
                      : undefined,
                    outlineOffset: "-2px",
                  }}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Time slots ── */}
        <div className="flex flex-col gap-3">
          <div className="space-y-0.5">
            <div className="text-sm font-semibold text-[var(--kt-foreground)]">
              {formatDayLabel(selYear, selMonth, selDay)}
            </div>
            {!slotsQuery.isFetching && (
              <div className="text-xs text-[var(--kt-muted-foreground)]">
                {availableSlots.length > 0
                  ? `${availableSlots.length} time${availableSlots.length !== 1 ? "s" : ""} available`
                  : "No availability"}
              </div>
            )}
          </div>

          {slotsQuery.isFetching ? (
            <LoadingState label="Loading times…" />
          ) : availableSlots.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--kt-border)] p-6 text-center">
              <Clock className="mb-2 h-6 w-6 text-[var(--kt-muted-foreground)]" />
              <p className="text-sm text-[var(--kt-muted-foreground)]">
                No times available. <br />Try another date.
              </p>
            </div>
          ) : (
            <div className="flex max-h-72 flex-col gap-1.5 overflow-y-auto pr-0.5 md:max-h-80">
              {availableSlots.map((slot) => {
                const isActive = selectedSlot?.startAt === slot.startAt
                return (
                  <button
                    key={slot.startAt}
                    type="button"
                    onClick={() => onSelectedSlotChange(slot)}
                    className="flex w-full items-center gap-2 rounded-xl border px-4 py-2.5 text-left text-sm font-medium transition"
                    style={{
                      borderColor: isActive ? "var(--kt-accent)" : "var(--kt-border)",
                      background: isActive
                        ? "color-mix(in srgb, var(--kt-accent) 10%, var(--kt-panel))"
                        : "var(--kt-panel)",
                      color: isActive ? "var(--kt-accent)" : "var(--kt-foreground)",
                    }}
                  >
                    <Clock className="h-3.5 w-3.5 shrink-0 opacity-70" />
                    {slot.label}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {slotsQuery.isError ? (
        <AlertBanner variant="warning" title="Using cached slot data">
          Could not refresh availability. Visible times may still be bookable.
        </AlertBanner>
      ) : null}

      {createHold.isError ? (
        <AlertBanner variant="danger" title="This time could not be held">
          Please pick another available time and try again.
        </AlertBanner>
      ) : null}

      <div className="flex justify-end border-t border-[var(--kt-border)] pt-4">
        <button
          type="button"
          className="kt-button kt-button-primary w-full sm:w-auto"
          disabled={!selectedSlotIsAvailable || createHold.isPending}
          onClick={continueToDetails}
        >
          {createHold.isPending ? "Holding slot…" : "Continue to details →"}
        </button>
      </div>
    </section>
  )
}
