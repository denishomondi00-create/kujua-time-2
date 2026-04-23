import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Invoice } from '../schemas/invoice.schema';

@Injectable()
export class InvoicesRepository {
  constructor(@InjectModel(Invoice.name) private readonly model: Model<Invoice>) {}

  async findByWorkspace(workspaceId: string, filters: any = {}) {
    const query: FilterQuery<Invoice> = { workspaceId };
    if (filters.status) query.status = filters.status;
    const page = filters.page ?? 1; const pageSize = filters.pageSize ?? 20;
    const [items, total] = await Promise.all([
      this.model.find(query).sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize).exec(),
      this.model.countDocuments(query).exec(),
    ]);
    return { items, total, page, pageSize };
  }

  async findById(id: string) { return this.model.findById(id).exec(); }
  async create(data: Partial<Invoice>) { return this.model.create(data); }
  async updateById(id: string, data: Partial<Invoice>) { return this.model.findByIdAndUpdate(id, data, { new: true }).exec(); }
}
