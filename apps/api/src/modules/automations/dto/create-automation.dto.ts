import { IsArray, IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';
export class CreateAutomationDto {
  @IsString() name: string;
  @IsObject() trigger: Record<string, unknown>;
  @IsArray() actions: Record<string, unknown>[];
  @IsOptional() @IsBoolean() enabled?: boolean;
}
