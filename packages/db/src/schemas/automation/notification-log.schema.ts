import { Schema, model, Document, Types } from 'mongoose';

export interface INotificationLog extends Document {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  channel: string;
  recipient: string;
  subject?: string;
  templateId?: string;
  status: string;
  providerMessageId?: string;
  error?: string;
  sentAt?: Date;
  deliveredAt?: Date;
  openedAt?: Date;
  createdAt: Date;
}

const NotificationLogSchema = new Schema<INotificationLog>(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: 'Workspace' },
    channel: { type: String, required: true, enum: ['email', 'sms', 'whatsapp', 'internal'] },
    recipient: { type: String, required: true },
    subject: { type: String },
    templateId: { type: String },
    status: { type: String, default: 'queued', enum: ['queued', 'sent', 'delivered', 'failed', 'bounced', 'opened'] },
    providerMessageId: { type: String },
    error: { type: String },
    sentAt: { type: Date },
    deliveredAt: { type: Date },
    openedAt: { type: Date },
  },
  { timestamps: true, collection: 'notification_logs' },
);

NotificationLogSchema.index({ workspaceId: 1, createdAt: -1 });
NotificationLogSchema.index({ channel: 1, status: 1 });

export const NotificationLogModel = model<INotificationLog>('NotificationLog', NotificationLogSchema);
export { NotificationLogSchema };
