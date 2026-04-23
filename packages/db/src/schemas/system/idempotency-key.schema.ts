import { Schema, model, Document, Types } from 'mongoose';

export interface IIdempotencyKey extends Document {
  _id: Types.ObjectId;
  key: string;
  response: Record<string, unknown>;
  statusCode: number;
  expiresAt: Date;
  createdAt: Date;
}

const IdempotencyKeySchema = new Schema<IIdempotencyKey>(
  {
    key: { type: String, required: true, unique: true },
    response: { type: Schema.Types.Mixed, required: true },
    statusCode: { type: Number, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true, collection: 'idempotency_keys' },
);

// TTL
IdempotencyKeySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const IdempotencyKeyModel = model<IIdempotencyKey>('IdempotencyKey', IdempotencyKeySchema);
export { IdempotencyKeySchema };
