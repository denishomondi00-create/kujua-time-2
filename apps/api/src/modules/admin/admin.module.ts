import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';
import { AdminRepository } from './repositories/admin.repository';
import { AdminAction, AdminActionSchema } from './schemas/admin-action.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: AdminAction.name, schema: AdminActionSchema }])],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository],
  exports: [AdminService],
})
export class AdminModule {}
