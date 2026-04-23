import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CalendarSyncService } from '../services/calendar-sync.service';
import { RunCalendarSyncDto } from '../dto/run-calendar-sync.dto';
@Controller('calendar-sync')
@UseGuards(JwtAuthGuard)
export class CalendarSyncController {
  constructor(private readonly service: CalendarSyncService) {}
  @Post(':connectedCalendarId/run') async run(@Param('connectedCalendarId') connectedCalendarId: string, @Body() dto: RunCalendarSyncDto) { return this.service.run(connectedCalendarId, dto.forceFullSync ?? false); }
  @Get(':connectedCalendarId/state') async state(@Param('connectedCalendarId') connectedCalendarId: string) { return this.service.getState(connectedCalendarId); }
}
