import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from './pagination.dto';

export class ListQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';
}
