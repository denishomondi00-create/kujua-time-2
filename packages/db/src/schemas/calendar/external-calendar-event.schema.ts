import { Schema, model, Document, Types } from 'mongoose';

/**
 * Mirror of external busy-time windows. NOT the source of truth for bookings.
 * Used only to check conflicts during slot generation.
 */
export interface IExternalCalendarEvent extends Document {
  _id: Types.ObjectId;
  connectedCalendarId: Types.ObjectId;
  workspaceId: Types.ObjectId;
  providerEventId: string;
  summary?: string;
  startAt: Date;
  endAt: Date;
  isAllDay: boolean;
  status: string;
  transparency: string;
  createdAt: Date;
  updatedAt: Date;
}

const ExternalCalendarEventSchema = new Schema<IExternalCalendarEvent>(
  {
    connectedCalendarId: { type: Schema.Types.ObjectId, required: true, ref: 'ConnectedCalendar' },
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: 'Workspace' },
    providerEventId: { type: String, required: true },
    summary: { type: String },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    isAllDay: { type: Boolean, default: false },
    status: { type: String, default: 'confirmed', enum: ['confirmed', 'tentative', 'cancelled'] },
    transparency: { type: String, default: 'opaque', enum: ['opaque', 'transparent'] },
  },
  { timestamps: true, collection: 'external_calendar_events' },
);

ExternalCalendarEventSchema.index({ connectedCalendarId: 1, providerEventId: 1 }, { unique: true });
ExternalCalendarEventSchema.index({ workspaceId: 1, startAt: 1, endAt: 1 });

export const ExternalCalendarEventModel = model<IExternalCalendarEvent>(
  'ExternalCalendarEvent',
  ExternalCalendarEventSchema,
);
export { ExternalCalendarEventSchema };
