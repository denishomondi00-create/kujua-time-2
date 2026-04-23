import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CalendarSyncState, CalendarSyncStateSchema } from './schemas/calendar-sync-state.schema';
import { CalendarSyncController } from './controllers/calendar-sync.controller';
import { CalendarSyncService } from './services/calendar-sync.service';
import { CalendarSyncRepository } from './repositories/calendar-sync.repository';
@Module({
  imports: [MongooseModule.forFeature([{ name: CalendarSyncState.name, schema: CalendarSyncStateSchema }])],
  controllers: [CalendarSyncController],
  providers: [CalendarSyncService, CalendarSyncRepository],
  exports: [CalendarSyncService],
})
export class CalendarSyncModule {}
