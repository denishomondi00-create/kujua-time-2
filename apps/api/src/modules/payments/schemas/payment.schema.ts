import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'payments' })
export class Payment extends Document {
  @Prop({ required: true, index: true }) workspaceId: string;
  @Prop({ index: true }) bookingId?: string;
  @Prop({ index: true }) clientId?: string;
  @Prop() clientName?: string;
  @Prop({ required: true, enum: ['stripe', 'paystack', 'manual'] }) provider: string;
  @Prop({ required: true, default: 'pending', enum: ['pending', 'succeeded', 'failed', 'refunded', 'partially_refunded'] }) status: string;
  @Prop({ required: true }) amount: number;
  @Prop({ required: true, default: 'USD' }) currency: string;
  @Prop({ required: true }) reference: string;
  @Prop() providerPaymentId?: string;
  @Prop() providerCheckoutUrl?: string;
  @Prop() holdId?: string;
  @Prop() refundedAmount?: number;
  @Prop() refundReason?: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
PaymentSchema.index({ workspaceId: 1, status: 1 });
PaymentSchema.index({ reference: 1 }, { unique: true });
PaymentSchema.index({ holdId: 1 }, { sparse: true });
