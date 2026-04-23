import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Payment } from '../schemas/payment.schema';

@Injectable()
export class PaymentsRepository {
  constructor(@InjectModel(Payment.name) private readonly model: Model<Payment>) {}

  async findByWorkspace(workspaceId: string, filters: any = {}) {
    const query: FilterQuery<Payment> = { workspaceId };
    if (filters.status) query.status = filters.status;
    if (filters.provider) query.provider = filters.provider;
    if (filters.search) query.reference = { $regex: filters.search, $options: 'i' };
    const page = filters.page ?? 1;
    const pageSize = filters.pageSize ?? 20;
    const [items, total] = await Promise.all([
      this.model.find(query).sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize).exec(),
      this.model.countDocuments(query).exec(),
    ]);
    return { items, total, page, pageSize };
  }

  async findById(id: string) { return this.model.findById(id).exec(); }
  async findByReference(ref: string) { return this.model.findOne({ reference: ref }).exec(); }
  async findByHoldId(holdId: string) { return this.model.findOne({ holdId }).exec(); }
  async create(data: Partial<Payment>) { return this.model.create(data); }
  async updateById(id: string, data: Partial<Payment>) { return this.model.findByIdAndUpdate(id, data, { new: true }).exec(); }
}
