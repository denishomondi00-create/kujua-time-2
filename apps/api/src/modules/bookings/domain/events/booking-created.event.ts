export class BookingCreatedEvent {
  static readonly EVENT_NAME = 'booking.created';
  constructor(
    public readonly bookingId: string,
    public readonly workspaceId: string,
    public readonly clientId: string,
    public readonly eventTypeId: string,
    public readonly occurredAt: Date = new Date(),
    public readonly metadata?: Record<string, unknown>,
  ) {}
}
