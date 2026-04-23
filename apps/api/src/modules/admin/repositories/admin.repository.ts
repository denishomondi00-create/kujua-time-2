import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminAction } from '../schemas/admin-action.schema';
@Injectable()
export class AdminRepository {
  constructor(@InjectModel(AdminAction.name) private readonly model: Model<AdminAction>) {}
  async create(data: Partial<AdminAction>) { return this.model.create(data); }
  async findMany(filter: Record<string, unknown> = {}) { return this.model.find(filter).sort({ createdAt: -1 }).exec(); }
}
