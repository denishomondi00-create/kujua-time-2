import { Controller, Get, Post, Patch, Param, Query, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentWorkspace } from '../../../shared/decorators/current-workspace.decorator';
import { ClientsService } from '../services/clients.service';
import { PaginationQueryDto } from '../../../shared/dto/pagination.dto';

@Controller('clients')
@UseGuards(JwtAuthGuard)
export class ClientsController {
  constructor(private readonly service: ClientsService) {}

  @Get()
  async list(@CurrentWorkspace() workspaceId: string, @Query() query: PaginationQueryDto & { stage?: string }) {
    return this.service.list(workspaceId, query);
  }

  @Post()
  async create(@CurrentWorkspace() workspaceId: string, @Body() body: any) { return this.service.create(workspaceId, body); }

  @Get('export')
  async export(@CurrentWorkspace() workspaceId: string) { return this.service.export(workspaceId); }

  @Get(':clientId')
  async findOne(@Param('clientId') id: string) { return this.service.findById(id); }

  @Patch(':clientId')
  async update(@Param('clientId') id: string, @Body() body: any) { return this.service.update(id, body); }

  @Post(':clientId/block')
  async block(@Param('clientId') id: string) { return this.service.block(id); }

  @Post(':clientId/unblock')
  async unblock(@Param('clientId') id: string) { return this.service.unblock(id); }
}
