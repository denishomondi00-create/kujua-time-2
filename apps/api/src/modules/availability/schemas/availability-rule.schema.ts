import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, collection: 'availability_rules' })
export class AvailabilityRule extends Document {
  @Prop({ required: true, index: true })
  workspaceId: string;

  @Prop({ index: true })
  eventTypeId?: string;

  @Prop({ type: MongooseSchema.Types.Mixed, default: {} })
  weeklyHours: Record<string, Array<{ start: string; end: string }>>;

  @Prop({ default: 'Africa/Nairobi' })
  timezone: string;

  @Prop({ default: 0 })
  bufferBeforeMinutes: number;

  @Prop({ default: 0 })
  bufferAfterMinutes: number;

  @Prop({ default: 60 })
  minNoticeMinutes: number;

  @Prop({ default: 60 })
  maxBookingDaysAhead: number;
}

export const AvailabilityRuleSchema = SchemaFactory.createForClass(AvailabilityRule);
AvailabilityRuleSchema.index({ workspaceId: 1, eventTypeId: 1 });
