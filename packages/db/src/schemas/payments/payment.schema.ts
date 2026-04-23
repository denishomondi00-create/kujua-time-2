import { Schema, model, Document, Types } from 'mongoose';

export interface IPayment extends Document {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  bookingId?: Types.ObjectId;
  clientId?: Types.ObjectId;
  provider: string;
  providerPaymentId: string;
  amount: number;
  currency: string;
  status: string;
  paidAt?: Date;
  refundedAt?: Date;
  refundAmount?: number;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: 'Workspace' },
    bookingId: { type: Schema.Types.ObjectId, ref: 'Booking' },
    clientId: { type: Schema.Types.ObjectId, ref: 'Client' },
    provider: { type: String, required: true, enum: ['stripe', 'paystack'] },
    providerPaymentId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, required: true, enum: ['pending', 'succeeded', 'failed', 'refunded', 'partial_refund'] },
    paidAt: { type: Date },
    refundedAt: { type: Date },
    refundAmount: { type: Number },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true, collection: 'payments' },
);

PaymentSchema.index({ workspaceId: 1, createdAt: -1 });
PaymentSchema.index({ bookingId: 1 });
PaymentSchema.index({ providerPaymentId: 1 }, { unique: true });

export const PaymentModel = model<IPayment>('Payment', PaymentSchema);
export { PaymentSchema };
