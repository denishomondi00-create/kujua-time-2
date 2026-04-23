import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { AuditService } from '../services/audit.service';
import { AuditQueryDto } from '../dto/audit-query.dto';
import { AuditMapper } from '../mappers/audit.mapper';
@Controller('audit')
@UseGuards(JwtAuthGuard)
export class AuditController {
  constructor(private readonly service: AuditService) {}
  @Get() async list(@Query() query: AuditQueryDto) { const items = await this.service.list(query); return items.map(AuditMapper.toResponse); }
}
