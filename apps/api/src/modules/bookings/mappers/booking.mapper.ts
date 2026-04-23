import { Booking } from '../schemas/booking.schema';

export class BookingMapper {
  static toListItem(doc: Booking) {
    return {
      id: doc.id,
      reference: doc.reference,
      clientName: doc.clientName,
      clientEmail: doc.clientEmail,
      eventTypeName: doc.eventTypeName,
      startAt: doc.startAt.toISOString(),
      endAt: doc.endAt.toISOString(),
      timezone: doc.timezone,
      status: doc.status,
      paymentStatus: doc.paymentStatus,
      amount: doc.amount ?? null,
      currency: doc.currency,
    };
  }

  static toDetail(doc: Booking) {
    return {
      ...this.toListItem(doc),
      notes: doc.notes ?? null,
      meetingLocation: doc.meetingLocation ?? null,
      formResponses: doc.formResponses ?? {},
      timeline: [],
    };
  }

  static toPublicConfirmation(doc: Booking) {
    return {
      bookingId: doc.id,
      publicBookingToken: doc.publicBookingToken,
      status: doc.status === 'upcoming' ? 'confirmed' : doc.status,
      startAt: doc.startAt.toISOString(),
      endAt: doc.endAt.toISOString(),
      eventName: doc.eventTypeName,
      clientName: doc.clientName,
      clientEmail: doc.clientEmail,
    };
  }

  static toPublicLookup(doc: Booking) {
    return {
      token: doc.publicBookingToken,
      booking: this.toPublicConfirmation(doc),
      slotOptions: [],
    };
  }
}
