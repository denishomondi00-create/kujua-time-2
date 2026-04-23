import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private readonly model: Model<User>) {}

  async findById(id: string) { return this.model.findById(id).exec(); }
  async findByEmail(email: string) { return this.model.findOne({ email: email.toLowerCase() }).exec(); }
  async findMany() { return this.model.find().sort({ createdAt: -1 }).exec(); }
  async create(data: Partial<User>) { return this.model.create(data); }
  async updateById(id: string, data: Partial<User>) { return this.model.findByIdAndUpdate(id, data, { new: true }).exec(); }
}
