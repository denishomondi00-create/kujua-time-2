import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportsController } from './controllers/reports.controller';
import { ReportsService } from './services/reports.service';
import { ReportsRepository } from './repositories/reports.repository';
import { ReportSnapshot, ReportSnapshotSchema } from './schemas/report-snapshot.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: ReportSnapshot.name, schema: ReportSnapshotSchema }])],
  controllers: [ReportsController],
  providers: [ReportsService, ReportsRepository],
  exports: [ReportsService],
})
export class ReportsModule {}
