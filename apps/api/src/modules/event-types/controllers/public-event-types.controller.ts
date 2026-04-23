import { Controller, Get, Param, Query } from '@nestjs/common';
import { EventTypesService } from '../services/event-types.service';
import { SlotEngineService } from '../../availability/services/slot-engine.service';

@Controller('public/event-types')
export class PublicEventTypesController {
  constructor(
    private readonly eventTypesService: EventTypesService,
    private readonly slotEngine: SlotEngineService,
  ) {}

  @Get(':publicEventId/slots')
  async getSlots(
    @Param('publicEventId') id: string,
    @Query('date') date: string,
    @Query('tz') tz: string,
  ) {
    const eventType = await this.eventTypesService.findById(id);
    return this.slotEngine.computeSlots({
      workspaceId: eventType.workspaceId,
      eventTypeId: eventType.id,
      date,
      timezone: tz,
      durationMinutes: eventType.durationMinutes,
      rules: null,
      exceptions: [],
      existingBookings: [],
    });
  }
}
