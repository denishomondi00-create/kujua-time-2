import { Schema, model, Document, Types } from 'mongoose';

export interface IApiKey extends Document {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  name: string;
  keyHash: string;
  prefix: string;
  scopes: string[];
  lastUsedAt?: Date;
  expiresAt?: Date;
  revokedAt?: Date;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ApiKeySchema = new Schema<IApiKey>(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: 'Workspace' },
    name: { type: String, required: true, trim: true },
    keyHash: { type: String, required: true, unique: true },
    prefix: { type: String, required: true },
    scopes: [{ type: String }],
    lastUsedAt: { type: Date },
    expiresAt: { type: Date },
    revokedAt: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true, collection: 'api_keys' },
);

ApiKeySchema.index({ workspaceId: 1 });
ApiKeySchema.index({ keyHash: 1 }, { unique: true });

export const ApiKeyModel = model<IApiKey>('ApiKey', ApiKeySchema);
export { ApiKeySchema };
