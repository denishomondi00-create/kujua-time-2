import { addMinutes, formatISO } from "date-fns"

import {
  type BookingHold,
  type ConfirmedBooking,
  type PublicBookingLookup,
  type PublicBookingPageModel,
  type PublicSlot,
} from "@/features/public-booking/schemas/public-booking.schemas"
import { isoDateOnly } from "@/lib/utils/dates"

export function buildFallbackPublicBookingPageModel(
  workspaceSlug: string,
  pathSegments?: string[],
): PublicBookingPageModel {
  const eventSlug = pathSegments?.[0] ?? "discovery-call"
  const eventName = pathSegments?.[0]
    ? pathSegments[0].replace(/-/g, " ").replace(/\b\w/g, (value) => value.toUpperCase())
    : "Discovery Call"

  return {
    workspace: {
      id: "workspace-demo",
      slug: workspaceSlug,
      name: workspaceSlug.replace(/-/g, " ").replace(/\b\w/g, (value) => value.toUpperCase()),
      tagline: "A polished booking experience for service businesses.",
      timezone: "Africa/Nairobi",
    },
    theme: {
      accentColor: "#0d4e5c",
      accentSoft: "#e87a3e",
      radius: "1.5rem",
      themeClassName: "theme-teal",
    },
    eventType: {
      id: "public-event-demo",
      slug: eventSlug,
      name: eventName,
      description:
        "A focused session to review needs, confirm fit, and move into the right next step with clear expectations.",
      durationMinutes: 30,
      meetingSummary: "Google Meet link shared automatically after booking.",
      locationLabel: "Google Meet",
      pricing: {
        currency: "USD",
        amountMinor: 0,
        paymentMode: "free",
      },
    },
    availabilitySnapshot: {
      date: isoDateOnly(),
      timezone: "Africa/Nairobi",
      slots: buildFallbackSlots(),
    },
    trust: {
      bullets: [
        "Automatic calendar conflict checks before confirmation.",
        "Reminder flows triggered after a confirmed booking.",
        "Client profile created or updated from booking details.",
      ],
      faq: [
        {
          question: "Can I reschedule later?",
          answer: "Yes. Every confirmed booking can expose a secure public token for reschedule and cancel actions.",
        },
        {
          question: "Do I need to pay now?",
          answer: "That depends on the event type. Free, full-payment, and deposit flows are supported.",
        },
      ],
      policies: [
        {
          title: "Rescheduling",
          summary: "Rescheduling is allowed until the booking window closes based on workspace rules.",
        },
        {
          title: "Cancellations",
          summary: "Cancellation policies can be displayed here and enforced through the public cancel flow.",
        },
      ],
    },
  }
}

export function buildFallbackSlots(date = isoDateOnly()): PublicSlot[] {
  const start = new Date(`${date}T09:00:00`)
  return Array.from({ length: 8 }).map((_, index) => {
    const slotStart = addMinutes(start, index * 60)
    const slotEnd = addMinutes(slotStart, 30)

    return {
      startAt: formatISO(slotStart),
      endAt: formatISO(slotEnd),
      label: slotStart.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      available: true,
    }
  })
}

export function buildFallbackHold(slot: PublicSlot, publicEventId: string, timezone: string): BookingHold {
  return {
    id: `hold_${Math.random().toString(36).slice(2, 8)}`,
    expiresAt: formatISO(addMinutes(new Date(), 10)),
    publicEventId,
    timezone,
    startAt: slot.startAt,
    endAt: slot.endAt,
    formCompleted: false,
    client: {},
  }
}

export function buildFallbackConfirmation(model: PublicBookingPageModel, hold: BookingHold): ConfirmedBooking {
  return {
    bookingId: `booking_${Math.random().toString(36).slice(2, 8)}`,
    publicBookingToken: `token_${Math.random().toString(36).slice(2, 10)}`,
    status: "confirmed",
    startAt: hold.startAt,
    endAt: hold.endAt,
    eventName: model.eventType.name,
    clientName: hold.client.fullName,
    clientEmail: hold.client.email,
  }
}

export function buildFallbackLookup(model: PublicBookingPageModel, token: string): PublicBookingLookup {
  const booking = buildFallbackConfirmation(model, buildFallbackHold(model.availabilitySnapshot.slots[0], model.eventType.id, model.workspace.timezone))
  return {
    token,
    booking: {
      ...booking,
      publicBookingToken: token,
    },
    slotOptions: buildFallbackSlots(),
  }
}
