import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

/**
 * Standard API response envelope.
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  meta?: {
    page?: number;
    pageSize?: number;
    total?: number;
    totalPages?: number;
  };
}

/**
 * ResponseTransformInterceptor
 *
 * Wraps all successful API responses in a standard { success, data, meta } envelope.
 * Controllers can return raw data; this interceptor wraps it automatically.
 *
 * If a controller returns an object with a `meta` property, it's extracted
 * into the envelope's meta field.
 *
 * Usage: Apply globally or per-controller with @UseInterceptors().
 */
@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((responseData) => {
        // If the response is already wrapped, pass through
        if (responseData && typeof responseData === 'object' && 'success' in responseData) {
          return responseData;
        }

        // Extract meta from paginated responses
        let data = responseData;
        let meta: ApiResponse['meta'] | undefined;

        if (responseData && typeof responseData === 'object' && 'meta' in responseData) {
          const { meta: extractedMeta, ...rest } = responseData;
          meta = extractedMeta;
          data = rest.data ?? rest.items ?? rest;
        }

        return {
          success: true,
          data,
          ...(meta ? { meta } : {}),
        };
      }),
    );
  }
}
