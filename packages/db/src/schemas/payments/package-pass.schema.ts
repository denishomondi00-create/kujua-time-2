import { Schema, model, Document, Types } from 'mongoose';

export interface IPackagePass extends Document {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  clientId: Types.ObjectId;
  name: string;
  totalUnits: number;
  remainingUnits: number;
  pricePerUnit?: number;
  totalPrice: number;
  currency: string;
  expiresAt?: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const PackagePassSchema = new Schema<IPackagePass>(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: 'Workspace' },
    clientId: { type: Schema.Types.ObjectId, required: true, ref: 'Client' },
    name: { type: String, required: true },
    totalUnits: { type: Number, required: true },
    remainingUnits: { type: Number, required: true },
    pricePerUnit: { type: Number },
    totalPrice: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    expiresAt: { type: Date },
    status: { type: String, default: 'active', enum: ['active', 'exhausted', 'expired', 'canceled'] },
  },
  { timestamps: true, collection: 'package_passes' },
);

PackagePassSchema.index({ workspaceId: 1, clientId: 1 });

export const PackagePassModel = model<IPackagePass>('PackagePass', PackagePassSchema);
export { PackagePassSchema };
