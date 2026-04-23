import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'automation_executions' })
export class AutomationExecution extends Document {
  @Prop({ required: true, index: true }) automationId: string;
  @Prop({ required: true, index: true }) workspaceId: string;
  @Prop({ required: true, default: 'pending', enum: ['pending', 'running', 'completed', 'failed'] }) status: string;
  @Prop() startedAt?: Date;
  @Prop() completedAt?: Date;
  @Prop() errorMessage?: string;
  @Prop() triggerEvent?: string;
  @Prop() triggeredByEntityId?: string;
}

export const AutomationExecutionSchema = SchemaFactory.createForClass(AutomationExecution);
AutomationExecutionSchema.index({ automationId: 1, createdAt: -1 });
