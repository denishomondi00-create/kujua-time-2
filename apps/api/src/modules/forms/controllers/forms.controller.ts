import { Controller, Get, Post, Patch, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentWorkspace } from '../../../shared/decorators/current-workspace.decorator';
import { FormsService } from '../services/forms.service';
import { PaginationQueryDto } from '../../../shared/dto/pagination.dto';

@Controller('forms')
@UseGuards(JwtAuthGuard)
export class FormsController {
  constructor(private readonly service: FormsService) {}

  @Get()
  async list(@CurrentWorkspace() workspaceId: string, @Query() query: PaginationQueryDto) { return this.service.list(workspaceId, query); }

  @Post()
  async create(@CurrentWorkspace() workspaceId: string, @Body() body: any) { return this.service.create(workspaceId, body); }

  @Get(':formId')
  async findOne(@Param('formId') id: string) { return this.service.findById(id); }

  @Patch(':formId')
  async update(@Param('formId') id: string, @Body() body: any) { return this.service.update(id, body); }

  @Delete(':formId')
  async delete(@Param('formId') id: string) { return this.service.delete(id); }
}
