import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditLog } from '../schemas/audit-log.schema';
@Injectable()
export class AuditRepository {
  constructor(@InjectModel(AuditLog.name) private readonly model: Model<AuditLog>) {}
  async findMany(filter: Record<string, unknown> = {}) { return this.model.find(filter).sort({ createdAt: -1 }).exec(); }
  async create(data: Partial<AuditLog>) { return this.model.create(data); }
}
