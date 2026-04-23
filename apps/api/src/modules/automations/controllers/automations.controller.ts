import { Controller, Get, Post, Patch, Param, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentWorkspace } from '../../../shared/decorators/current-workspace.decorator';
import { AutomationsService } from '../services/automations.service';

@Controller('automations')
@UseGuards(JwtAuthGuard)
export class AutomationsController {
  constructor(private readonly service: AutomationsService) {}

  @Get() async list(@CurrentWorkspace() wid: string) { return this.service.list(wid); }
  @Get('templates') async templates() { return this.service.templates(); }
  @Get('logs') async logs(@CurrentWorkspace() wid: string) { return this.service.logs(wid); }
  @Get('logs/:executionId') async logDetail(@Param('executionId') id: string) { return this.service.logDetail(id); }
  @Post() async create(@CurrentWorkspace() wid: string, @Body() body: any) { return this.service.create(wid, body); }
  @Get(':automationId') async findOne(@Param('automationId') id: string) { return this.service.findById(id); }
  @Patch(':automationId') async update(@Param('automationId') id: string, @Body() body: any) { return this.service.update(id, body); }
  @Post(':automationId/toggle') @HttpCode(HttpStatus.OK) async toggle(@Param('automationId') id: string) { return this.service.toggle(id); }
  @Post('test') @HttpCode(HttpStatus.OK) async test(@Body() body: { automationId: string }) { return this.service.test(body.automationId); }
}
