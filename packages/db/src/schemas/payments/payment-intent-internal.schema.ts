import { Schema, model, Document, Types } from 'mongoose';

export interface IPaymentIntentInternal extends Document {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  bookingHoldId?: Types.ObjectId;
  bookingId?: Types.ObjectId;
  provider: string;
  providerIntentId?: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentIntentInternalSchema = new Schema<IPaymentIntentInternal>(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: 'Workspace' },
    bookingHoldId: { type: Schema.Types.ObjectId },
    bookingId: { type: Schema.Types.ObjectId },
    provider: { type: String, required: true, enum: ['stripe', 'paystack'] },
    providerIntentId: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'processing', 'succeeded', 'failed', 'canceled'] },
  },
  { timestamps: true, collection: 'payment_intents_internal' },
);

PaymentIntentInternalSchema.index({ workspaceId: 1 });
PaymentIntentInternalSchema.index({ providerIntentId: 1 }, { sparse: true });

export const PaymentIntentInternalModel = model<IPaymentIntentInternal>(
  'PaymentIntentInternal',
  PaymentIntentInternalSchema,
);
export { PaymentIntentInternalSchema };
