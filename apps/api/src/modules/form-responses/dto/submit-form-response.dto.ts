import { IsObject, IsOptional, IsString } from 'class-validator';
export class SubmitFormResponseDto {
  @IsString() formId: string;
  @IsOptional() @IsString() clientId?: string;
  @IsObject() answers: Record<string, unknown>;
}
