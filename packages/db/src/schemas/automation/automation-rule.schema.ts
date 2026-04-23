import { Schema, model, Document, Types } from 'mongoose';

export interface IAutomationAction {
  type: string;
  config: Record<string, unknown>;
}

export interface IAutomationRule extends Document {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  name: string;
  enabled: boolean;
  trigger: {
    event: string;
    filters?: Record<string, unknown>;
  };
  actions: IAutomationAction[];
  timing?: {
    delayMinutes?: number;
    scheduleCron?: string;
  };
  rateLimits?: {
    maxPerHour?: number;
    maxPerDay?: number;
  };
  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AutomationActionSchema = new Schema<IAutomationAction>(
  {
    type: {
      type: String,
      required: true,
      enum: ['send_email', 'send_sms', 'send_whatsapp', 'add_tag', 'remove_tag',
             'create_invoice', 'update_client_field', 'send_internal_notification',
             'call_webhook', 'enqueue_followup', 'promote_waitlist'],
    },
    config: { type: Schema.Types.Mixed, required: true },
  },
  { _id: false },
);

const AutomationRuleSchema = new Schema<IAutomationRule>(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: 'Workspace' },
    name: { type: String, required: true, trim: true },
    enabled: { type: Boolean, default: true },
    trigger: {
      event: {
        type: String,
        required: true,
        enum: [
          'booking.created', 'booking.approved', 'booking.canceled', 'booking.rescheduled',
          'booking.completed', 'booking.no_show', 'payment.initiated', 'payment.succeeded',
          'payment.failed', 'payment.refunded', 'invoice.created', 'form.submitted',
          'client.created', 'package.low_balance', 'waitlist.promoted',
        ],
      },
      filters: { type: Schema.Types.Mixed },
    },
    actions: [AutomationActionSchema],
    timing: {
      delayMinutes: { type: Number },
      scheduleCron: { type: String },
    },
    rateLimits: {
      maxPerHour: { type: Number },
      maxPerDay: { type: Number },
    },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true, collection: 'automation_rules' },
);

AutomationRuleSchema.index({ workspaceId: 1, 'trigger.event': 1 });

export const AutomationRuleModel = model<IAutomationRule>('AutomationRule', AutomationRuleSchema);
export { AutomationRuleSchema };
