import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentWorkspace } from '../../../shared/decorators/current-workspace.decorator';
import { CalendarsService } from '../services/calendars.service';
import { ConnectedCalendarMapper } from '../mappers/connected-calendar.mapper';
@Controller('calendars')
@UseGuards(JwtAuthGuard)
export class CalendarsController {
  constructor(private readonly service: CalendarsService) {}
  @Post('google/connect/start') async start(@CurrentWorkspace() workspaceId: string) { return this.service.startGoogleConnect(workspaceId); }
  @Get() async list(@CurrentWorkspace() workspaceId: string) { const items = await this.service.list(workspaceId); return items.map(ConnectedCalendarMapper.toResponse); }
  @Delete(':connectedCalendarId') async disconnect(@Param('connectedCalendarId') connectedCalendarId: string) { return this.service.disconnect(connectedCalendarId); }
}
