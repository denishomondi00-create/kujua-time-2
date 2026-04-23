import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MeetingLocation, MeetingLocationSchema } from './schemas/meeting-location.schema';
import { MeetingLocationsController } from './controllers/meeting-locations.controller';
import { MeetingLocationsService } from './services/meeting-locations.service';
import { MeetingLocationsRepository } from './repositories/meeting-locations.repository';
@Module({
  imports: [MongooseModule.forFeature([{ name: MeetingLocation.name, schema: MeetingLocationSchema }])],
  controllers: [MeetingLocationsController],
  providers: [MeetingLocationsService, MeetingLocationsRepository],
  exports: [MeetingLocationsService],
})
export class MeetingLocationsModule {}
