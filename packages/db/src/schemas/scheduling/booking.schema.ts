import { Schema, model, Document, Types } from 'mongoose';

export interface IBooking extends Document {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  eventTypeId: Types.ObjectId;
  eventTypeName: string;
  reference: string;
  clientId: Types.ObjectId;
  clientName: string;
  clientEmail: string;
  startAt: Date;
  endAt: Date;
  timezone: string;
  status: string;
  paymentStatus: string;
  amount?: number;
  currency: string;
  meetingLocation?: string;
  notes?: string;
  formResponses?: Record<string, unknown>;
  publicBookingToken: string;
  source: string;
  canceledAt?: Date;
  cancelReason?: string;
  completedAt?: Date;
  noShowAt?: Date;
  holdId?: Types.ObjectId;
  paymentId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: 'Workspace' },
    eventTypeId: { type: Schema.Types.ObjectId, required: true, ref: 'EventType' },
    eventTypeName: { type: String },
    reference: { type: String, required: true },
    clientId: { type: Schema.Types.ObjectId, required: true, ref: 'Client' },
    clientName: { type: String },
    clientEmail: { type: String },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    timezone: { type: String, default: 'Africa/Nairobi' },
    status: {
      type: String,
      required: true,
      default: 'upcoming',
      enum: ['upcoming', 'pending_approval', 'completed', 'canceled', 'no_show'],
    },
    paymentStatus: { type: String, default: 'unpaid', enum: ['unpaid', 'partial', 'paid', 'refunded'] },
    amount: { type: Number },
    currency: { type: String, default: 'USD' },
    meetingLocation: { type: String },
    notes: { type: String },
    formResponses: { type: Schema.Types.Mixed },
    publicBookingToken: { type: String },
    source: { type: String, default: 'public', enum: ['public', 'manual', 'admin', 'api'] },
    canceledAt: { type: Date },
    cancelReason: { type: String },
    completedAt: { type: Date },
    noShowAt: { type: Date },
    holdId: { type: Schema.Types.ObjectId },
    paymentId: { type: Schema.Types.ObjectId },
  },
  { timestamps: true, collection: 'bookings' },
);

BookingSchema.index({ workspaceId: 1, startAt: 1 });
BookingSchema.index({ workspaceId: 1, status: 1 });
BookingSchema.index({ clientId: 1 });
BookingSchema.index({ publicBookingToken: 1 }, { unique: true, sparse: true });
BookingSchema.index({ reference: 1 }, { unique: true });

export const BookingModel = model<IBooking>('Booking', BookingSchema);
export { BookingSchema };
