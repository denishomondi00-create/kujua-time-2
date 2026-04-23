import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationLog } from '../schemas/notification-log.schema';
@Injectable()
export class NotificationsRepository {
  constructor(@InjectModel(NotificationLog.name) private readonly model: Model<NotificationLog>) {}
  async findMany(filter: Record<string, unknown> = {}) { return this.model.find(filter).sort({ createdAt: -1 }).exec(); }
  async create(data: Partial<NotificationLog>) { return this.model.create(data); }
}
