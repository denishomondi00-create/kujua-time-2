import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { EventType } from '../schemas/event-type.schema';

@Injectable()
export class EventTypesRepository {
  constructor(@InjectModel(EventType.name) private readonly model: Model<EventType>) {}

  async findByWorkspace(workspaceId: string, filters: { status?: string; search?: string; page?: number; pageSize?: number } = {}) {
    const query: FilterQuery<EventType> = { workspaceId };
    if (filters.status) query.status = filters.status;
    if (filters.search) query.name = { $regex: filters.search, $options: 'i' };
    const page = filters.page ?? 1;
    const pageSize = filters.pageSize ?? 20;
    const [items, total] = await Promise.all([
      this.model.find(query).sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize).exec(),
      this.model.countDocuments(query).exec(),
    ]);
    return { items, total, page, pageSize };
  }

  async findById(id: string) { return this.model.findById(id).exec(); }
  async findBySlug(workspaceId: string, slug: string) { return this.model.findOne({ workspaceId, slug }).exec(); }
  async create(data: Partial<EventType>) { return this.model.create(data); }
  async updateById(id: string, data: Partial<EventType>) { return this.model.findByIdAndUpdate(id, data, { new: true }).exec(); }
  async deleteById(id: string) { return this.model.findByIdAndDelete(id).exec(); }
}
