import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { BookingsController } from './controllers/bookings.controller';
import { PublicBookingsController } from './controllers/public-bookings.controller';
import { AdminBookingsController } from './controllers/admin-bookings.controller';
import { BookingsService } from './services/bookings.service';
import { BookingConfirmationService } from './services/booking-confirmation.service';
import { BookingCancellationService } from './services/booking-cancellation.service';
import { BookingRescheduleService } from './services/booking-reschedule.service';
import { BookingQueryService } from './services/booking-query.service';
import { BookingsRepository } from './repositories/bookings.repository';
import { EventTypesModule } from '../event-types/event-types.module';
import { AvailabilityModule } from '../availability/availability.module';
import { ClientsModule } from '../clients/clients.module';
import { BookingHoldsModule } from '../booking-holds/booking-holds.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
    EventTypesModule,
    AvailabilityModule,
    ClientsModule,
    BookingHoldsModule,
  ],
  controllers: [BookingsController, PublicBookingsController, AdminBookingsController],
  providers: [
    BookingsService,
    BookingConfirmationService,
    BookingCancellationService,
    BookingRescheduleService,
    BookingQueryService,
    BookingsRepository,
  ],
  exports: [BookingsService, BookingQueryService],
})
export class BookingsModule {}
