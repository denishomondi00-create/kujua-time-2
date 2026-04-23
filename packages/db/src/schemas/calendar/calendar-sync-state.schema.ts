import { Schema, model, Document, Types } from 'mongoose';

export interface ICalendarSyncState extends Document {
  _id: Types.ObjectId;
  connectedCalendarId: Types.ObjectId;
  syncToken?: string;
  channelId?: string;
  channelExpiration?: Date;
  lastSyncAt?: Date;
  lastFullSyncAt?: Date;
  status: string;
  errorMessage?: string;
  consecutiveErrors: number;
  createdAt: Date;
  updatedAt: Date;
}

const CalendarSyncStateSchema = new Schema<ICalendarSyncState>(
  {
    connectedCalendarId: { type: Schema.Types.ObjectId, required: true, ref: 'ConnectedCalendar', unique: true },
    syncToken: { type: String },
    channelId: { type: String },
    channelExpiration: { type: Date },
    lastSyncAt: { type: Date },
    lastFullSyncAt: { type: Date },
    status: { type: String, default: 'pending', enum: ['pending', 'syncing', 'synced', 'error'] },
    errorMessage: { type: String },
    consecutiveErrors: { type: Number, default: 0 },
  },
  { timestamps: true, collection: 'calendar_sync_states' },
);

export const CalendarSyncStateModel = model<ICalendarSyncState>('CalendarSyncState', CalendarSyncStateSchema);
export { CalendarSyncStateSchema };
