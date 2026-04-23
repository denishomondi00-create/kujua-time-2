import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookingPage } from '../schemas/booking-page.schema';

@Injectable()
export class BookingPagesRepository {
  constructor(@InjectModel(BookingPage.name) private readonly model: Model<BookingPage>) {}

  async findByWorkspace(workspaceId: string) { return this.model.find({ workspaceId }).exec(); }
  async findById(id: string) { return this.model.findById(id).exec(); }
  async create(data: Partial<BookingPage>) { return this.model.create(data); }
  async updateById(id: string, data: Partial<BookingPage>) { return this.model.findByIdAndUpdate(id, data, { new: true }).exec(); }
}
