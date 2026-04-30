import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BookingHoldsRepository } from '../repositories/booking-holds.repository';
import { EventTypesService } from '../../event-types/services/event-types.service';
import { CreateBookingHoldDto } from '../dto/create-booking-hold.dto';
import { UpdateBookingHoldDto } from '../dto/update-booking-hold.dto';

const HOLD_TTL_MS = 10 * 60 * 1000; // 10 minutes

@Injectable()
export class BookingHoldsService {
  constructor(
    private readonly repo: BookingHoldsRepository,
    private readonly eventTypesService: EventTypesService,
  ) {}

  async create(data: CreateBookingHoldDto) {
    const eventType = await this.eventTypesService.findById(data.publicEventId);
    const startAt = new Date(data.startAt);
    const endAt = new Date(data.endAt);
    if (Number.isNaN(startAt.getTime()) || Number.isNaN(endAt.getTime()) || endAt <= startAt) {
      throw new BadRequestException('Choose a valid booking time.');
    }

    return this.repo.create({
      workspaceId: eventType.workspaceId,
      eventTypeId: data.publicEventId,
      startAt,
      endAt,
      timezone: data.timezone,
      expiresAt: new Date(Date.now() + HOLD_TTL_MS),
      status: 'active',
    });
  }

  async updateDetails(holdId: string, details: UpdateBookingHoldDto) {
    const hold = await this.repo.findById(holdId);
    if (!hold || hold.status !== 'active') throw new NotFoundException('Hold not found or expired.');
    if (hold.expiresAt < new Date()) throw new NotFoundException('Hold not found or expired.');

    const { answers, ...client } = details;
    return this.repo.updateById(holdId, { client, formCompleted: true, answers });
  }

  async findById(id: string) { return this.repo.findById(id); }
  async consume(id: string) { return this.repo.consume(id); }
}
