import { Injectable } from '@nestjs/common'
import { MeetingLocationsRepository } from '../repositories/meeting-locations.repository'
import { UpdateMeetingLocationDto } from '../dto/update-meeting-location.dto'

@Injectable()
export class MeetingLocationsService {
  constructor(private readonly repo: MeetingLocationsRepository) {}

  async list(workspaceId: string) {
    return this.repo.listByWorkspace(workspaceId)
  }

  async upsert(workspaceId: string, data: UpdateMeetingLocationDto) {
    return this.repo.upsert(workspaceId, data)
  }
}