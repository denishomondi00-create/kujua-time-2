import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../repositories/users.repository'
import { UpdateUserDto } from '../dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(private readonly repo: UsersRepository) {}

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
    const slug = businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    return { id: `ws_${userId}`, name: businessName, slug, plan: 'free' }
  }

  async getPrimaryWorkspace(userId: string) {
    return { id: `ws_${userId}`, name: 'My Business', slug: 'my-business', plan: 'free' }
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
}