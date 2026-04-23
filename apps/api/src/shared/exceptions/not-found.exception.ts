import { NotFoundException } from '@nestjs/common';

export class EntityNotFoundException extends NotFoundException {
  constructor(entity: string, identifier?: string) {
    super(identifier ? `${entity} not found for identifier ${identifier}.` : `${entity} not found.`);
  }
}
