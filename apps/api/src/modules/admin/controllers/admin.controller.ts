import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';
import { AdminService } from '../services/admin.service';
import { UpdateWorkspacePlanDto } from '../dto/update-workspace-plan.dto';
@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly service: AdminService) {}
  @Get('actions') async listActions() { return this.service.listActions(); }
  @Patch('workspaces/plan') async updateWorkspacePlan(@CurrentUser() user: any, @Body() dto: UpdateWorkspacePlanDto) { return this.service.updateWorkspacePlan(user?.id ?? user?.sub ?? 'system', dto.workspaceId, dto.plan); }
}
