import { Schema, model, Document, Types } from 'mongoose';

export interface IOAuthStateToken extends Document {
  _id: Types.ObjectId;
  state: string;
  provider: string;
  workspaceId?: Types.ObjectId;
  userId?: Types.ObjectId;
  redirectUri: string;
  expiresAt: Date;
  createdAt: Date;
}

const OAuthStateTokenSchema = new Schema<IOAuthStateToken>(
  {
    state: { type: String, required: true, unique: true },
    provider: { type: String, required: true, enum: ['google', 'stripe', 'paystack'] },
    workspaceId: { type: Schema.Types.ObjectId },
    userId: { type: Schema.Types.ObjectId },
    redirectUri: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true, collection: 'oauth_state_tokens' },
);

OAuthStateTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const OAuthStateTokenModel = model<IOAuthStateToken>(
  'OAuthStateToken',
  OAuthStateTokenSchema,
);
export { OAuthStateTokenSchema };
