import { IsArray, IsOptional, IsString } from 'class-validator';
export class CreateInvoiceDto {
  @IsString() clientId: string;
  @IsOptional() @IsString() bookingId?: string;
  @IsArray() items: Record<string, unknown>[];
  @IsOptional() @IsString() currency?: string;
}
