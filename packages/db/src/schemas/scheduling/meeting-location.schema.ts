import { Schema, model, Document, Types } from 'mongoose';

export interface IMeetingLocation extends Document {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  type: string;
  label: string;
  value?: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MeetingLocationSchema = new Schema<IMeetingLocation>(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: 'Workspace' },
    type: {
      type: String,
      required: true,
      enum: ['in_person', 'zoom', 'google_meet', 'phone', 'whatsapp', 'custom'],
    },
    label: { type: String, required: true, trim: true },
    value: { type: String },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true, collection: 'meeting_locations' },
);

MeetingLocationSchema.index({ workspaceId: 1 });

export const MeetingLocationModel = model<IMeetingLocation>('MeetingLocation', MeetingLocationSchema);
export { MeetingLocationSchema };
