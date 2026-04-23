import { Schema, model, Document, Types } from 'mongoose';

export interface IConnectedCalendar extends Document {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  userId: Types.ObjectId;
  provider: string;
  providerAccountId: string;
  providerEmail: string;
  calendarId: string;
  calendarName: string;
  accessTokenEncrypted: string;
  refreshTokenEncrypted: string;
  tokenExpiresAt: Date;
  isPrimary: boolean;
  isSyncEnabled: boolean;
  isWriteEnabled: boolean;
  connectedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ConnectedCalendarSchema = new Schema<IConnectedCalendar>(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: 'Workspace' },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    provider: { type: String, required: true, enum: ['google', 'outlook'] },
    providerAccountId: { type: String, required: true },
    providerEmail: { type: String, required: true },
    calendarId: { type: String, required: true },
    calendarName: { type: String, required: true },
    accessTokenEncrypted: { type: String, required: true },
    refreshTokenEncrypted: { type: String, required: true },
    tokenExpiresAt: { type: Date, required: true },
    isPrimary: { type: Boolean, default: false },
    isSyncEnabled: { type: Boolean, default: true },
    isWriteEnabled: { type: Boolean, default: false },
    connectedAt: { type: Date, default: Date.now },
  },
  { timestamps: true, collection: 'connected_calendars' },
);

ConnectedCalendarSchema.index({ workspaceId: 1 });
ConnectedCalendarSchema.index({ userId: 1, provider: 1, calendarId: 1 }, { unique: true });

export const ConnectedCalendarModel = model<IConnectedCalendar>('ConnectedCalendar', ConnectedCalendarSchema);
export { ConnectedCalendarSchema };
