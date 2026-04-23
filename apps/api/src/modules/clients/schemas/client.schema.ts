import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'clients' })
export class Client extends Document {
  @Prop({ required: true, index: true })
  workspaceId: string;

  @Prop({ required: true, trim: true })
  fullName: string;

  @Prop({ required: true, lowercase: true, trim: true })
  email: string;

  @Prop()
  phone?: string;

  @Prop({ default: 'lead', enum: ['lead', 'client', 'inactive', 'vip'] })
  stage: string;

  @Prop({ default: false })
  isBlocked: boolean;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: 0 })
  totalBookings: number;

  @Prop({ default: 0 })
  totalRevenue: number;

  @Prop({ default: 'USD' })
  currency: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
ClientSchema.index({ workspaceId: 1, email: 1 }, { unique: true });
ClientSchema.index({ workspaceId: 1, stage: 1 });
ClientSchema.index({ workspaceId: 1, fullName: 'text', email: 'text' });
