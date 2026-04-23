import { Schema, model, Document, Types } from 'mongoose';

export interface IWorkspace extends Document {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  ownerId: Types.ObjectId;
  plan: string;
  timezone: string;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

const WorkspaceSchema = new Schema<IWorkspace>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true },
    ownerId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    plan: { type: String, default: 'free', enum: ['free', 'standard', 'pro', 'premium'] },
    timezone: { type: String, default: 'Africa/Nairobi' },
    currency: { type: String, default: 'USD' },
  },
  { timestamps: true, collection: 'workspaces' },
);

WorkspaceSchema.index({ slug: 1 }, { unique: true });
WorkspaceSchema.index({ ownerId: 1 });

export const WorkspaceModel = model<IWorkspace>('Workspace', WorkspaceSchema);
export { WorkspaceSchema };
