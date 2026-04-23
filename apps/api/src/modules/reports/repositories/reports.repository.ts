import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReportSnapshot } from '../schemas/report-snapshot.schema';
@Injectable()
export class ReportsRepository {
  constructor(@InjectModel(ReportSnapshot.name) private readonly model: Model<ReportSnapshot>) {}
  async findMany(filter: Record<string, unknown> = {}) { return this.model.find(filter).sort({ createdAt: -1 }).exec(); }
  async create(data: Partial<ReportSnapshot>) { return this.model.create(data); }
}
