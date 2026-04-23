import { Schema, model, Document, Types } from 'mongoose';

export interface IReportSnapshot extends Document {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  reportType: string;
  period: string;
  data: Record<string, unknown>;
  generatedAt: Date;
  createdAt: Date;
}

const ReportSnapshotSchema = new Schema<IReportSnapshot>(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: 'Workspace' },
    reportType: { type: String, required: true, enum: ['bookings', 'revenue', 'no_shows', 'overview'] },
    period: { type: String, required: true },
    data: { type: Schema.Types.Mixed, required: true },
    generatedAt: { type: Date, required: true },
  },
  { timestamps: true, collection: 'report_snapshots' },
);

ReportSnapshotSchema.index({ workspaceId: 1, reportType: 1, period: 1 });

export const ReportSnapshotModel = model<IReportSnapshot>('ReportSnapshot', ReportSnapshotSchema);
export { ReportSnapshotSchema };
