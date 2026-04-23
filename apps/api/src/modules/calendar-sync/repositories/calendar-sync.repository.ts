import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CalendarSyncState } from '../schemas/calendar-sync-state.schema';
@Injectable()
export class CalendarSyncRepository {
  constructor(@InjectModel(CalendarSyncState.name) private readonly model: Model<CalendarSyncState>) {}
  async findByConnectedCalendarId(connectedCalendarId: string) { return this.model.findOne({ connectedCalendarId }).exec(); }
  async upsertState(connectedCalendarId: string, data: Record<string, unknown>) {
    return this.model.findOneAndUpdate({ connectedCalendarId }, { $set: { ...data, connectedCalendarId } }, { upsert: true, new: true }).exec();
  }
}
