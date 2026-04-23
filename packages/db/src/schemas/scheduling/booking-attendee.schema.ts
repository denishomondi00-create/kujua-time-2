import { Schema, model, Document, Types } from 'mongoose';

export interface IBookingAttendee extends Document {
  _id: Types.ObjectId;
  bookingId: Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  status: string;
  createdAt: Date;
}

const BookingAttendeeSchema = new Schema<IBookingAttendee>(
  {
    bookingId: { type: Schema.Types.ObjectId, required: true, ref: 'Booking' },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String },
    status: { type: String, default: 'confirmed', enum: ['confirmed', 'canceled', 'no_show'] },
  },
  { timestamps: true, collection: 'booking_attendees' },
);

BookingAttendeeSchema.index({ bookingId: 1 });

export const BookingAttendeeModel = model<IBookingAttendee>('BookingAttendee', BookingAttendeeSchema);
export { BookingAttendeeSchema };
