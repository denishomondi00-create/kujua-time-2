import { IsArray, IsInt, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
class AvailabilityWindowDto {
  @IsString() dayOfWeek: string;
  @IsString() startTime: string;
  @IsString() endTime: string;
}
export class UpdateAvailabilityRulesDto {
  @IsArray() @ValidateNested({ each: true }) @Type(() => AvailabilityWindowDto) windows: AvailabilityWindowDto[];
  @IsOptional() @IsInt() @Min(0) bufferBeforeMinutes?: number;
  @IsOptional() @IsInt() @Min(0) bufferAfterMinutes?: number;
  @IsOptional() @IsInt() @Min(0) minNoticeMinutes?: number;
}
