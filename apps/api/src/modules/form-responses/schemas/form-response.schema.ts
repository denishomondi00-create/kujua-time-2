import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, collection: 'form_responses' })
export class FormResponse extends Document {
  @Prop({ required: true, index: true })
  formId: string;

  @Prop({ required: true, index: true })
  workspaceId: string;

  @Prop()
  bookingId?: string;

  @Prop()
  clientId?: string;

  @Prop({ type: MongooseSchema.Types.Mixed, default: {} })
  values: Record<string, unknown>;

  @Prop()
  submittedAt: Date;
}

export const FormResponseSchema = SchemaFactory.createForClass(FormResponse);
FormResponseSchema.index({ formId: 1, submittedAt: -1 });
