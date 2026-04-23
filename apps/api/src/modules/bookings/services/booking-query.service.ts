import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingsRepository } from '../repositories/bookings.repository';
import { BookingMapper } from '../mappers/booking.mapper';

@Injectable()
export class BookingQueryService {
  constructor(private readonly repo: BookingsRepository) {}

  async list(workspaceId: string, filters?: any) {
    const result = await this.repo.findByWorkspace(workspaceId, filters);
    return { items: result.items.map(BookingMapper.toListItem), total: result.total, page: result.page, pageSize: result.pageSize };
  }

  async findById(id: string) {
    const booking = await this.repo.findById(id);
    if (!booking) throw new NotFoundException('Booking not found.');
    return BookingMapper.toDetail(booking);
  }

  async findByToken(token: string) {
    const booking = await this.repo.findByToken(token);
    if (!booking) throw new NotFoundException('Booking not found.');
    return BookingMapper.toPublicLookup(booking);
  }
}
