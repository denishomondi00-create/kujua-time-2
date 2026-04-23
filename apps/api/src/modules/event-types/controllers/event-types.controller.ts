import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard'
import { CurrentWorkspace } from '../../../shared/decorators/current-workspace.decorator'
import { EventTypesService } from '../services/event-types.service'
import { CreateEventTypeDto } from '../dto/create-event-type.dto'
import { UpdateEventTypeDto } from '../dto/update-event-type.dto'
import { PaginationQueryDto } from '../../../shared/dto/pagination.dto'

@Controller('event-types')
@UseGuards(JwtAuthGuard)
export class EventTypesController {
  constructor(private readonly service: EventTypesService) {}

  @Get()
  async list(@CurrentWorkspace() workspaceId: string, @Query() query: PaginationQueryDto & { status?: string }) {
    return this.service.list(workspaceId, query)
  }

  @Post()
  async create(@CurrentWorkspace() workspaceId: string, @Body() dto: CreateEventTypeDto) {
    return this.service.create(workspaceId, dto)
  }

  @Get(':eventTypeId')
  async findOne(@Param('eventTypeId') id: string) {
    return this.service.findById(id)
  }

  @Patch(':eventTypeId')
  async update(@Param('eventTypeId') id: string, @Body() dto: UpdateEventTypeDto) {
    return this.service.update(id, dto)
  }

  @Delete(':eventTypeId')
  async delete(@Param('eventTypeId') id: string) {
    return this.service.delete(id)
  }

  @Post(':eventTypeId/duplicate')
  async duplicate(@Param('eventTypeId') id: string) {
    return this.service.duplicate(id)
  }

  @Post(':eventTypeId/archive')
  async archive(@Param('eventTypeId') id: string) {
    return this.service.archive(id)
  }

  @Get(':eventTypeId/preview')
  async preview(@Param('eventTypeId') id: string) {
    return this.service.getPreview(id)
  }
}