import { Controller, Get, Post, Param, Query, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentWorkspace } from '../../../shared/decorators/current-workspace.decorator';
import { InvoicesService } from '../services/invoices.service';

@Controller('invoices')
@UseGuards(JwtAuthGuard)
export class InvoicesController {
  constructor(private readonly service: InvoicesService) {}

  @Get() async list(@CurrentWorkspace() wid: string, @Query() q: any) { return this.service.list(wid, q); }
  @Post() async create(@CurrentWorkspace() wid: string, @Body() body: any) { return this.service.create(wid, body); }
  @Get(':invoiceId') async findOne(@Param('invoiceId') id: string) { return this.service.findById(id); }
  @Post(':invoiceId/send') async send(@Param('invoiceId') id: string) { return this.service.send(id); }
  @Post(':invoiceId/mark-paid') async markPaid(@Param('invoiceId') id: string) { return this.service.markPaid(id); }
  @Post(':invoiceId/void') async void_(@Param('invoiceId') id: string) { return this.service.void_(id); }
  @Get(':invoiceId/pdf') async pdf(@Param('invoiceId') id: string) { return this.service.getPdf(id); }
}
