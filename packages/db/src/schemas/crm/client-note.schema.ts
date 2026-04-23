import { Schema, model, Document, Types } from 'mongoose';

export interface IClientNote extends Document {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  clientId: Types.ObjectId;
  authorId: Types.ObjectId;
  content: string;
  bookingId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ClientNoteSchema = new Schema<IClientNote>(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: 'Workspace' },
    clientId: { type: Schema.Types.ObjectId, required: true, ref: 'Client' },
    authorId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    content: { type: String, required: true },
    bookingId: { type: Schema.Types.ObjectId, ref: 'Booking' },
  },
  { timestamps: true, collection: 'client_notes' },
);

ClientNoteSchema.index({ clientId: 1, createdAt: -1 });

export const ClientNoteModel = model<IClientNote>('ClientNote', ClientNoteSchema);
export { ClientNoteSchema };
