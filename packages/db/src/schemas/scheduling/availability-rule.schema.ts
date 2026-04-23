import { Schema, model, Document, Types } from 'mongoose';

export interface IAvailabilityRule extends Document {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  eventTypeId: Types.ObjectId;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  timezone: string;
  createdAt: Date;
  updatedAt: Date;
}

const AvailabilityRuleSchema = new Schema<IAvailabilityRule>(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: 'Workspace' },
    eventTypeId: { type: Schema.Types.ObjectId, required: true, ref: 'EventType' },
    dayOfWeek: { type: Number, required: true, min: 0, max: 6 },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    timezone: { type: String, default: 'Africa/Nairobi' },
  },
  { timestamps: true, collection: 'availability_rules' },
);

AvailabilityRuleSchema.index({ workspaceId: 1, eventTypeId: 1 });

export const AvailabilityRuleModel = model<IAvailabilityRule>('AvailabilityRule', AvailabilityRuleSchema);
export { AvailabilityRuleSchema };
