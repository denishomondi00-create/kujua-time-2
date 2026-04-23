import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectedCalendar, ConnectedCalendarSchema } from './schemas/connected-calendar.schema';
import { CalendarsController } from './controllers/calendars.controller';
import { CalendarsService } from './services/calendars.service';
import { CalendarsRepository } from './repositories/calendars.repository';
@Module({
  imports: [MongooseModule.forFeature([{ name: ConnectedCalendar.name, schema: ConnectedCalendarSchema }])],
  controllers: [CalendarsController],
  providers: [CalendarsService, CalendarsRepository],
  exports: [CalendarsService],
})
export class CalendarsModule {}
