import { Injectable } from '@nestjs/common'
import { FormResponsesRepository } from '../repositories/form-responses.repository'
import { SubmitFormResponseDto } from '../dto/submit-form-response.dto'

@Injectable()
export class FormResponsesService {
  constructor(private readonly repo: FormResponsesRepository) {}

  async list(workspaceId: string) {
    return this.repo.listByWorkspace(workspaceId)
  }

  async submit(workspaceId: string, data: SubmitFormResponseDto) {
    return this.repo.create({ ...data, workspaceId })
  }

  async findById(id: string) {
    return this.repo.findById(id)
  }
}