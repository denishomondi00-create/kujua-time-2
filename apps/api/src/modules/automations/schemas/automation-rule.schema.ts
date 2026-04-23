import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, collection: 'automation_rules' })
export class AutomationRule extends Document {
  @Prop({ required: true, index: true }) workspaceId: string;
  @Prop({ required: true }) name: string;
  @Prop({ default: true }) enabled: boolean;
  @Prop({ required: true }) triggerEvent: string;
  @Prop({ type: MongooseSchema.Types.Mixed }) triggerFilters?: Record<string, unknown>;
  @Prop({ type: [MongooseSchema.Types.Mixed], default: [] })
  actions: Array<{ id: string; type: string; label: string; config: Record<string, unknown> }>;
  @Prop({ type: MongooseSchema.Types.Mixed }) timing?: Record<string, unknown>;
  @Prop({ type: MongooseSchema.Types.Mixed }) rateLimits?: Record<string, unknown>;
  @Prop() createdBy?: string;
}

export const AutomationRuleSchema = SchemaFactory.createForClass(AutomationRule);
AutomationRuleSchema.index({ workspaceId: 1, triggerEvent: 1 });
