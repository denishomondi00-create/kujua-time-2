import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, collection: 'availability_exceptions' })
export class AvailabilityException extends Document {
  @Prop({ required: true, index: true })
  workspaceId: string;

  @Prop({ required: true })
  date: string;

  @Prop({ type: MongooseSchema.Types.Mixed, default: [] })
  overrideHours: Array<{ start: string; end: string }>;

  @Prop({ default: false })
  unavailable: boolean;

  @Prop()
  reason?: string;
}

export const AvailabilityExceptionSchema = SchemaFactory.createForClass(AvailabilityException);
AvailabilityExceptionSchema.index({ workspaceId: 1, date: 1 });
