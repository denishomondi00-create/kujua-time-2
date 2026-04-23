import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, collection: 'event_types' })
export class EventType extends Document {
  @Prop({ required: true, index: true })
  workspaceId: string;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  slug: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({ required: true, default: 30 })
  durationMinutes: number;

  @Prop({ default: 'draft', enum: ['draft', 'published', 'archived'] })
  status: string;

  @Prop()
  color?: string;

  @Prop({ type: MongooseSchema.Types.Mixed, default: { required: false, mode: 'free', amount: null, currency: 'USD' } })
  payment: { required: boolean; mode: string; amount?: number | null; currency: string };

  @Prop({ type: [String], default: [] })
  locations: string[];

  @Prop({ default: false })
  requiresApproval: boolean;

  @Prop()
  formId?: string;
}

export const EventTypeSchema = SchemaFactory.createForClass(EventType);
EventTypeSchema.index({ workspaceId: 1, slug: 1 }, { unique: true });
EventTypeSchema.index({ workspaceId: 1, status: 1 });
