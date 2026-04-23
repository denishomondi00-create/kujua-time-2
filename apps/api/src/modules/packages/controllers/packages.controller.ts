import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentWorkspace } from '../../../shared/decorators/current-workspace.decorator';
import { PackagesService } from '../services/packages.service';
import { CreatePackageDto } from '../dto/create-package.dto';
import { ConsumePackageUnitDto } from '../dto/consume-package-unit.dto';
import { PackageMapper } from '../mappers/package.mapper';

@Controller('packages')
@UseGuards(JwtAuthGuard)
export class PackagesController {
  constructor(private readonly service: PackagesService) {}

  @Get()
  async list(@CurrentWorkspace() workspaceId: string) {
    const items = await this.service.list(workspaceId);
    return items.map(PackageMapper.toResponse);
  }

  @Post()
  async create(@CurrentWorkspace() workspaceId: string, @Body() dto: CreatePackageDto) {
    const item = await this.service.create({ ...dto, workspaceId });
    return PackageMapper.toResponse(item);
  }

  @Patch(':packageId/consume')
  async consume(@Param('packageId') packageId: string, @Body() dto: ConsumePackageUnitDto) {
    const item = await this.service.consume(packageId, dto.units ?? 1);
    return PackageMapper.toResponse(item);
  }
}
