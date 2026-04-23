import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

/**
 * TrimStringsPipe
 *
 * Recursively trims all string values in the incoming body.
 * Prevents leading/trailing whitespace in names, emails, slugs, etc.
 * Apply globally or per-route.
 */
@Injectable()
export class TrimStringsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body' || typeof value !== 'object' || value === null) {
      return value;
    }
    return this.trimDeep(value);
  }

  private trimDeep(obj: any): any {
    if (typeof obj === 'string') return obj.trim();
    if (Array.isArray(obj)) return obj.map((item) => this.trimDeep(item));
    if (typeof obj === 'object' && obj !== null) {
      const trimmed: Record<string, any> = {};
      for (const [key, val] of Object.entries(obj)) {
        trimmed[key] = this.trimDeep(val);
      }
      return trimmed;
    }
    return obj;
  }
}
