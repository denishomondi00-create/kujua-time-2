import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingsRepository } from '../repositories/bookings.repository';
import { CancelBookingDto } from '../dto/cancel-booking.dto';
import { canTransitionTo } from '../domain/value-objects/booking-status.vo';
import { DomainException } from '../../../shared/exceptions/domain.exception';

@Injectable()
export class BookingCancellationService {
  constructor(private readonly repo: BookingsRepository) {}

  async cancel(bookingId: string, dto: CancelBookingDto) {
    const booking = await this.repo.findById(bookingId);
    if (!booking) throw new NotFoundException('Booking not found.');
    if (!canTransitionTo(booking.status as any, 'canceled')) {
      throw new DomainException('This booking cannot be canceled.');
    }
    return this.repo.updateById(bookingId, { status: 'canceled', canceledAt: new Date(), cancelReason: dto.reason });
  }

  async approve(bookingId: string) {
    const booking = await this.repo.findById(bookingId);
    if (!booking) throw new NotFoundException('Booking not found.');
    if (booking.status !== 'pending_approval') throw new DomainException('Only pending bookings can be approved.');
    return this.repo.updateById(bookingId, { status: 'upcoming' });
  }

  async complete(bookingId: string) {
    const booking = await this.repo.findById(bookingId);
    if (!booking) throw new NotFoundException('Booking not found.');
    if (!canTransitionTo(booking.status as any, 'completed')) throw new DomainException('This booking cannot be completed.');
    return this.repo.updateById(bookingId, { status: 'completed', completedAt: new Date() });
  }

  async markNoShow(bookingId: string) {
    const booking = await this.repo.findById(bookingId);
    if (!booking) throw new NotFoundException('Booking not found.');
    if (!canTransitionTo(booking.status as any, 'no_show')) throw new DomainException('This booking cannot be marked as no-show.');
    return this.repo.updateById(bookingId, { status: 'no_show', noShowAt: new Date() });
  }

  async cancelByToken(token: string, reason?: string) {
    const booking = await this.repo.findByToken(token);
    if (!booking) throw new NotFoundException('Booking not found.');
    return this.cancel(booking.id, { reason });
  }
}
