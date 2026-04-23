import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingsRepository } from '../repositories/bookings.repository';
import { BookingMapper } from '../mappers/booking.mapper';
import { DomainException } from '../../../shared/exceptions/domain.exception';
import { randomBytes } from 'crypto';

@Injectable()
export class BookingConfirmationService {
  constructor(private readonly repo: BookingsRepository) {}

  async confirmFromHold(workspaceId: string, holdId: string) {
    // Production: within transaction — read hold, verify slot, create booking + client + domain event, consume hold
    const reference = `KT-${Date.now().toString(36).toUpperCase()}`;
    const token = randomBytes(16).toString('hex');

    const booking = await this.repo.create({
      workspaceId,
      holdId,
      reference,
      publicBookingToken: token,
      status: 'upcoming',
      paymentStatus: 'unpaid',
      startAt: new Date(),
      endAt: new Date(Date.now() + 30 * 60_000),
      timezone: 'Africa/Nairobi',
      eventTypeId: '',
      eventTypeName: '',
      clientId: '',
      clientName: '',
      clientEmail: '',
      currency: 'USD',
      source: 'public',
    });

    return BookingMapper.toPublicConfirmation(booking);
  }

  async confirmFree(holdId: string) {
    // Placeholder — in production: validate hold, run transactional confirmation
    return this.confirmFromHold('', holdId);
  }

  async confirmPaid(paymentAttemptId: string) {
    // Placeholder — in production: verify payment, then transactional confirmation
    return { bookingId: '', publicBookingToken: '', status: 'confirmed', startAt: '', endAt: '', eventName: '' };
  }
}
