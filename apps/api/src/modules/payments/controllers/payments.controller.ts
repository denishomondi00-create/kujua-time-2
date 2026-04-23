import { Controller, Get, Post, Param, Query, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentWorkspace } from '../../../shared/decorators/current-workspace.decorator';
import { PaymentsService } from '../services/payments.service';
import { PaginationQueryDto } from '../../../shared/dto/pagination.dto';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @Get() async list(@CurrentWorkspace() wid: string, @Query() q: PaginationQueryDto & { status?: string; provider?: string }) { return this.service.list(wid, q); }
  @Get('providers') async providers(@CurrentWorkspace() wid: string) { return this.service.getProviders(wid); }
  @Get('payouts') async payouts(@CurrentWorkspace() wid: string) { return this.service.getPayouts(wid); }
  @Get(':paymentId') async findOne(@Param('paymentId') id: string) { return this.service.findById(id); }
  @Post('refunds/:paymentId') async refund(@Param('paymentId') id: string, @Body() body: any) { return this.service.refund(id, body); }
  @Post('connect/stripe/start') async stripeStart(@CurrentWorkspace() wid: string) { return this.service.startStripeConnect(wid); }
  @Get('connect/stripe/callback') async stripeCb(@Query('code') code: string) { return this.service.handleStripeConnectCallback(code); }
  @Post('connect/paystack/start') async paystackStart(@CurrentWorkspace() wid: string) { return this.service.startPaystackConnect(wid); }
}
