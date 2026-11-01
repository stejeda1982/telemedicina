# @telemed/common

Shared infrastructure for all 12 microservicios:

- `NatsClient` — wrapper JetStream con reconnect automático y stream `TELEMED_EVENTS`
- `OutboxService` — patrón outbox transaccional con relay worker cada 2s
- `CloudEventBuilder` — constructor de CloudEvents 1.0 con correlation_id
- `TenantContext` — decorator para extraer tenant_id del JWT
- `PaginationDto` — DTO base de paginación
- `NatsModule` — módulo global que provee NatsClient + OutboxService

## Uso

```typescript
// app.module.ts
import { NatsModule } from '@telemed/common';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, NatsModule, ...],
})
export class AppModule {}

// service.ts (publicación de evento dentro de transacción)
import { OutboxService } from '@telemed/common';

@Injectable()
export class PacientesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly outbox: OutboxService,
  ) {}

  async create(dto: CreatePacienteDto) {
    return this.prisma.$transaction(async (tx) => {
      const paciente = await tx.paciente.create({ data: dto });
      await this.outbox.publish('telemedicina.paciente.creado.v1', {
        paciente_id: paciente.paciente_id, curp: paciente.curp, tenant_id: paciente.tenant_id,
      }, tx);
      return paciente;
    });
  }
}
```

## Requisitos

- Cada servicio debe incluir el modelo `OutboxEvent` en su `schema.prisma`
- Variable de entorno `NATS_URL` apuntando al JetStream
- Variable de entorno `SERVICE_NAME` con el nombre del servicio
