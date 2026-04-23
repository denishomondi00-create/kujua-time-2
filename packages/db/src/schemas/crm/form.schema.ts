import { Schema, model, Document, Types } from 'mongoose';

export interface IFormField {
  id: string;
  label: string;
  type: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  order: number;
}

export interface IForm extends Document {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  name: string;
  fields: IFormField[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FormFieldSchema = new Schema<IFormField>(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    type: { type: String, required: true, enum: ['text', 'email', 'phone', 'textarea', 'select', 'checkbox', 'radio', 'number', 'date'] },
    required: { type: Boolean, default: false },
    placeholder: { type: String },
    options: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { _id: false },
);

const FormSchema = new Schema<IForm>(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: 'Workspace' },
    name: { type: String, required: true, trim: true },
    fields: [FormFieldSchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'forms' },
);

FormSchema.index({ workspaceId: 1 });

export const FormModel = model<IForm>('Form', FormSchema);
export { FormSchema };
