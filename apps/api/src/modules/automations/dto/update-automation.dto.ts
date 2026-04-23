import { IsArray, IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';
export class UpdateAutomationDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsObject() trigger?: Record<string, unknown>;
  @IsOptional() @IsArray() actions?: Record<string, unknown>[];
  @IsOptional() @IsBoolean() enabled?: boolean;
}
