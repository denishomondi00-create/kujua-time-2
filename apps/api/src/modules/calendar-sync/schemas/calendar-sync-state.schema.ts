import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'calendar_sync_states' })
export class CalendarSyncState extends Document {
  @Prop({ required: true, unique: true }) connectedCalendarId: string;
  @Prop() syncToken?: string;
  @Prop() lastSyncAt?: Date;
  @Prop({ default: 'idle', enum: ['idle', 'syncing', 'error'] }) status: string;
  @Prop() errorMessage?: string;
}

export const CalendarSyncStateSchema = SchemaFactory.createForClass(CalendarSyncState);
