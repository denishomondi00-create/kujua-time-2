import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'client_notes' })
export class ClientNote extends Document {
  @Prop({ required: true, index: true })
  clientId: string;

  @Prop({ required: true, index: true })
  workspaceId: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  createdByUserId?: string;

  @Prop()
  createdByName?: string;
}

export const ClientNoteSchema = SchemaFactory.createForClass(ClientNote);
ClientNoteSchema.index({ clientId: 1, createdAt: -1 });
