import { Schema, model, Document, Types } from 'mongoose';

export interface IAutomationExecution extends Document {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  automationRuleId: Types.ObjectId;
  triggerEvent: string;
  triggerPayload: Record<string, unknown>;
  status: string;
  actionResults: Array<{
    actionType: string;
    status: string;
    error?: string;
    executedAt: Date;
  }>;
  startedAt: Date;
  completedAt?: Date;
  error?: string;
  createdAt: Date;
}

const AutomationExecutionSchema = new Schema<IAutomationExecution>(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: 'Workspace' },
    automationRuleId: { type: Schema.Types.ObjectId, required: true, ref: 'AutomationRule' },
    triggerEvent: { type: String, required: true },
    triggerPayload: { type: Schema.Types.Mixed, required: true },
    status: { type: String, default: 'running', enum: ['running', 'completed', 'failed', 'partial'] },
    actionResults: [{
      actionType: { type: String, required: true },
      status: { type: String, required: true, enum: ['success', 'failed', 'skipped'] },
      error: { type: String },
      executedAt: { type: Date, required: true },
    }],
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
    error: { type: String },
  },
  { timestamps: true, collection: 'automation_executions' },
);

AutomationExecutionSchema.index({ workspaceId: 1, createdAt: -1 });
AutomationExecutionSchema.index({ automationRuleId: 1, createdAt: -1 });

export const AutomationExecutionModel = model<IAutomationExecution>(
  'AutomationExecution',
  AutomationExecutionSchema,
);
export { AutomationExecutionSchema };
