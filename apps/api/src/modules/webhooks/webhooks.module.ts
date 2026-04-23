import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebhookConfig, WebhookConfigSchema } from './schemas/webhook-config.schema';
import { WebhooksController } from './controllers/webhooks.controller';
import { WebhooksService } from './services/webhooks.service';
import { WebhooksRepository } from './repositories/webhooks.repository';
@Module({
  imports: [MongooseModule.forFeature([{ name: WebhookConfig.name, schema: WebhookConfigSchema }])],
  controllers: [WebhooksController],
  providers: [WebhooksService, WebhooksRepository],
  exports: [WebhooksService],
})
export class WebhooksModule {}
