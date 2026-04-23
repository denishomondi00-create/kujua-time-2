import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PackagePass, PackagePassSchema } from './schemas/package-pass.schema';
import { PackagesController } from './controllers/packages.controller';
import { PackagesService } from './services/packages.service';
import { PackagesRepository } from './repositories/packages.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: PackagePass.name, schema: PackagePassSchema }])],
  controllers: [PackagesController],
  providers: [PackagesService, PackagesRepository],
  exports: [PackagesService],
})
export class PackagesModule {}
