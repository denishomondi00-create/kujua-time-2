import { HttpException, HttpStatus } from '@nestjs/common';

export class DomainException extends HttpException {
  constructor(message: string, status: HttpStatus = HttpStatus.UNPROCESSABLE_ENTITY) {
    super({ message, code: 'DOMAIN_ERROR' }, status);
  }
}

export class ConflictException extends DomainException {
  constructor(message = 'Resource conflict.') {
    super(message, HttpStatus.CONFLICT);
  }
}

export class ResourceNotFoundException extends DomainException {
  constructor(resource = 'Resource') {
    super(`${resource} not found.`, HttpStatus.NOT_FOUND);
  }
}
