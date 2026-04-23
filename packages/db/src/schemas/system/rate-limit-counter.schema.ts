import { Schema, model, Document } from 'mongoose';

export interface IRateLimitCounter extends Document {
  key: string;
  count: number;
  windowStart: Date;
  expiresAt: Date;
}

const RateLimitCounterSchema = new Schema<IRateLimitCounter>(
  {
    key: { type: String, required: true, unique: true },
    count: { type: Number, default: 0 },
    windowStart: { type: Date, required: true },
    expiresAt: { type: Date, required: true },
  },
  { collection: 'rate_limit_counters' },
);

RateLimitCounterSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const RateLimitCounterModel = model<IRateLimitCounter>(
  'RateLimitCounter',
  RateLimitCounterSchema,
);
export { RateLimitCounterSchema };
