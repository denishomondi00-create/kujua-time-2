import { IsBoolean, IsIn, IsOptional } from 'class-validator';
export class UpdateWorkspaceMemberDto {
  @IsOptional() @IsIn(['owner','admin','manager','staff','viewer']) role?: string;
  @IsOptional() @IsBoolean() isActive?: boolean;
}
