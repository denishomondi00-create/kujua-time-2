import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AutomationRule, AutomationRuleSchema } from './schemas/automation-rule.schema';
import { AutomationExecution, AutomationExecutionSchema } from './schemas/automation-execution.schema';
import { AutomationsController } from './controllers/automations.controller';
import { AutomationsService } from './services/automations.service';
import { AutomationsRepository } from './repositories/automations.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AutomationRule.name, schema: AutomationRuleSchema },
      { name: AutomationExecution.name, schema: AutomationExecutionSchema },
    ]),
  ],
  controllers: [AutomationsController],
  providers: [AutomationsService, AutomationsRepository],
  exports: [AutomationsService],
})
export class AutomationsModule {}
