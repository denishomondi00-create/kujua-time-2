import { Schema, model, Document, Types } from 'mongoose';

export interface IFileRecord extends Document {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  clientId?: Types.ObjectId;
  bookingId?: Types.ObjectId;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  storageKey: string;
  uploadedBy: Types.ObjectId;
  createdAt: Date;
}

const FileRecordSchema = new Schema<IFileRecord>(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: 'Workspace' },
    clientId: { type: Schema.Types.ObjectId, ref: 'Client' },
    bookingId: { type: Schema.Types.ObjectId, ref: 'Booking' },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    sizeBytes: { type: Number, required: true },
    storageKey: { type: String, required: true, unique: true },
    uploadedBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true, collection: 'files' },
);

FileRecordSchema.index({ workspaceId: 1 });
FileRecordSchema.index({ clientId: 1 });

export const FileRecordModel = model<IFileRecord>('FileRecord', FileRecordSchema);
export { FileRecordSchema };
