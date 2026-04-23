import { BadGatewayException } from '@nestjs/common';

export class IntegrationException extends BadGatewayException {
  constructor(provider: string, message = 'Upstream provider request failed.') {
    super(`${provider}: ${message}`);
  }
}
