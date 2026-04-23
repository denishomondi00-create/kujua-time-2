import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'package_passes' })
export class PackagePass extends Document {
  @Prop({ required: true, index: true }) workspaceId: string;
  @Prop({ required: true }) name: string;
  @Prop({ required: true, min: 1 }) unitsIncluded: number;
  @Prop({ required: true, min: 0 }) remainingUnits: number;
  @Prop({ default: 'active' }) status: string;
  @Prop({ default: 'KES' }) currency: string;
  @Prop({ default: 0 }) price: number;
}
export const PackagePassSchema = SchemaFactory.createForClass(PackagePass);
PackagePassSchema.index({ workspaceId: 1, status: 1 });
