import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../repositories/users.repository'
import { UpdateUserDto } from '../dto/update-user.dto'
import { WorkspacesService } from '../../workspaces/services/workspaces.service'

@Injectable()
export class UsersService {
  constructor(
    private readonly repo: UsersRepository,
    private readonly workspacesService: WorkspacesService,
  ) {}

  async list() {
    return this.repo.findMany()
  }

  async findById(id: string) {
    return this.repo.findById(id)
  }

  async findByEmail(email: string) {
    return this.repo.findByEmail(email)
  }

  async create(data: { email: string; hashedPassword: string; firstName?: string; lastName?: string }) {
    return this.repo.create(data)
  }

  async update(id: string, data: UpdateUserDto) {
    return this.repo.updateById(id, data as Record<string, unknown>)
  }

  async createDefaultWorkspace(userId: string, businessName: string) {
    const existing = await this.workspacesService.findByOwnerId(userId)
    if (existing) return existing

    const slug = await this.buildUniqueWorkspaceSlug(businessName)
    return this.workspacesService.create({
      name: businessName,
      slug,
      ownerId: userId,
      plan: 'free',
      timezone: 'Africa/Nairobi',
      tagline: 'Book a time that works for you.',
    })
  }

  async getPrimaryWorkspace(userId: string) {
    const existing = await this.workspacesService.findByOwnerId(userId)
    if (existing) return existing

    return this.createDefaultWorkspace(userId, 'My Business')
  }

  async revokeRefreshToken(_token: string) {}
  async createPasswordResetToken(_userId: string) {}
  async validatePasswordResetToken(_token: string) {
    return 'user-id-placeholder'
  }

  async updatePassword(userId: string, hashedPassword: string) {
    return this.repo.updateById(userId, { hashedPassword })
  }

  async verifyEmailToken(_token: string) {}

  private async buildUniqueWorkspaceSlug(name: string) {
    const base = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'workspace'
    let slug = base
    let suffix = 2

    while (await this.workspacesService.findBySlug(slug)) {
      slug = `${base}-${suffix}`
      suffix += 1
    }

    return slug
  }
}
