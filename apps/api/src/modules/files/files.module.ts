import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesController } from './controllers/files.controller';
import { FilesService } from './services/files.service';
import { FilesRepository } from './repositories/files.repository';
import { FileRecord, FileRecordSchema } from './schemas/file-record.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: FileRecord.name, schema: FileRecordSchema }])],
  controllers: [FilesController],
  providers: [FilesService, FilesRepository],
  exports: [FilesService],
})
export class FilesModule {}
