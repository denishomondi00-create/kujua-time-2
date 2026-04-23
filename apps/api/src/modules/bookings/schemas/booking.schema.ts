import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, collection: 'bookings' })
export class Booking extends Document {
  @Prop({ required: true, index: true })
  workspaceId: string;

  @Prop({ required: true, index: true })
  eventTypeId: string;

  @Prop()
  eventTypeName: string;

  @Prop({ required: true })
  reference: string;

  @Prop({ required: true })
  clientId: string;

  @Prop()
  clientName: string;

  @Prop()
  clientEmail: string;

  @Prop({ required: true })
  startAt: Date;

  @Prop({ required: true })
  endAt: Date;

  @Prop({ required: true, default: 'Africa/Nairobi' })
  timezone: string;

  @Prop({ required: true, default: 'upcoming', enum: ['upcoming', 'pending_approval', 'completed', 'canceled', 'no_show'], index: true })
  status: string;

  @Prop({ default: 'unpaid', enum: ['unpaid', 'partial', 'paid', 'refunded'] })
  paymentStatus: string;

  @Prop()
  amount?: number;

  @Prop({ default: 'USD' })
  currency: string;

  @Prop()
  meetingLocation?: string;

  @Prop()
  notes?: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  formResponses?: Record<string, unknown>;

  @Prop()
  publicBookingToken: string;

  @Prop({ default: 'public', enum: ['public', 'manual', 'admin', 'api'] })
  source: string;

  @Prop()
  canceledAt?: Date;

  @Prop()
  cancelReason?: string;

  @Prop()
  completedAt?: Date;

  @Prop()
  noShowAt?: Date;

  @Prop()
  holdId?: string;

  @Prop()
  paymentId?: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
BookingSchema.index({ workspaceId: 1, startAt: 1 });
BookingSchema.index({ workspaceId: 1, status: 1 });
BookingSchema.index({ clientId: 1 });
BookingSchema.index({ publicBookingToken: 1 }, { unique: true, sparse: true });
BookingSchema.index({ reference: 1 }, { unique: true });
