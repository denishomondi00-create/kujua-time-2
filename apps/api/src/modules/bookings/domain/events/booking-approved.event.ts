export class BookingApprovedEvent {
  static readonly EVENT_NAME = 'booking.approved';
  constructor(
    public readonly bookingId: string,
    public readonly workspaceId: string,
    public readonly clientId: string,
    public readonly eventTypeId: string,
    public readonly occurredAt: Date = new Date(),
  ) {}
}
