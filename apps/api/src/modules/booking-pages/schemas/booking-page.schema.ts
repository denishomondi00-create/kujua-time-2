import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, collection: 'booking_pages' })
export class BookingPage extends Document {
  @Prop({ required: true })
  workspaceId: string;

  @Prop({ default: '#0d4e5c' })
  accentColor: string;

  @Prop({ default: '#e87a3e' })
  accentSoft: string;

  @Prop()
  logoUrl?: string;

  @Prop()
  coverImageUrl?: string;

  @Prop({ default: '1.5rem' })
  radius: string;

  @Prop({ default: 'theme-teal' })
  themeClassName: string;

  @Prop({ type: [String], default: [] })
  trustBullets: string[];

  @Prop({ type: MongooseSchema.Types.Mixed, default: [] })
  faq: Array<{ question: string; answer: string }>;

  @Prop({ type: MongooseSchema.Types.Mixed, default: [] })
  policies: Array<{ title: string; summary: string }>;

  @Prop({ default: false })
  published: boolean;
}

export const BookingPageSchema = SchemaFactory.createForClass(BookingPage);
BookingPageSchema.index({ workspaceId: 1 });
