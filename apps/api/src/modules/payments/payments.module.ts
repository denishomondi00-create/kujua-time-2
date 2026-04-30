import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './schemas/payment.schema';
import { PaymentsController } from './controllers/payments.controller';
import { PublicPaymentsController } from './controllers/public-payments.controller';
import { PaymentWebhooksController } from './controllers/payment-webhooks.controller';
import { PaymentsService } from './services/payments.service';
import { PaymentsRepository } from './repositories/payments.repository';
import { BookingHoldsModule } from '../booking-holds/booking-holds.module';
import { EventTypesModule } from '../event-types/event-types.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    BookingHoldsModule,
    EventTypesModule,
  ],
  controllers: [PaymentsController, PublicPaymentsController, PaymentWebhooksController],
  providers: [PaymentsService, PaymentsRepository],
  exports: [PaymentsService],
})
export class PaymentsModule {}
