import { Injectable } from '@nestjs/common'
import { ClientNotesRepository } from '../repositories/client-notes.repository'
import { UpdateClientNoteDto } from '../dto/update-client-note.dto'

@Injectable()
export class ClientNotesService {
  constructor(private readonly repo: ClientNotesRepository) {}

  async listByClient(workspaceId: string, clientId: string) {
    return this.repo.listByClient(workspaceId, clientId)
  }

  async create(data: Record<string, unknown>) {
    return this.repo.create(data)
  }

  async update(noteId: string, data: UpdateClientNoteDto) {
    return this.repo.updateById(noteId, data as Record<string, unknown>)
  }
}