import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationLog } from '../schemas/notification-log.schema';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(NotificationLog.name) private readonly model: Model<NotificationLog>) {}

  async listLogs(workspaceId: string) { return this.model.find({ workspaceId }).sort({ createdAt: -1 }).limit(100).exec(); }
  async findLogById(id: string) { return this.model.findById(id).exec(); }
  async getSettings(workspaceId: string) { return { emailEnabled: true, smsEnabled: false, whatsappEnabled: false }; }
  async updateSettings(workspaceId: string, data: any) { return data; }
}
