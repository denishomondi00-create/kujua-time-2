import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { WorkspaceRoleGuard } from '../../../shared/guards/workspace-role.guard';
import { CurrentWorkspace } from '../../../shared/decorators/current-workspace.decorator';
import { BookingQueryService } from '../services/booking-query.service';

@Controller('admin/bookings')
@UseGuards(JwtAuthGuard, WorkspaceRoleGuard)
@Roles('owner', 'admin')
export class AdminBookingsController {
  constructor(private readonly queryService: BookingQueryService) {}

  @Get()
  async list(@CurrentWorkspace() workspaceId: string, @Query() query: any) {
    return this.queryService.list(workspaceId, query);
  }
}
