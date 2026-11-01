import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { NatsClient } from '@telemed/common';
import { PrismaService } from './prisma.service';

// Subscribes to ALL telemedicina.> events and persists an EventoAuditoria
// row for each. This builds the immutable audit trail required by NOM-024-
// SSA3-2012 and COFEPRIS for health data access logging.
//
// Each audit entry includes: actor, action, resource, correlation_id,
// timestamp, and a hash chain (hash_actual = sha256(hash_previo + payload))
// to detect tampering.

@Injectable()
export class AuditoriaSubscriberService implements OnModuleInit {
  private readonly logger = new Logger(AuditoriaSubscriberService.name);

  constructor(
    private readonly nats: NatsClient,
    private readonly prisma: PrismaService,
  ) {}

  async onModuleInit(): Promise<void> {
    // Subscribe to the wildcard subject to capture all domain events.
    await this.nats.subscribe(
      'telemedicina.>',
      'auditoria-all-events',
      async (event: any) => this.handleEvent(event),
    );
    this.logger.log('Subscribed to telemedicina.> for audit logging');
  }

  private async handleEvent(event: any): Promise<void> {
    const data = event.data || {};
    const eventType = event.type || 'unknown';
    const correlationId = event.correlation_id || '';

    try {
      // Get the last hash for the hash chain
      const lastEntry = await this.prisma.eventoAuditoria.findFirst({
        orderBy: { timestamp: 'desc' },
        take: 1,
      });
      const hashPrevio = lastEntry?.hash_actual || '';

      // Compute hash_actual = sha256(hash_previo + event_json)
      const crypto = await import('crypto');
      const payloadJson = JSON.stringify(event);
      const hashActual = crypto
        .createHash('sha256')
        .update(hashPrevio + payloadJson)
        .digest('hex');

      await this.prisma.eventoAuditoria.create({
        data: {
          accion: eventType,
          recurso_tipo: eventType.split('.')[1] || 'desconocido',
          recurso_id: data.paciente_id || data.cita_id || data.receta_id || data.transaccion_id || '',
          correlation_id: correlationId,
          tenant_id: data.tenant_id || 'default',
          payload_cifrado: payloadJson,
          hash_previo: hashPrevio,
          hash_actual: hashActual,
        },
      });
    } catch (err: any) {
      this.logger.error(`Failed to audit event ${eventType}: ${err.message}`);
      throw err;
    }
  }
}
