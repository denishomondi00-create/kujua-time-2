import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard'
import { CurrentWorkspace } from '../../../shared/decorators/current-workspace.decorator'
import { EventTypesService } from '../services/event-types.service'
import { CreateEventTypeDto } from '../dto/create-event-type.dto'
import { UpdateEventTypeDto } from '../dto/update-event-type.dto'
import { PaginationQueryDto } from '../../../shared/dto/pagination.dto'
import { EventTypeMapper } from '../mappers/event-type.mapper'

@Controller('event-types')
@UseGuards(JwtAuthGuard)
export class EventTypesController {
  constructor(private readonly service: EventTypesService) {}

  @Get()
  async list(@CurrentWorkspace() workspaceId: string, @Query() query: PaginationQueryDto & { status?: string }) {
    const result = await this.service.list(workspaceId, query)
    return { ...result, items: result.items.map(EventTypeMapper.toResponse) }
  }

  @Post()
  async create(@CurrentWorkspace() workspaceId: string, @Body() dto: CreateEventTypeDto) {
    return EventTypeMapper.toResponse(await this.service.create(workspaceId, dto))
  }

  @Get(':eventTypeId')
  async findOne(@Param('eventTypeId') id: string) {
    return EventTypeMapper.toResponse(await this.service.findById(id))
  }

  @Patch(':eventTypeId')
  async update(@Param('eventTypeId') id: string, @Body() dto: UpdateEventTypeDto) {
    return EventTypeMapper.toResponse(await this.service.update(id, dto))
  }

  @Delete(':eventTypeId')
  async delete(@Param('eventTypeId') id: string) {
    return EventTypeMapper.toResponse(await this.service.delete(id))
  }

  @Post(':eventTypeId/duplicate')
  async duplicate(@Param('eventTypeId') id: string) {
    return EventTypeMapper.toResponse(await this.service.duplicate(id))
  }

  @Post(':eventTypeId/archive')
  async archive(@Param('eventTypeId') id: string) {
    return EventTypeMapper.toResponse(await this.service.archive(id))
  }

  @Get(':eventTypeId/preview')
  async preview(@Param('eventTypeId') id: string) {
    return this.service.getPreview(id)
  }
}
