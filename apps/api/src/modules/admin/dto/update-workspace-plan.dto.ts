import { IsIn, IsString } from 'class-validator';
export class UpdateWorkspacePlanDto {
  @IsString() workspaceId: string;
  @IsIn(['free','standard','pro','premium']) plan: string;
}
