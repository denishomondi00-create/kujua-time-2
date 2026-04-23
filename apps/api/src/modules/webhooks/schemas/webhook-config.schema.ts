import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'outgoing_webhooks' })
export class WebhookConfig extends Document {
  @Prop({ required: true, index: true }) workspaceId: string;
  @Prop({ required: true }) url: string;
  @Prop({ type: [String], default: [] }) events: string[];
  @Prop() secret?: string;
  @Prop({ default: true }) enabled: boolean;
}

export const WebhookConfigSchema = SchemaFactory.createForClass(WebhookConfig);
