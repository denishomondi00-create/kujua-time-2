import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery, ClientSession } from 'mongoose';
import { Booking } from '../schemas/booking.schema';

@Injectable()
export class BookingsRepository {
  constructor(@InjectModel(Booking.name) private readonly model: Model<Booking>) {}

  async findByWorkspace(workspaceId: string, filters: { status?: string; search?: string; page?: number; pageSize?: number } = {}) {
    const query: FilterQuery<Booking> = { workspaceId };
    if (filters.status) query.status = filters.status;
    if (filters.search) {
      query.$or = [
        { clientName: { $regex: filters.search, $options: 'i' } },
        { clientEmail: { $regex: filters.search, $options: 'i' } },
        { reference: { $regex: filters.search, $options: 'i' } },
      ];
    }
    const page = filters.page ?? 1;
    const pageSize = filters.pageSize ?? 20;
    const [items, total] = await Promise.all([
      this.model.find(query).sort({ startAt: -1 }).skip((page - 1) * pageSize).limit(pageSize).exec(),
      this.model.countDocuments(query).exec(),
    ]);
    return { items, total, page, pageSize };
  }

  async findById(id: string) { return this.model.findById(id).exec(); }
  async findByToken(token: string) { return this.model.findOne({ publicBookingToken: token }).exec(); }
  async findByHoldId(holdId: string) { return this.model.findOne({ holdId }).exec(); }

  async findConflicts(workspaceId: string, startAt: Date, endAt: Date, excludeId?: string) {
    const query: FilterQuery<Booking> = {
      workspaceId,
      status: { $in: ['upcoming', 'pending_approval'] },
      startAt: { $lt: endAt },
      endAt: { $gt: startAt },
    };
    if (excludeId) query._id = { $ne: excludeId };
    return this.model.find(query).exec();
  }

  async create(data: Partial<Booking>, session?: ClientSession) { return this.model.create([data], { session }).then(r => r[0]); }
  async updateById(id: string, data: Partial<Booking>) { return this.model.findByIdAndUpdate(id, data, { new: true }).exec(); }
  async countByWorkspace(workspaceId: string, filters?: FilterQuery<Booking>) { return this.model.countDocuments({ workspaceId, ...filters }).exec(); }

  async startSession(): Promise<ClientSession> {
  return this.model.db.startSession()
}
}
