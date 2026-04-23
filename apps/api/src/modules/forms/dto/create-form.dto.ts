import { IsArray, IsOptional, IsString } from 'class-validator';
export class CreateFormDto {
  @IsString() name: string;
  @IsOptional() @IsString() description?: string;
  @IsArray() fields: Record<string, unknown>[];
}
