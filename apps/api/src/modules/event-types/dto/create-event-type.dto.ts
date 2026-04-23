import { IsString, IsInt, IsOptional, IsBoolean, IsArray, Min, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PaymentDto {
  @IsBoolean()
  required: boolean = false;

  @IsString()
  mode: string = 'free';

  @IsOptional()
  amount?: number | null;

  @IsString()
  currency: string = 'USD';
}

export class CreateEventTypeDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  slug: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Min(1)
  durationMinutes: number;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsBoolean()
  requiresApproval?: boolean;

  @IsArray()
  @IsString({ each: true })
  locations: string[];

  @ValidateNested()
  @Type(() => PaymentDto)
  payment: PaymentDto;
}
