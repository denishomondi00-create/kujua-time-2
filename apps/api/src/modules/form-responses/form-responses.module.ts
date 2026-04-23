import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FormResponse, FormResponseSchema } from './schemas/form-response.schema';
import { FormResponsesController } from './controllers/form-responses.controller';
import { FormResponsesService } from './services/form-responses.service';
import { FormResponsesRepository } from './repositories/form-responses.repository';
@Module({
  imports: [MongooseModule.forFeature([{ name: FormResponse.name, schema: FormResponseSchema }])],
  controllers: [FormResponsesController],
  providers: [FormResponsesService, FormResponsesRepository],
  exports: [FormResponsesService],
})
export class FormResponsesModule {}
