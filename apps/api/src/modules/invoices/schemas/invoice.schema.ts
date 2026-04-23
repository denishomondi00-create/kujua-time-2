import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, collection: 'invoices' })
export class Invoice extends Document {
  @Prop({ required: true, index: true }) workspaceId: string;
  @Prop({ index: true }) clientId?: string;
  @Prop() clientName?: string;
  @Prop() clientEmail?: string;
  @Prop({ index: true }) bookingId?: string;
  @Prop({ required: true }) invoiceNumber: string;
  @Prop({ required: true, default: 'draft', enum: ['draft', 'sent', 'paid', 'void'] }) status: string;
  @Prop({ required: true }) amount: number;
  @Prop({ default: 'USD' }) currency: string;
  @Prop({ type: [MongooseSchema.Types.Mixed], default: [] }) lineItems: Array<{ description: string; quantity: number; unitPrice: number; total: number }>;
  @Prop() dueDate?: Date;
  @Prop() sentAt?: Date;
  @Prop() paidAt?: Date;
  @Prop() notes?: string;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
InvoiceSchema.index({ workspaceId: 1, status: 1 });
InvoiceSchema.index({ invoiceNumber: 1 }, { unique: true });
