import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ timestamps: true, collection: 'admin_actions' })
export class AdminAction extends Document {
  @Prop({ required: true }) actorId: string;
  @Prop({ required: true }) action: string;
  @Prop({ required: true }) workspaceId: string;
  @Prop({ type: Object, default: {} }) metadata: Record<string, unknown>;
}
export const AdminActionSchema = SchemaFactory.createForClass(AdminAction);
AdminActionSchema.index({ workspaceId: 1, createdAt: -1 });
