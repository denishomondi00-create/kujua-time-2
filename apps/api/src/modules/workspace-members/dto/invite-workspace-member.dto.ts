import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';
export class InviteWorkspaceMemberDto {
  @IsEmail() email: string;
  @IsIn(['owner','admin','manager','staff','viewer']) role: string;
  @IsOptional() @IsString() message?: string;
}
