import { Schema, model, Document, Types } from 'mongoose';

export interface IAvailabilityException extends Document {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  eventTypeId?: Types.ObjectId;
  date: string;
  isBlocked: boolean;
  startTime?: string;
  endTime?: string;
  reason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AvailabilityExceptionSchema = new Schema<IAvailabilityException>(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: 'Workspace' },
    eventTypeId: { type: Schema.Types.ObjectId, ref: 'EventType' },
    date: { type: String, required: true },
    isBlocked: { type: Boolean, default: true },
    startTime: { type: String },
    endTime: { type: String },
    reason: { type: String },
  },
  { timestamps: true, collection: 'availability_exceptions' },
);

AvailabilityExceptionSchema.index({ workspaceId: 1, date: 1 });

export const AvailabilityExceptionModel = model<IAvailabilityException>(
  'AvailabilityException',
  AvailabilityExceptionSchema,
);
export { AvailabilityExceptionSchema };
