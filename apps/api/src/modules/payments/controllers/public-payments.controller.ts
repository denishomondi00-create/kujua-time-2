import { Controller, Post, Get, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { PaymentsService } from '../services/payments.service';

@Controller('public/payments')
export class PublicPaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @Post('checkout') @HttpCode(HttpStatus.OK)
  async checkout(@Body() body: { holdId: string; provider?: string }) { return this.service.createCheckout(body.holdId, body.provider); }

  @Get('status/:paymentAttemptId')
  async status(@Param('paymentAttemptId') id: string) { return this.service.getPaymentStatus(id); }
}
