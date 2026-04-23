import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ timestamps: true, collection: 'report_snapshots' })
export class ReportSnapshot extends Document {
  @Prop({ required: true, index: true }) workspaceId: string;
  @Prop({ required: true, index: true }) report: string;
  @Prop({ type: Object, default: {} }) payload: Record<string, unknown>;
  @Prop() rangeStart?: Date;
  @Prop() rangeEnd?: Date;
}
export const ReportSnapshotSchema = SchemaFactory.createForClass(ReportSnapshot);
ReportSnapshotSchema.index({ workspaceId: 1, report: 1, createdAt: -1 });
