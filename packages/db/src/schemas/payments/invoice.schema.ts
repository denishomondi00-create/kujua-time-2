import { Schema, model, Document, Types } from 'mongoose';

export interface IInvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface IInvoice extends Document {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  clientId: Types.ObjectId;
  bookingId?: Types.ObjectId;
  invoiceNumber: string;
  items: IInvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  status: string;
  issuedAt: Date;
  dueAt?: Date;
  paidAt?: Date;
  voidedAt?: Date;
  paymentId?: Types.ObjectId;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InvoiceItemSchema = new Schema<IInvoiceItem>(
  {
    description: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    unitPrice: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { _id: false },
);

const InvoiceSchema = new Schema<IInvoice>(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: 'Workspace' },
    clientId: { type: Schema.Types.ObjectId, required: true, ref: 'Client' },
    bookingId: { type: Schema.Types.ObjectId, ref: 'Booking' },
    invoiceNumber: { type: String, required: true },
    items: [InvoiceItemSchema],
    subtotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    status: { type: String, default: 'draft', enum: ['draft', 'sent', 'paid', 'void', 'overdue'] },
    issuedAt: { type: Date, default: Date.now },
    dueAt: { type: Date },
    paidAt: { type: Date },
    voidedAt: { type: Date },
    paymentId: { type: Schema.Types.ObjectId, ref: 'Payment' },
    notes: { type: String },
  },
  { timestamps: true, collection: 'invoices' },
);

InvoiceSchema.index({ workspaceId: 1, invoiceNumber: 1 }, { unique: true });
InvoiceSchema.index({ clientId: 1 });

export const InvoiceModel = model<IInvoice>('Invoice', InvoiceSchema);
export { InvoiceSchema };
