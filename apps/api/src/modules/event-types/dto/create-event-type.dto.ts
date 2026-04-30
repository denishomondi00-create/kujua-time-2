import { IsString, IsInt, IsOptional, IsBoolean, IsArray, Min, MinLength, ValidateNested, IsIn, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class PaymentDto {
  @IsBoolean()
  required: boolean = false;

  @IsString()
  @IsIn(['free', 'deposit', 'full'])
  mode: string = 'free';

  @IsOptional()
  @IsNumber()
  @Min(0)
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

  @IsOptional()
  @IsString()
  @IsIn(['draft', 'published', 'archived'])
  status?: string;

  @IsArray()
  @IsString({ each: true })
  locations: string[];

  @ValidateNested()
  @Type(() => PaymentDto)
  payment: PaymentDto;
}
