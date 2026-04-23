import { Schema, model, Document, Types } from 'mongoose';

export interface IOutgoingWebhook extends Document {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  webhookConfigId: Types.ObjectId;
  eventName: string;
  url: string;
  payload: Record<string, unknown>;
  status: string;
  attempts: number;
  lastAttemptAt?: Date;
  responseStatus?: number;
  responseBody?: string;
  error?: string;
  createdAt: Date;
}

const OutgoingWebhookSchema = new Schema<IOutgoingWebhook>(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: 'Workspace' },
    webhookConfigId: { type: Schema.Types.ObjectId, required: true },
    eventName: { type: String, required: true },
    url: { type: String, required: true },
    payload: { type: Schema.Types.Mixed, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'delivered', 'failed'] },
    attempts: { type: Number, default: 0 },
    lastAttemptAt: { type: Date },
    responseStatus: { type: Number },
    responseBody: { type: String },
    error: { type: String },
  },
  { timestamps: true, collection: 'outgoing_webhooks' },
);

OutgoingWebhookSchema.index({ workspaceId: 1, createdAt: -1 });
OutgoingWebhookSchema.index({ status: 1 });

export const OutgoingWebhookModel = model<IOutgoingWebhook>('OutgoingWebhook', OutgoingWebhookSchema);
export { OutgoingWebhookSchema };
