import { IsOptional, IsString, MinLength } from 'class-validator';
export class CreateClientNoteDto {
  @IsString() clientId: string;
  @IsString() @MinLength(1) content: string;
  @IsOptional() @IsString() createdByName?: string;
}
