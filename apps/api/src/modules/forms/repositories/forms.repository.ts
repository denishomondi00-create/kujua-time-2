import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Form } from '../schemas/form.schema';

@Injectable()
export class FormsRepository {
  constructor(@InjectModel(Form.name) private readonly model: Model<Form>) {}

  async findByWorkspace(workspaceId: string, filters: any = {}) {
    const query: FilterQuery<Form> = { workspaceId };
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
  async create(data: Partial<Form>) { return this.model.create(data); }
  async updateById(id: string, data: Partial<Form>) { return this.model.findByIdAndUpdate(id, data, { new: true }).exec(); }
  async deleteById(id: string) { return this.model.findByIdAndDelete(id).exec(); }
}
