import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Client } from '../schemas/client.schema';

@Injectable()
export class ClientsRepository {
  constructor(@InjectModel(Client.name) private readonly model: Model<Client>) {}

  async findByWorkspace(workspaceId: string, filters: any = {}) {
    const query: FilterQuery<Client> = { workspaceId };
    if (filters.stage) query.stage = filters.stage;
    if (filters.search) query.$or = [{ fullName: { $regex: filters.search, $options: 'i' } }, { email: { $regex: filters.search, $options: 'i' } }];
    const page = filters.page ?? 1;
    const pageSize = filters.pageSize ?? 20;
    const [items, total] = await Promise.all([
      this.model.find(query).sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize).exec(),
      this.model.countDocuments(query).exec(),
    ]);
    return { items, total, page, pageSize };
  }

  async findById(id: string) { return this.model.findById(id).exec(); }
  async findByEmail(workspaceId: string, email: string) { return this.model.findOne({ workspaceId, email: email.toLowerCase() }).exec(); }
  async create(data: Partial<Client>) { return this.model.create(data); }
  async updateById(id: string, data: Partial<Client>) { return this.model.findByIdAndUpdate(id, data, { new: true }).exec(); }
  async findOrCreate(workspaceId: string, data: { email: string; fullName: string; phone?: string }) {
    let client = await this.findByEmail(workspaceId, data.email);
    if (!client) client = await this.create({ ...data, workspaceId });
    return client;
  }
}
