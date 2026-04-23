import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard'
import { CurrentWorkspace } from '../../../shared/decorators/current-workspace.decorator'
import { WorkspacesService } from '../services/workspaces.service'

@Controller('workspaces')
@UseGuards(JwtAuthGuard)
export class WorkspacesController {
  constructor(private readonly service: WorkspacesService) {}

  @Get('current')
  async getCurrent(@CurrentWorkspace() workspaceId: string) {
    return this.service.findById(workspaceId)
  }

  @Patch('current')
  async updateCurrent(@CurrentWorkspace() workspaceId: string, @Body() body: any) {
    return this.service.update(workspaceId, body)
  }

  @Get('current/branding')
  async getBranding(@CurrentWorkspace() workspaceId: string) {
    return this.service.getBranding(workspaceId)
  }

  @Patch('current/branding')
  async updateBranding(@CurrentWorkspace() workspaceId: string, @Body() body: any) {
    return this.service.updateBranding(workspaceId, body)
  }

  @Get('current/plan')
  async getPlan(@CurrentWorkspace() workspaceId: string) {
    const ws = await this.service.findById(workspaceId)
    return { plan: ws.plan }
  }
}