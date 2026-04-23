import { Injectable } from '@nestjs/common'
import { AuditRepository } from '../repositories/audit.repository'
import { AuditQueryDto } from '../dto/audit-query.dto'

@Injectable()
export class AuditService {
  constructor(private readonly repo: AuditRepository) {}

  async list(filters: AuditQueryDto = {}) {
    return this.repo.findMany(filters as Record<string, unknown>)
  }

  async record(data: Record<string, unknown>) {
    return this.repo.create(data)
  }
}