import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentWorkspace } from '../../../shared/decorators/current-workspace.decorator';
import { MeetingLocationsService } from '../services/meeting-locations.service';
import { UpdateMeetingLocationDto } from '../dto/update-meeting-location.dto';
import { MeetingLocationMapper } from '../mappers/meeting-location.mapper';
@Controller('settings/meeting-locations')
@UseGuards(JwtAuthGuard)
export class MeetingLocationsController {
  constructor(private readonly service: MeetingLocationsService) {}
  @Get() async list(@CurrentWorkspace() workspaceId: string) { const items = await this.service.list(workspaceId); return items.map(MeetingLocationMapper.toResponse); }
  @Patch() async upsert(@CurrentWorkspace() workspaceId: string, @Body() dto: UpdateMeetingLocationDto) { const item = await this.service.upsert(workspaceId, dto); return MeetingLocationMapper.toResponse(item); }
}
