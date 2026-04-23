import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventType, EventTypeSchema } from './schemas/event-type.schema';
import { EventTypesController } from './controllers/event-types.controller';
import { EventTypesService } from './services/event-types.service';
import { EventTypesRepository } from './repositories/event-types.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: EventType.name, schema: EventTypeSchema }])],
  controllers: [EventTypesController],
  providers: [EventTypesService, EventTypesRepository],
  exports: [EventTypesService],
})
export class EventTypesModule {}
