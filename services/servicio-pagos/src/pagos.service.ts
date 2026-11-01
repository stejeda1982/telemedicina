import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { OutboxService } from '@telemed/common';
import { CreateTransaccionDto, UpdateTransaccionDto } from './dto';

// Auto-generated service for servicio-pagos.
// The transaccion model is the aggregate root of this service.

@Injectable()
export class PagosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly outbox: OutboxService,
  ) {}

  async list(query: any) {
    const { skip = 0, take = 50, ...where } = query;
    return this.prisma.transaccion.findMany({
      where: this.normalizeWhere(where),
      skip: Number(skip), take: Number(take),
      orderBy: { created_at: 'desc' },
    });
  }

  async findById(id: string) {
    const rec = await this.prisma.transaccion.findUnique({ where: { transaccion_id: id } });
    if (!rec) throw new NotFoundException(`Recurso ${id} no encontrado`);
    return rec;
  }

  async findByUserId(user_id: string) {
    // Used by findMe and by SCIM webhooks from WSO2 IS.
    // Resolves to the aggregate root filtered by user_id when present.
    const rec = await this.prisma.transaccion.findFirst({ where: { user_id } });
    if (!rec) throw new NotFoundException(`Usuario ${user_id} no encontrado`);
    return rec;
  }

  async findByPaciente(paciente_id: string) {
    return this.prisma.transaccion.findMany({
      where: { paciente_id },
      orderBy: { created_at: 'desc' },
    });
  }

  async findMe(user: any) {
    return this.findByUserId(user.sub);
  }

  async create(dto: CreateTransaccionDto) {
    return this.prisma.$transaction(async (tx) => {
      const rec = await tx.transaccion.create({ data: dto });
      await this.outbox.publish(
        'telemedicina.pago.capturado.v1',
        { transaccion_id: rec.transaccion_id, cita_id: rec.cita_id, paciente_id: rec.paciente_id, moneda: rec.moneda },
        tx,
      );
      return rec;
    });
  }

  async update(id: string, dto: UpdateTransaccionDto) {
    return this.prisma.transaccion.update({
      where: { transaccion_id: id },
      data: dto,
    });
  }

  async createRelated(id: string, dto: any) {
    // Hook for sub-resource creation (e.g., POST /pacientes/:id/consentimientos).
    // Override per service when the relation target differs.
    return { parent: id, payload: dto };
  }

  private normalizeWhere(where: any) {
    // Remove pagination keys and convert string booleans
    const out: any = {};
    for (const [k, v] of Object.entries(where || {})) {
      if (v === 'true') out[k] = true;
      else if (v === 'false') out[k] = false;
      else if (v !== '' && v !== undefined) out[k] = v;
    }
    return out;
  }
}
