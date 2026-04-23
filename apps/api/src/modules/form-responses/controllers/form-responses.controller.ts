import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentWorkspace } from '../../../shared/decorators/current-workspace.decorator';
import { FormResponsesService } from '../services/form-responses.service';
import { SubmitFormResponseDto } from '../dto/submit-form-response.dto';
import { FormResponseMapper } from '../mappers/form-response.mapper';
@Controller('form-responses')
@UseGuards(JwtAuthGuard)
export class FormResponsesController {
  constructor(private readonly service: FormResponsesService) {}
  @Get() async list(@CurrentWorkspace() workspaceId: string) { const items = await this.service.list(workspaceId); return items.map(FormResponseMapper.toResponse); }
  @Get(':responseId') async findById(@Param('responseId') responseId: string) { const item = await this.service.findById(responseId); return FormResponseMapper.toResponse(item); }
  @Post() async submit(@CurrentWorkspace() workspaceId: string, @Body() dto: SubmitFormResponseDto) { const item = await this.service.submit(workspaceId, dto); return FormResponseMapper.toResponse(item); }
}
