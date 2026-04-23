import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'files' })
export class FileRecord extends Document {
  @Prop({ required: true, index: true }) workspaceId: string;
  @Prop({ required: true, index: true }) clientId: string;
  @Prop({ required: true }) key: string;
  @Prop() url?: string;
  @Prop() filename?: string;
  @Prop() mimeType?: string;
  @Prop() sizeBytes?: number;
}
export const FileRecordSchema = SchemaFactory.createForClass(FileRecord);
FileRecordSchema.index({ workspaceId: 1, clientId: 1, createdAt: -1 });
