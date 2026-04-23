import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseBoolPipe implements PipeTransform<string | boolean | undefined, boolean | undefined> {
  transform(value: string | boolean | undefined): boolean | undefined {
    if (value === undefined || value === null || value === '') return undefined;
    if (typeof value === 'boolean') return value;

    const normalized = value.toLowerCase();
    if (['true', '1', 'yes'].includes(normalized)) return true;
    if (['false', '0', 'no'].includes(normalized)) return false;

    throw new BadRequestException('Expected a boolean query value.');
  }
}
