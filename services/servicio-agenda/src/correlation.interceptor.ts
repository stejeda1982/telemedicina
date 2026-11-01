import {
  CallHandler, ExecutionContext, Injectable, NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

// Propaga X-Correlation-Id entre el gateway WSO2 APIM, el Micro Integrator
// y los microservicios downstream. Si no viene en la petición, se genera uno.
@Injectable()
export class CorrelationIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const correlationId = req.headers['x-correlation-id'] || uuidv4();
    req.correlationId = correlationId;
    const res = context.switchToHttp().getResponse();
    res.setHeader('X-Correlation-Id', correlationId);
    return next.handle();
  }
}
