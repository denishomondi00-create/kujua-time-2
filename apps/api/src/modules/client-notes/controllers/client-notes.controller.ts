import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentWorkspace } from '../../../shared/decorators/current-workspace.decorator';
import { ClientNotesService } from '../services/client-notes.service';
import { CreateClientNoteDto } from '../dto/create-client-note.dto';
import { UpdateClientNoteDto } from '../dto/update-client-note.dto';
import { ClientNoteMapper } from '../mappers/client-note.mapper';

@Controller('clients/:clientId/notes')
@UseGuards(JwtAuthGuard)
export class ClientNotesController {
  constructor(private readonly service: ClientNotesService) {}

  @Get()
  async list(@CurrentWorkspace() workspaceId: string, @Param('clientId') clientId: string) {
    const items = await this.service.listByClient(workspaceId, clientId);
    return items.map(ClientNoteMapper.toResponse);
  }

  @Post()
  async create(@CurrentWorkspace() workspaceId: string, @Param('clientId') clientId: string, @Body() dto: CreateClientNoteDto) {
    const item = await this.service.create({ ...dto, workspaceId, clientId });
    return ClientNoteMapper.toResponse(item);
  }

  @Patch(':noteId')
  async update(@Param('noteId') noteId: string, @Body() dto: UpdateClientNoteDto) {
    const item = await this.service.update(noteId, dto);
    return ClientNoteMapper.toResponse(item);
  }
}
