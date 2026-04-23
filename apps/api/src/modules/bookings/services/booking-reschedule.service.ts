import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingsRepository } from '../repositories/bookings.repository';
import { RescheduleBookingDto } from '../dto/reschedule-booking.dto';
import { DomainException } from '../../../shared/exceptions/domain.exception';

@Injectable()
export class BookingRescheduleService {
  constructor(private readonly repo: BookingsRepository) {}

  async reschedule(bookingId: string, dto: RescheduleBookingDto) {
    const booking = await this.repo.findById(bookingId);
    if (!booking) throw new NotFoundException('Booking not found.');
    if (booking.status !== 'upcoming') throw new DomainException('Only upcoming bookings can be rescheduled.');

    const conflicts = await this.repo.findConflicts(booking.workspaceId, new Date(dto.startAt), new Date(dto.endAt), bookingId);
    if (conflicts.length > 0) throw new DomainException('The new time conflicts with an existing booking.');

    return this.repo.updateById(bookingId, {
      startAt: new Date(dto.startAt),
      endAt: new Date(dto.endAt),
      timezone: dto.timezone,
    });
  }

  async rescheduleByToken(token: string, dto: RescheduleBookingDto) {
    const booking = await this.repo.findByToken(token);
    if (!booking) throw new NotFoundException('Booking not found.');
    return this.reschedule(booking.id, dto);
  }
}
