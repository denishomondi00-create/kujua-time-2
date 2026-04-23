/**
 * Base repository providing common CRUD patterns.
 * Domain modules extend this for collection-specific logic.
 */
import { Model, Document, FilterQuery, UpdateQuery, ClientSession, Types } from 'mongoose';

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sort?: Record<string, 1 | -1>;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async findById(id: string | Types.ObjectId, session?: ClientSession): Promise<T | null> {
    const query = this.model.findById(id);
    if (session) query.session(session);
    return query.exec();
  }

  async findOne(filter: FilterQuery<T>, session?: ClientSession): Promise<T | null> {
    const query = this.model.findOne(filter);
    if (session) query.session(session);
    return query.exec();
  }

  async find(filter: FilterQuery<T>, session?: ClientSession): Promise<T[]> {
    const query = this.model.find(filter);
    if (session) query.session(session);
    return query.exec();
  }

  async findPaginated(
    filter: FilterQuery<T>,
    options: PaginationOptions = {},
  ): Promise<PaginatedResult<T>> {
    const page = Math.max(1, options.page ?? 1);
    const limit = Math.min(100, Math.max(1, options.limit ?? 20));
    const sort = options.sort ?? { createdAt: -1 as const };

    const [items, total] = await Promise.all([
      this.model
        .find(filter)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.model.countDocuments(filter),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async create(doc: Partial<T>, session?: ClientSession): Promise<T> {
    const [created] = await this.model.create([doc], { session });
    return created;
  }

  async createMany(docs: Partial<T>[], session?: ClientSession): Promise<T[]> {
    return this.model.create(docs, { session });
  }

  async updateById(
    id: string | Types.ObjectId,
    update: UpdateQuery<T>,
    session?: ClientSession,
  ): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, update, { new: true, session }).exec();
  }

  async updateOne(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    session?: ClientSession,
  ): Promise<T | null> {
    return this.model.findOneAndUpdate(filter, update, { new: true, session }).exec();
  }

  async deleteById(id: string | Types.ObjectId, session?: ClientSession): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id, { session }).exec();
    return result !== null;
  }

  async count(filter: FilterQuery<T>): Promise<number> {
    return this.model.countDocuments(filter);
  }

  async exists(filter: FilterQuery<T>): Promise<boolean> {
    const doc = await this.model.exists(filter);
    return doc !== null;
  }
}
