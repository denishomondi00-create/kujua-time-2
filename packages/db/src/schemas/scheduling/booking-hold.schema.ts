import { Schema, model, Document, Types } from 'mongoose';

export interface IBookingHold extends Document {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  eventTypeId: Types.ObjectId;
  startAt: Date;
  endAt: Date;
  clientEmail?: string;
  clientName?: string;
  formData?: Record<string, unknown>;
  status: string;
  expiresAt: Date;
  createdAt: Date;
}

const BookingHoldSchema = new Schema<IBookingHold>(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: 'Workspace' },
    eventTypeId: { type: Schema.Types.ObjectId, required: true, ref: 'EventType' },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    clientEmail: { type: String, lowercase: true, trim: true },
    clientName: { type: String, trim: true },
    formData: { type: Schema.Types.Mixed },
    status: { type: String, default: 'active', enum: ['active', 'consumed', 'expired'] },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true, collection: 'booking_holds' },
);

// TTL: auto-expire uncompleted holds
BookingHoldSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
BookingHoldSchema.index({ workspaceId: 1, eventTypeId: 1, startAt: 1 });

export const BookingHoldModel = model<IBookingHold>('BookingHold', BookingHoldSchema);
export { BookingHoldSchema };
