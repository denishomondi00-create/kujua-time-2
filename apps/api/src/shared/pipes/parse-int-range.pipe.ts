import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIntRangePipe implements PipeTransform<string | number | undefined, number | undefined> {
  constructor(private readonly min?: number, private readonly max?: number) {}

  transform(value: string | number | undefined): number | undefined {
    if (value === undefined || value === null || value === '') return undefined;

    const parsed = typeof value === 'number' ? value : Number(value);
    if (!Number.isInteger(parsed)) {
      throw new BadRequestException('Expected an integer value.');
    }

    if (this.min !== undefined && parsed < this.min) {
      throw new BadRequestException(`Value must be >= ${this.min}.`);
    }

    if (this.max !== undefined && parsed > this.max) {
      throw new BadRequestException(`Value must be <= ${this.max}.`);
    }

    return parsed;
  }
}
