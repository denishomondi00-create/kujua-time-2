import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingPage, BookingPageSchema } from './schemas/booking-page.schema';
import { BookingPagesController } from './controllers/booking-pages.controller';
import { BookingPagesService } from './services/booking-pages.service';
import { BookingPagesRepository } from './repositories/booking-pages.repository';
import { WorkspacesModule } from '../workspaces/workspaces.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BookingPage.name, schema: BookingPageSchema }]),
    WorkspacesModule,
  ],
  controllers: [BookingPagesController],
  providers: [BookingPagesService, BookingPagesRepository],
  exports: [BookingPagesService],
})
export class BookingPagesModule {}
