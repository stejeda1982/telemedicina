// Mock stub for @telemed/common - enables unit tests without pnpm install.
// The real OutboxService / NatsClient are injected as jest mocks via the
// Nest testing module's useValue provider.

export class OutboxService {
  publish = jest.fn().mockResolvedValue(undefined);
}

export class NatsClient {
  publish = jest.fn().mockResolvedValue(undefined);
  subscribe = jest.fn().mockResolvedValue(undefined);
  flush = jest.fn().mockResolvedValue(undefined);
  drain = jest.fn().mockResolvedValue(undefined);
  close = jest.fn().mockResolvedValue(undefined);
}

export class NatsModule {
  static forRoot = jest.fn().mockReturnValue({});
}

export class CloudEventBuilder {
  static build = jest.fn().mockReturnValue({});
}

export const TENANT_CONTEXT = 'tenant_context';
export function TenantContext() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {};
}
