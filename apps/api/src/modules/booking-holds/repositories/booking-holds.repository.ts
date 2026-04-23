import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookingHold } from '../schemas/booking-hold.schema';

@Injectable()
export class BookingHoldsRepository {
  constructor(@InjectModel(BookingHold.name) private readonly model: Model<BookingHold>) {}

  async findById(id: string) { return this.model.findById(id).exec(); }
  async create(data: Partial<BookingHold>) { return this.model.create(data); }
  async updateById(id: string, data: Partial<BookingHold>) { return this.model.findByIdAndUpdate(id, data, { new: true }).exec(); }
  async consume(id: string) { return this.model.findByIdAndUpdate(id, { status: 'consumed' }, { new: true }).exec(); }
}
