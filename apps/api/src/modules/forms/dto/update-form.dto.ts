import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
export class UpdateFormDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsArray() fields?: Record<string, unknown>[];
  @IsOptional() @IsBoolean() active?: boolean;
}
