import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BookingsRepository } from '../repositories/bookings.repository';
import { BookingMapper } from '../mappers/booking.mapper';
import { DomainException } from '../../../shared/exceptions/domain.exception';
import { randomBytes } from 'crypto';
import { BookingHoldsService } from '../../booking-holds/services/booking-holds.service';
import { EventTypesService } from '../../event-types/services/event-types.service';
import { ClientsService } from '../../clients/services/clients.service';
import { PaymentsService } from '../../payments/services/payments.service';

@Injectable()
export class BookingConfirmationService {
  constructor(
    private readonly repo: BookingsRepository,
    private readonly bookingHoldsService: BookingHoldsService,
    private readonly eventTypesService: EventTypesService,
    private readonly clientsService: ClientsService,
    private readonly paymentsService: PaymentsService,
  ) {}

  async confirmFromHold(workspaceId: string | undefined, holdId: string, payment?: any) {
    const existing = await this.repo.findByHoldId(holdId);
    if (existing) return BookingMapper.toPublicConfirmation(existing);

    const hold = await this.bookingHoldsService.findById(holdId);
    if (!hold || hold.status !== 'active' || hold.expiresAt < new Date()) {
      throw new NotFoundException('Hold not found or expired.');
    }
    if (!hold.formCompleted || !hold.client?.fullName || !hold.client?.email) {
      throw new BadRequestException('Client details are required before confirming the booking.');
    }

    const eventType = await this.eventTypesService.findById(hold.eventTypeId);
    const bookingWorkspaceId = workspaceId || hold.workspaceId || eventType.workspaceId;
    const conflicts = await this.repo.findConflicts(bookingWorkspaceId, hold.startAt, hold.endAt);
    if (conflicts.length > 0) throw new DomainException('This slot is no longer available.');

    const paymentConfig = eventType.payment ?? { mode: 'free', amount: null, currency: 'USD' };
    const amount = paymentConfig.mode === 'free' ? 0 : Number(paymentConfig.amount ?? 0);
    const client = await this.clientsService.findOrCreate(bookingWorkspaceId, {
      fullName: hold.client.fullName,
      email: hold.client.email,
      phone: hold.client.phone,
    });
    const reference = `KT-${Date.now().toString(36).toUpperCase()}`;
    const token = randomBytes(16).toString('hex');

    const booking = await this.repo.create({
      workspaceId: bookingWorkspaceId,
      holdId,
      reference,
      publicBookingToken: token,
      status: eventType.requiresApproval ? 'pending_approval' : 'upcoming',
      paymentStatus: amount > 0 ? (payment ? 'paid' : 'unpaid') : 'paid',
      startAt: hold.startAt,
      endAt: hold.endAt,
      timezone: hold.timezone,
      eventTypeId: eventType.id,
      eventTypeName: eventType.name,
      clientId: client.id,
      clientName: hold.client.fullName,
      clientEmail: hold.client.email,
      amount,
      currency: paymentConfig.currency ?? 'USD',
      meetingLocation: (eventType.locations ?? [])[0],
      notes: hold.client.notes,
      formResponses: hold.answers ?? {},
      source: 'public',
      paymentId: payment?.id,
    });

    await this.bookingHoldsService.consume(holdId);
    if (payment?.id) {
      await this.paymentsService.markSucceeded(payment.id, {
        bookingId: booking.id,
        clientId: client.id,
        clientName: hold.client.fullName,
      });
    }

    return BookingMapper.toPublicConfirmation(booking);
  }

  async confirmFree(holdId: string) {
    return this.confirmFromHold(undefined, holdId);
  }

  async confirmPaid(paymentAttemptId: string) {
    const payment = await this.paymentsService.findById(paymentAttemptId);
    if (!payment.holdId) throw new BadRequestException('Payment is not attached to a booking hold.');
    return this.confirmFromHold(payment.workspaceId, payment.holdId, payment);
  }
}
