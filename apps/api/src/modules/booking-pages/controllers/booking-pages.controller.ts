import { Controller, Get, Patch, Post, Param, Body, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard'
import { CurrentWorkspace } from '../../../shared/decorators/current-workspace.decorator'
import { BookingPagesService } from '../services/booking-pages.service'

@Controller('booking-pages')
@UseGuards(JwtAuthGuard)
export class BookingPagesController {
  constructor(private readonly service: BookingPagesService) {}

  @Get()
  async list(@CurrentWorkspace() workspaceId: string) {
    return this.service.listByWorkspace(workspaceId)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.service.findById(id)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.service.update(id, body)
  }

  @Post(':id/publish')
  async publish(@Param('id') id: string) {
    return this.service.publish(id)
  }
}