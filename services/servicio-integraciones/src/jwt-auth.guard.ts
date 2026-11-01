import {
  CanActivate, ExecutionContext, Injectable, UnauthorizedException, Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';
import * as jwt from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';

// Validates JWT access tokens issued by WSO2 Identity Server using the JWKS endpoint.
// Tokens are RS256-signed; the corresponding public key is fetched and cached.
@Injectable()
export class JwtAuthGuard implements CanActivate {
  private client: any;
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly config: ConfigService,
  ) {
    const jwksUri = this.config.get<string>('WSO2_IS_JWKS_URI');
    if (jwksUri) {
      this.client = jwksClient({ jwksUri, cache: true, cacheMaxEntries: 5, cacheMaxAge: 600000 });
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(), context.getClass(),
    ]);
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest();
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!token) throw new UnauthorizedException('Missing Bearer token');

    try {
      const decoded: any = jwt.decode(token, { complete: true });
      if (!decoded || decoded.header.alg !== 'RS256') {
        throw new UnauthorizedException('Unsupported token algorithm');
      }
      const key = await this.getKey(decoded.header.kid);
      const payload: any = jwt.verify(token, key, {
        issuer: this.config.get<string>('WSO2_IS_OAUTH_ISSUER'),
      });
      req.user = {
        sub: payload.sub,
        role: payload.role || (payload.groups ? payload.groups[0] : null),
        tenant_id: payload.tenant_id || 'default',
        scopes: typeof payload.scope === 'string' ? payload.scope.split(' ') : (payload.scope || []),
        correlation_id: req.correlationId,
      };
      return true;
    } catch (err: any) {
      this.logger.warn(`JWT validation failed: ${err.message}`);
      throw new UnauthorizedException('Invalid token');
    }
  }

  private getKey(kid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.getSigningKey(kid, (err: any, key: any) => {
        if (err) reject(err);
        else resolve(key.publicKey || key.rsaPublicKey);
      });
    });
  }
}
