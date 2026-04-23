import { Module, Global } from '@nestjs/common'
import { BullModule } from '@nestjs/bullmq'
import { ConfigService } from '@nestjs/config'
import { QueueRegistry } from './queue-registry'
import { QUEUE_NAMES } from './queue.constants'

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const host = (config.get<string>('REDIS_HOST') ?? 'localhost') as string
        const port = Number(config.get<number>('REDIS_PORT') ?? 6379)
        const password = (config.get<string>('REDIS_PASSWORD') ?? undefined) as string | undefined

        return {
          connection: {
            host,
            port,
            password,
            maxRetriesPerRequest: null,
          },
          defaultJobOptions: {
            attempts: 3,
            backoff: { type: 'exponential', delay: 2000 },
            removeOnComplete: { count: 1000, age: 86400 },
            removeOnFail: { count: 5000 },
          },
        }
      },
    }),
    ...Object.values(QUEUE_NAMES).map((name) => BullModule.registerQueue({ name })),
  ],
  providers: [QueueRegistry],
  exports: [BullModule, QueueRegistry],
})
export class BullMQModule {}
