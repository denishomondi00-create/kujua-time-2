export class BookingCanceledEvent {
  static readonly EVENT_NAME = 'booking.canceled';
  constructor(
    public readonly bookingId: string,
    public readonly workspaceId: string,
    public readonly clientId: string,
    public readonly eventTypeId: string,
    public readonly reason?: string,
    public readonly occurredAt: Date = new Date(),
  ) {}
}
