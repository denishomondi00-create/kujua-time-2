import { Schema, model, Document, Types } from 'mongoose';

export interface IFormResponse extends Document {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  formId: Types.ObjectId;
  clientId?: Types.ObjectId;
  bookingId?: Types.ObjectId;
  answers: Record<string, unknown>;
  submittedAt: Date;
  createdAt: Date;
}

const FormResponseSchema = new Schema<IFormResponse>(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: 'Workspace' },
    formId: { type: Schema.Types.ObjectId, required: true, ref: 'Form' },
    clientId: { type: Schema.Types.ObjectId, ref: 'Client' },
    bookingId: { type: Schema.Types.ObjectId, ref: 'Booking' },
    answers: { type: Schema.Types.Mixed, required: true },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true, collection: 'form_responses' },
);

FormResponseSchema.index({ formId: 1, submittedAt: -1 });
FormResponseSchema.index({ clientId: 1 });

export const FormResponseModel = model<IFormResponse>('FormResponse', FormResponseSchema);
export { FormResponseSchema };
