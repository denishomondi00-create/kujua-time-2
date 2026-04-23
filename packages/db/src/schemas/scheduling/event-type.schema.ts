import { Schema, model, Document, Types } from 'mongoose';

export interface IEventType extends Document {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  durationMinutes: number;
  color: string;
  isActive: boolean;
  isArchived: boolean;
  requiresApproval: boolean;
  requiresPayment: boolean;
  price?: number;
  currency: string;
  depositAmount?: number;
  maxBookingsPerDay?: number;
  bufferBeforeMinutes: number;
  bufferAfterMinutes: number;
  minNoticeMinutes: number;
  maxBookingWindowDays: number;
  meetingLocationType: string;
  meetingLocationValue?: string;
  formId?: Types.ObjectId;
  ownerId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const EventTypeSchema = new Schema<IEventType>(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: 'Workspace' },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true },
    description: { type: String },
    durationMinutes: { type: Number, required: true, default: 30 },
    color: { type: String, default: '#0066FF' },
    isActive: { type: Boolean, default: true },
    isArchived: { type: Boolean, default: false },
    requiresApproval: { type: Boolean, default: false },
    requiresPayment: { type: Boolean, default: false },
    price: { type: Number },
    currency: { type: String, default: 'USD' },
    depositAmount: { type: Number },
    maxBookingsPerDay: { type: Number },
    bufferBeforeMinutes: { type: Number, default: 0 },
    bufferAfterMinutes: { type: Number, default: 0 },
    minNoticeMinutes: { type: Number, default: 60 },
    maxBookingWindowDays: { type: Number, default: 60 },
    meetingLocationType: {
      type: String,
      required: true,
      enum: ['in_person', 'zoom', 'google_meet', 'phone', 'whatsapp', 'custom'],
      default: 'google_meet',
    },
    meetingLocationValue: { type: String },
    formId: { type: Schema.Types.ObjectId, ref: 'Form' },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true, collection: 'event_types' },
);

EventTypeSchema.index({ workspaceId: 1, slug: 1 }, { unique: true });
EventTypeSchema.index({ workspaceId: 1, isActive: 1 });

export const EventTypeModel = model<IEventType>('EventType', EventTypeSchema);
export { EventTypeSchema };
