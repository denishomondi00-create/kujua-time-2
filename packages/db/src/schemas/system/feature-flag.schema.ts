import { Schema, model, Document, Types } from 'mongoose';

export interface IFeatureFlag extends Document {
  _id: Types.ObjectId;
  key: string;
  enabled: boolean;
  workspaceIds?: Types.ObjectId[];
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FeatureFlagSchema = new Schema<IFeatureFlag>(
  {
    key: { type: String, required: true, unique: true },
    enabled: { type: Boolean, default: false },
    workspaceIds: [{ type: Schema.Types.ObjectId }],
    description: { type: String },
  },
  { timestamps: true, collection: 'feature_flags' },
);

export const FeatureFlagModel = model<IFeatureFlag>('FeatureFlag', FeatureFlagSchema);
export { FeatureFlagSchema };
