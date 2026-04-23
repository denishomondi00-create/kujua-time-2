import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConnectedCalendar } from '../schemas/connected-calendar.schema';
@Injectable()
export class CalendarsRepository {
  constructor(@InjectModel(ConnectedCalendar.name) private readonly model: Model<ConnectedCalendar>) {}
  async listByWorkspace(workspaceId: string) { return this.model.find({ workspaceId }).sort({ createdAt: -1 }).exec(); }
  async create(data: Partial<ConnectedCalendar>) { return this.model.create(data); }
  async deleteById(id: string) { return this.model.findByIdAndDelete(id).exec(); }
}
