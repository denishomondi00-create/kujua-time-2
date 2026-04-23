import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AvailabilityRule, AvailabilityRuleSchema } from './schemas/availability-rule.schema';
import { AvailabilityException, AvailabilityExceptionSchema } from './schemas/availability-exception.schema';
import { AvailabilityController } from './controllers/availability.controller';
import { AvailabilityService } from './services/availability.service';
import { SlotEngineService } from './services/slot-engine.service';
import { AvailabilityRepository } from './repositories/availability.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AvailabilityRule.name, schema: AvailabilityRuleSchema },
      { name: AvailabilityException.name, schema: AvailabilityExceptionSchema },
    ]),
  ],
  controllers: [AvailabilityController],
  providers: [AvailabilityService, SlotEngineService, AvailabilityRepository],
  exports: [AvailabilityService, SlotEngineService],
})
export class AvailabilityModule {}
