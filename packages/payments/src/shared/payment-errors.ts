export class PaymentGatewayError extends Error {
  constructor(
    message: string,
    public readonly provider: string,
    public readonly code?: string,
    public readonly retryable: boolean = false,
  ) {
    super(message);
    this.name = 'PaymentGatewayError';
  }
}

export class WebhookVerificationError extends Error {
  constructor(message: string, public readonly provider: string) {
    super(message);
    this.name = 'WebhookVerificationError';
  }
}

export class PaymentNotFoundError extends Error {
  constructor(public readonly providerPaymentId: string) {
    super(`Payment not found: ${providerPaymentId}`);
    this.name = 'PaymentNotFoundError';
  }
}
