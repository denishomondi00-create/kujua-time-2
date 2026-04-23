import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentWorkspace } from '../../../shared/decorators/current-workspace.decorator';
import { ReportsService } from '../services/reports.service';
import { ExportReportDto } from '../dto/export-report.dto';
@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly service: ReportsService) {}
  @Get('overview') async overview(@CurrentWorkspace() workspaceId: string) { return this.service.getOverview(workspaceId); }
  @Get('bookings') async bookings(@CurrentWorkspace() workspaceId: string) { return this.service.export(workspaceId, 'bookings'); }
  @Get('revenue') async revenue(@CurrentWorkspace() workspaceId: string) { return this.service.export(workspaceId, 'revenue'); }
  @Get('no-shows') async noShows(@CurrentWorkspace() workspaceId: string) { return this.service.export(workspaceId, 'no-shows'); }
  @Post('export') async exportReport(@CurrentWorkspace() workspaceId: string, @Body() dto: ExportReportDto) { return this.service.export(workspaceId, dto.report); }
}
