import { IsIn, IsOptional, IsString } from 'class-validator';
export class ExportReportDto {
  @IsIn(['overview','bookings','revenue','no-shows']) report: string;
  @IsOptional() @IsString() format?: string;
}
