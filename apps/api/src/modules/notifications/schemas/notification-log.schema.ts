import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'notification_logs' })
export class NotificationLog extends Document {
  @Prop({ required: true, index: true }) workspaceId: string;
  @Prop({ required: true, enum: ['email', 'sms', 'whatsapp'] }) channel: string;
  @Prop({ required: true }) recipient: string;
  @Prop({ required: true }) subject: string;
  @Prop({ required: true, enum: ['queued', 'sent', 'delivered', 'failed', 'bounced'] }) status: string;
  @Prop() provider?: string;
  @Prop() providerMessageId?: string;
  @Prop() errorMessage?: string;
  @Prop() sentAt?: Date;
}

export const NotificationLogSchema = SchemaFactory.createForClass(NotificationLog);
NotificationLogSchema.index({ workspaceId: 1, createdAt: -1 });
