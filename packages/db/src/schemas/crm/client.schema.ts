import { Schema, model, Document, Types } from 'mongoose';

export interface IClient extends Document {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  timezone?: string;
  lifecycleStage: string;
  tags: string[];
  isBlocked: boolean;
  blockedReason?: string;
  totalBookings: number;
  totalRevenue: number;
  lastBookingAt?: Date;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema = new Schema<IClient>(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: 'Workspace' },
    email: { type: String, required: true, lowercase: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phone: { type: String },
    timezone: { type: String },
    lifecycleStage: { type: String, default: 'lead', enum: ['lead', 'client', 'inactive', 'vip'] },
    tags: [{ type: String }],
    isBlocked: { type: Boolean, default: false },
    blockedReason: { type: String },
    totalBookings: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },
    lastBookingAt: { type: Date },
    source: { type: String, default: 'booking', enum: ['booking', 'manual', 'import', 'api'] },
  },
  { timestamps: true, collection: 'clients' },
);

ClientSchema.index({ workspaceId: 1, email: 1 }, { unique: true });
ClientSchema.index({ workspaceId: 1, lifecycleStage: 1 });
ClientSchema.index({ workspaceId: 1, tags: 1 });

export const ClientModel = model<IClient>('Client', ClientSchema);
export { ClientSchema };
