import { Injectable, NotFoundException } from '@nestjs/common'
import { PackagesRepository } from '../repositories/packages.repository'

@Injectable()
export class PackagesService {
  constructor(private readonly repo: PackagesRepository) {}

  async list(workspaceId: string) {
    return this.repo.listByWorkspace(workspaceId)
  }

  async create(data: {
    workspaceId: string
    name: string
    unitsIncluded: number
    price?: number
    currency?: string
  }) {
    return this.repo.create({
      ...data,
      remainingUnits: data.unitsIncluded,
      status: 'active',
    })
  }

  async consume(packageId: string, units: number) {
    const updated = await this.repo.updateById(packageId, {
      $inc: { remainingUnits: Math.max(0, -Math.abs(units)) },
    })
    if (!updated) throw new NotFoundException('Package not found.')
    return updated
  }
}