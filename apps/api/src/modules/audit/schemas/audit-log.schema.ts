import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, collection: 'audit_logs' })
export class AuditLog extends Document {
  @Prop({ required: true, index: true }) workspaceId: string;
  @Prop({ required: true }) userId: string;
  @Prop({ required: true }) action: string;
  @Prop() resource?: string;
  @Prop() resourceId?: string;
  @Prop({ type: MongooseSchema.Types.Mixed }) metadata?: Record<string, unknown>;
  @Prop() ipAddress?: string;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);
AuditLogSchema.index({ workspaceId: 1, createdAt: -1 });
