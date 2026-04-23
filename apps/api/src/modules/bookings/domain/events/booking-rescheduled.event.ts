export class BookingRescheduledEvent {
  static readonly EVENT_NAME = 'booking.rescheduled';
  constructor(
    public readonly bookingId: string,
    public readonly workspaceId: string,
    public readonly clientId: string,
    public readonly eventTypeId: string,
    public readonly previousStartAt: Date,
    public readonly newStartAt: Date,
    public readonly occurredAt: Date = new Date(),
  ) {}
}
