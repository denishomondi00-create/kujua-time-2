import { Injectable } from '@nestjs/common';
import { BookingsRepository } from '../repositories/bookings.repository';
import { BookingConfirmationService } from './booking-confirmation.service';
import { BookingCancellationService } from './booking-cancellation.service';
import { BookingRescheduleService } from './booking-reschedule.service';
import { BookingQueryService } from './booking-query.service';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { CancelBookingDto } from '../dto/cancel-booking.dto';
import { RescheduleBookingDto } from '../dto/reschedule-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    private readonly repo: BookingsRepository,
    private readonly confirmation: BookingConfirmationService,
    private readonly cancellation: BookingCancellationService,
    private readonly reschedule: BookingRescheduleService,
    private readonly query: BookingQueryService,
  ) {}

  async list(workspaceId: string, filters?: any) { return this.query.list(workspaceId, filters); }
  async findById(id: string) { return this.query.findById(id); }
  async findByToken(token: string) { return this.query.findByToken(token); }

  async createFromHold(workspaceId: string, holdId: string) {
    return this.confirmation.confirmFromHold(workspaceId, holdId);
  }

  async confirmFree(holdId: string) { return this.confirmation.confirmFree(holdId); }
  async confirmPaid(paymentAttemptId: string) { return this.confirmation.confirmPaid(paymentAttemptId); }

  async cancel(bookingId: string, dto: CancelBookingDto) { return this.cancellation.cancel(bookingId, dto); }
  async approve(bookingId: string) { return this.cancellation.approve(bookingId); }
  async complete(bookingId: string) { return this.cancellation.complete(bookingId); }
  async markNoShow(bookingId: string) { return this.cancellation.markNoShow(bookingId); }

  async rescheduleBooking(bookingId: string, dto: RescheduleBookingDto) { return this.reschedule.reschedule(bookingId, dto); }
  async rescheduleByToken(token: string, dto: RescheduleBookingDto) { return this.reschedule.rescheduleByToken(token, dto); }
  async cancelByToken(token: string, reason?: string) { return this.cancellation.cancelByToken(token, reason); }
}
