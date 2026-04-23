import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentWorkspace } from '../../../shared/decorators/current-workspace.decorator';
import { NotificationsService } from '../services/notifications.service';

@Controller('settings/notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @Get() async getSettings(@CurrentWorkspace() wid: string) { return this.service.getSettings(wid); }
  @Patch() async updateSettings(@CurrentWorkspace() wid: string, @Body() body: any) { return this.service.updateSettings(wid, body); }
}
