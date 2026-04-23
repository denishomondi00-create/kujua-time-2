import { Schema, model, Document, Types } from 'mongoose';

export interface IEphemeralCheckoutSession extends Document {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  bookingHoldId: Types.ObjectId;
  provider: string;
  providerSessionId: string;
  amount: number;
  currency: string;
  status: string;
  expiresAt: Date;
  createdAt: Date;
}

const EphemeralCheckoutSessionSchema = new Schema<IEphemeralCheckoutSession>(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true },
    bookingHoldId: { type: Schema.Types.ObjectId, required: true },
    provider: { type: String, required: true, enum: ['stripe', 'paystack'] },
    providerSessionId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'completed', 'expired'] },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true, collection: 'ephemeral_checkout_sessions' },
);

// TTL
EphemeralCheckoutSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const EphemeralCheckoutSessionModel = model<IEphemeralCheckoutSession>(
  'EphemeralCheckoutSession',
  EphemeralCheckoutSessionSchema,
);
export { EphemeralCheckoutSessionSchema };
