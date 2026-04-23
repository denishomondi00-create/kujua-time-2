import { ForbiddenException } from '@nestjs/common';

export class ForbiddenActionException extends ForbiddenException {
  constructor(action = 'perform this action') {
    super(`You do not have permission to ${action}.`);
  }
}
