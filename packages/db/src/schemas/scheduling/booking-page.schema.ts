import { Schema, model, Document, Types } from 'mongoose';

export interface IBookingPage extends Document {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  slug: string;
  title: string;
  description?: string;
  isPublished: boolean;
  eventTypeIds: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const BookingPageSchema = new Schema<IBookingPage>(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: 'Workspace' },
    slug: { type: String, required: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String },
    isPublished: { type: Boolean, default: false },
    eventTypeIds: [{ type: Schema.Types.ObjectId, ref: 'EventType' }],
  },
  { timestamps: true, collection: 'booking_pages' },
);

BookingPageSchema.index({ workspaceId: 1, slug: 1 }, { unique: true });

export const BookingPageModel = model<IBookingPage>('BookingPage', BookingPageSchema);
export { BookingPageSchema };
