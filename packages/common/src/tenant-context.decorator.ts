import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Extracts tenant_id from the JWT claims (set by JwtAuthGuard).
// Usage: async handler(@TenantContext() tenant: string)
export const TenantContext = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const req = ctx.switchToHttp().getRequest();
    return req.user?.tenant_id || 'default';
  },
);
