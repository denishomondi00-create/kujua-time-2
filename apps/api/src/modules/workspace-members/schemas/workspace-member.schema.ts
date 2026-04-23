import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'workspace_members' })
export class WorkspaceMember extends Document {
  @Prop({ required: true, index: true })
  workspaceId: string;

  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true, enum: ['owner', 'admin', 'member'], default: 'member' })
  role: string;

  @Prop({ default: 'active', enum: ['active', 'invited', 'suspended'] })
  status: string;

  @Prop()
  invitedEmail?: string;
}

export const WorkspaceMemberSchema = SchemaFactory.createForClass(WorkspaceMember);
WorkspaceMemberSchema.index({ workspaceId: 1, userId: 1 }, { unique: true });
