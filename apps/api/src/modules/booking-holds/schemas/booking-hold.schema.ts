import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, collection: 'booking_holds' })
export class BookingHold extends Document {
  @Prop({ required: true })
  workspaceId: string;

  @Prop({ required: true })
  eventTypeId: string;

  @Prop({ required: true })
  startAt: Date;

  @Prop({ required: true })
  endAt: Date;

  @Prop({ required: true })
  timezone: string;

  @Prop({ required: true, index: true })
  expiresAt: Date;

  @Prop({ default: false })
  formCompleted: boolean;

  @Prop({ type: MongooseSchema.Types.Mixed, default: {} })
  client: { fullName?: string; email?: string; phone?: string; notes?: string };

  @Prop({ type: MongooseSchema.Types.Mixed })
  answers?: Record<string, unknown>;

  @Prop({ default: 'active', enum: ['active', 'consumed', 'expired'] })
  status: string;
}

export const BookingHoldSchema = SchemaFactory.createForClass(BookingHold);
BookingHoldSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
BookingHoldSchema.index({ workspaceId: 1, startAt: 1, endAt: 1 });
