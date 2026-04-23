import { Schema, model, Document, Types } from 'mongoose';

export interface IPackageTransaction extends Document {
  _id: Types.ObjectId;
  packagePassId: Types.ObjectId;
  bookingId?: Types.ObjectId;
  type: string;
  units: number;
  remainingAfter: number;
  note?: string;
  createdAt: Date;
}

const PackageTransactionSchema = new Schema<IPackageTransaction>(
  {
    packagePassId: { type: Schema.Types.ObjectId, required: true, ref: 'PackagePass' },
    bookingId: { type: Schema.Types.ObjectId, ref: 'Booking' },
    type: { type: String, required: true, enum: ['consume', 'refund', 'adjust'] },
    units: { type: Number, required: true },
    remainingAfter: { type: Number, required: true },
    note: { type: String },
  },
  { timestamps: true, collection: 'package_transactions' },
);

PackageTransactionSchema.index({ packagePassId: 1, createdAt: -1 });

export const PackageTransactionModel = model<IPackageTransaction>(
  'PackageTransaction',
  PackageTransactionSchema,
);
export { PackageTransactionSchema };
