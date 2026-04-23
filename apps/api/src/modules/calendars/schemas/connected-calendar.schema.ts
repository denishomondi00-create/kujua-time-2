import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'connected_calendars' })
export class ConnectedCalendar extends Document {
  @Prop({ required: true, index: true }) workspaceId: string;
  @Prop({ required: true }) userId: string;
  @Prop({ required: true, enum: ['google', 'outlook'] }) provider: string;
  @Prop({ required: true }) providerAccountId: string;
  @Prop() providerEmail?: string;
  @Prop() encryptedAccessToken?: string;
  @Prop() encryptedRefreshToken?: string;
  @Prop() tokenExpiresAt?: Date;
  @Prop({ default: 'active', enum: ['active', 'disconnected', 'error'] }) status: string;
}

export const ConnectedCalendarSchema = SchemaFactory.createForClass(ConnectedCalendar);
ConnectedCalendarSchema.index({ workspaceId: 1, provider: 1 });
