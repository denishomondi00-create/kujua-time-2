import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'meeting_locations' })
export class MeetingLocation extends Document {
  @Prop({ required: true, index: true }) workspaceId: string;
  @Prop({ required: true, enum: ['in_person', 'zoom', 'google_meet', 'phone', 'whatsapp', 'custom'] }) type: string;
  @Prop({ required: true }) label: string;
  @Prop() details?: string;
  @Prop() link?: string;
  @Prop({ default: true }) enabled: boolean;
}

export const MeetingLocationSchema = SchemaFactory.createForClass(MeetingLocation);
