import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingHoldsRepository } from '../repositories/booking-holds.repository';

const HOLD_TTL_MS = 10 * 60 * 1000; // 10 minutes

@Injectable()
export class BookingHoldsService {
  constructor(private readonly repo: BookingHoldsRepository) {}

  async create(data: { publicEventId: string; timezone: string; startAt: string; endAt: string; workspaceId?: string }) {
    return this.repo.create({
      workspaceId: data.workspaceId ?? '',
      eventTypeId: data.publicEventId,
      startAt: new Date(data.startAt),
      endAt: new Date(data.endAt),
      timezone: data.timezone,
      expiresAt: new Date(Date.now() + HOLD_TTL_MS),
      status: 'active',
    });
  }

  async updateDetails(holdId: string, details: any) {
    const hold = await this.repo.findById(holdId);
    if (!hold || hold.status !== 'active') throw new NotFoundException('Hold not found or expired.');
    return this.repo.updateById(holdId, { client: details, formCompleted: true, answers: details.answers });
  }

  async findById(id: string) { return this.repo.findById(id); }
  async consume(id: string) { return this.repo.consume(id); }
}
