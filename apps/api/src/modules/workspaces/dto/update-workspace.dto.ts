import { IsOptional, IsString } from 'class-validator';
export class UpdateWorkspaceDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() timezone?: string;
  @IsOptional() @IsString() plan?: string;
}
