import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AvailabilityRule } from '../schemas/availability-rule.schema';
import { AvailabilityException } from '../schemas/availability-exception.schema';

@Injectable()
export class AvailabilityRepository {
  constructor(
    @InjectModel(AvailabilityRule.name) private readonly ruleModel: Model<AvailabilityRule>,
    @InjectModel(AvailabilityException.name) private readonly exceptionModel: Model<AvailabilityException>,
  ) {}

  async findRules(workspaceId: string, eventTypeId?: string) {
    return this.ruleModel.findOne({ workspaceId, eventTypeId: eventTypeId ?? { $exists: false } }).exec();
  }

  async upsertRule(workspaceId: string, eventTypeId: string | undefined, data: Partial<AvailabilityRule>) {
    return this.ruleModel.findOneAndUpdate(
      { workspaceId, eventTypeId: eventTypeId ?? null },
      { $set: { ...data, workspaceId, eventTypeId } },
      { upsert: true, new: true },
    ).exec();
  }

  async findExceptions(workspaceId: string) { return this.exceptionModel.find({ workspaceId }).sort({ date: 1 }).exec(); }
  async createException(data: Partial<AvailabilityException>) { return this.exceptionModel.create(data); }
  async deleteException(id: string) { return this.exceptionModel.findByIdAndDelete(id).exec(); }
}
