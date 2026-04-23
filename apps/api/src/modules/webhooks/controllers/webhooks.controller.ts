import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentWorkspace } from '../../../shared/decorators/current-workspace.decorator';
import { WebhooksService } from '../services/webhooks.service';

@Controller('settings/webhooks')
@UseGuards(JwtAuthGuard)
export class WebhooksController {
  constructor(private readonly service: WebhooksService) {}

  @Get() async list(@CurrentWorkspace() wid: string) { return this.service.list(wid); }
  @Post() async create(@CurrentWorkspace() wid: string, @Body() body: any) { return this.service.create(wid, body); }
  @Delete(':webhookId') async delete(@Param('webhookId') id: string) { return this.service.delete(id); }
}
