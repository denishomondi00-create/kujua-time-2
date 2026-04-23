import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, collection: 'forms' })
export class Form extends Document {
  @Prop({ required: true })
  workspaceId: string;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ type: [MongooseSchema.Types.Mixed], default: [] })
  fields: Array<{ id: string; label: string; type: string; required: boolean; helpText?: string; options: string[]; placeholder?: string }>;
}

export const FormSchema = SchemaFactory.createForClass(Form);
FormSchema.index({ workspaceId: 1 });
