import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientNote, ClientNoteSchema } from './schemas/client-note.schema';
import { ClientNotesController } from './controllers/client-notes.controller';
import { ClientNotesService } from './services/client-notes.service';
import { ClientNotesRepository } from './repositories/client-notes.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: ClientNote.name, schema: ClientNoteSchema }])],
  controllers: [ClientNotesController],
  providers: [ClientNotesService, ClientNotesRepository],
  exports: [ClientNotesService],
})
export class ClientNotesModule {}
