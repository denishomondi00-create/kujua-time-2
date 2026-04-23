import { IsBoolean, IsOptional } from 'class-validator';
export class RunCalendarSyncDto {
  @IsOptional() @IsBoolean() forceFullSync?: boolean;
}
