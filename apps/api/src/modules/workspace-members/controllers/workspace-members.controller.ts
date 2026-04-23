import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard'
import { CurrentWorkspace } from '../../../shared/decorators/current-workspace.decorator'
import { WorkspaceMembersService } from '../services/workspace-members.service'

@Controller('workspace-members')
@UseGuards(JwtAuthGuard)
export class WorkspaceMembersController {
  constructor(private readonly service: WorkspaceMembersService) {}

  @Get()
  async list(@CurrentWorkspace() workspaceId: string) {
    return this.service.listByWorkspace(workspaceId)
  }

  @Post('invite')
  async invite(@CurrentWorkspace() workspaceId: string, @Body() body: { email: string; role?: string }) {
    return this.service.invite(workspaceId, body)
  }

  @Patch(':memberId')
  async update(@Param('memberId') memberId: string, @Body() body: { role: string }) {
    return this.service.updateRole(memberId, body.role)
  }

  @Delete(':memberId')
  async remove(@Param('memberId') memberId: string) {
    return this.service.remove(memberId)
  }

  @Get('roles')
  async roles() {
    return [
      { value: 'owner', label: 'Owner' },
      { value: 'admin', label: 'Admin' },
      { value: 'member', label: 'Member' },
    ]
  }
}