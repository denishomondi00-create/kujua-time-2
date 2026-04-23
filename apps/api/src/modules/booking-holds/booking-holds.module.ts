import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingHold, BookingHoldSchema } from './schemas/booking-hold.schema';
import { BookingHoldsController } from './controllers/booking-holds.controller';
import { BookingHoldsService } from './services/booking-holds.service';
import { BookingHoldsRepository } from './repositories/booking-holds.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: BookingHold.name, schema: BookingHoldSchema }])],
  controllers: [BookingHoldsController],
  providers: [BookingHoldsService, BookingHoldsRepository],
  exports: [BookingHoldsService],
})
export class BookingHoldsModule {}
