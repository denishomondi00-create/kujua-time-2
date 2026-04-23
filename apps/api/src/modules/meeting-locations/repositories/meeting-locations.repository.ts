import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { MeetingLocation } from '../schemas/meeting-location.schema'

@Injectable()
export class MeetingLocationsRepository {
  constructor(@InjectModel(MeetingLocation.name) private readonly model: Model<MeetingLocation>) {}

  async listByWorkspace(workspaceId: string) {
    return this.model.find({ workspaceId }).sort({ createdAt: -1 }).exec()
  }

  async upsert(workspaceId: string, data: Partial<MeetingLocation> & { kind?: string }) {
    if (!data.kind) {
      throw new BadRequestException('Meeting location kind is required.')
    }

    return this.model
      .findOneAndUpdate(
        { workspaceId, kind: data.kind },
        { $set: { ...data, workspaceId } },
        { upsert: true, new: true },
      )
      .exec()
  }
}