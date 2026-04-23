import { Schema, model, Document, Types } from 'mongoose';

/**
 * Explicit outbox for domain events.
 * Used by automation dispatch to reliably process events.
 */
export interface IDomainEvent extends Document {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  eventName: string;
  payload: Record<string, unknown>;
  published: boolean;
  publishedAt?: Date;
  retryCount: number;
  createdAt: Date;
}

const DomainEventSchema = new Schema<IDomainEvent>(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: 'Workspace' },
    eventName: { type: String, required: true },
    payload: { type: Schema.Types.Mixed, required: true },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
    retryCount: { type: Number, default: 0 },
  },
  { timestamps: true, collection: 'domain_events' },
);

DomainEventSchema.index({ published: 1, createdAt: 1 });
DomainEventSchema.index({ workspaceId: 1, eventName: 1 });

export const DomainEventModel = model<IDomainEvent>('DomainEvent', DomainEventSchema);
export { DomainEventSchema };
