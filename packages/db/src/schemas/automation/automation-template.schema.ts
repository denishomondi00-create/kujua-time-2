import { Schema, model, Document, Types } from 'mongoose';

export interface IAutomationTemplate extends Document {
  _id: Types.ObjectId;
  slug: string;
  name: string;
  description: string;
  category: string;
  triggerEvent: string;
  defaultActions: Record<string, unknown>[];
  defaultTiming?: Record<string, unknown>;
  createdAt: Date;
}

const AutomationTemplateSchema = new Schema<IAutomationTemplate>(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, enum: ['booking', 'payment', 'client', 'followup'] },
    triggerEvent: { type: String, required: true },
    defaultActions: [{ type: Schema.Types.Mixed }],
    defaultTiming: { type: Schema.Types.Mixed },
  },
  { timestamps: true, collection: 'automation_templates' },
);

export const AutomationTemplateModel = model<IAutomationTemplate>(
  'AutomationTemplate',
  AutomationTemplateSchema,
);
export { AutomationTemplateSchema };
