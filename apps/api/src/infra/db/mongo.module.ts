import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { TransactionManager } from './transaction.manager';
import { IndexesBootstrap } from './indexes.bootstrap';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI', 'mongodb://localhost:27017/kujua-time'),
        retryWrites: true,
        w: 'majority',
        // Replica set required for transactions
        ...(config.get<string>('MONGODB_REPLICA_SET')
          ? { replicaSet: config.get<string>('MONGODB_REPLICA_SET') }
          : {}),
      }),
    }),
  ],
  providers: [TransactionManager, IndexesBootstrap],
  exports: [MongooseModule, TransactionManager],
})
export class MongoModule {}
