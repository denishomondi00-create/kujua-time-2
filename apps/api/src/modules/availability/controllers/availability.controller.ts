import { Controller, Get, Put, Post, Delete, Param, Query, Body, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard'
import { CurrentWorkspace } from '../../../shared/decorators/current-workspace.decorator'
import { AvailabilityService } from '../services/availability.service'

@Controller('availability')
@UseGuards(JwtAuthGuard)
export class AvailabilityController {
  constructor(private readonly service: AvailabilityService) {}

  @Get('rules')
  async getRules(@CurrentWorkspace() workspaceId: string, @Query('eventTypeId') eventTypeId?: string) {
    return this.service.getRules(workspaceId, eventTypeId)
  }

  @Put('rules/:eventTypeId')
  async setRules(@CurrentWorkspace() workspaceId: string, @Param('eventTypeId') eventTypeId: string, @Body() body: any) {
    return this.service.setRules(workspaceId, eventTypeId, body)
  }

  @Get('exceptions')
  async getExceptions(@CurrentWorkspace() workspaceId: string) {
    return this.service.getExceptions(workspaceId)
  }

  @Post('exceptions')
  async createException(@CurrentWorkspace() workspaceId: string, @Body() body: any) {
    return this.service.createException(workspaceId, body)
  }

  @Delete('exceptions/:exceptionId')
  async deleteException(@Param('exceptionId') id: string) {
    return this.service.deleteException(id)
  }
}