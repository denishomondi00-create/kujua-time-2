export class BookingHoldMapper {
  static toResponse(doc: any) {
    if (!doc) return null;
    const value = typeof doc.toObject === 'function' ? doc.toObject() : doc;
    return {
      id: String(value._id ?? value.id ?? ''),
      publicEventId: String(value.eventTypeId ?? value.publicEventId ?? ''),
      ...value,
      _id: undefined,
      __v: undefined,
      eventTypeId: undefined,
      startAt: value.startAt instanceof Date ? value.startAt.toISOString() : value.startAt,
      endAt: value.endAt instanceof Date ? value.endAt.toISOString() : value.endAt,
      expiresAt: value.expiresAt instanceof Date ? value.expiresAt.toISOString() : value.expiresAt,
    };
  }
}
