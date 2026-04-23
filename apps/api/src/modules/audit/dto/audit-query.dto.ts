import { IsOptional, IsString } from 'class-validator';
export class AuditQueryDto {
  @IsOptional() @IsString() actorId?: string;
  @IsOptional() @IsString() event?: string;
  @IsOptional() @IsString() resourceType?: string;
}
