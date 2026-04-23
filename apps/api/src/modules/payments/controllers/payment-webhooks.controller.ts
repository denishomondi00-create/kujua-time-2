import { Controller, Post, Body, Headers, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { PaymentsService } from '../services/payments.service';

@Controller('webhooks')
export class PaymentWebhooksController {
  constructor(private readonly service: PaymentsService) {}

  @Post('stripe') @HttpCode(HttpStatus.OK)
  async stripe(@Body() body: any, @Headers('stripe-signature') sig: string) { return this.service.handleStripeWebhook(body, sig); }

  @Post('paystack') @HttpCode(HttpStatus.OK)
  async paystack(@Body() body: any) { return this.service.handlePaystackWebhook(body); }
}
