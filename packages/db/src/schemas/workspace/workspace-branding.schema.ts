import { Schema, model, Document, Types } from 'mongoose';

export interface IWorkspaceBranding extends Document {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  logoUrl?: string;
  coverImageUrl?: string;
  accentColor: string;
  headline?: string;
  description?: string;
  customCss?: string;
  createdAt: Date;
  updatedAt: Date;
}

const WorkspaceBrandingSchema = new Schema<IWorkspaceBranding>(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: 'Workspace', unique: true },
    logoUrl: { type: String },
    coverImageUrl: { type: String },
    accentColor: { type: String, default: '#0066FF' },
    headline: { type: String },
    description: { type: String },
    customCss: { type: String },
  },
  { timestamps: true, collection: 'workspace_branding' },
);

export const WorkspaceBrandingModel = model<IWorkspaceBranding>('WorkspaceBranding', WorkspaceBrandingSchema);
export { WorkspaceBrandingSchema };
