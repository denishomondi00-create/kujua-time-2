import { Schema, model, Document, Types } from 'mongoose';

export interface IClientTag extends Document {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  name: string;
  color?: string;
  createdAt: Date;
}

const ClientTagSchema = new Schema<IClientTag>(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: 'Workspace' },
    name: { type: String, required: true, trim: true },
    color: { type: String },
  },
  { timestamps: true, collection: 'client_tags' },
);

ClientTagSchema.index({ workspaceId: 1, name: 1 }, { unique: true });

export const ClientTagModel = model<IClientTag>('ClientTag', ClientTagSchema);
export { ClientTagSchema };
