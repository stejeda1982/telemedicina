import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { OutboxService } from '@telemed/common';
import { CreateConversacionDto, UpdateConversacionDto } from './dto';

// Auto-generated service for servicio-mensajeria.
// The conversacion model is the aggregate root of this service.

@Injectable()
export class MensajeriaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly outbox: OutboxService,
  ) {}

  async list(query: any) {
    const { skip = 0, take = 50, ...where } = query;
    return this.prisma.conversacion.findMany({
      where: this.normalizeWhere(where),
      skip: Number(skip), take: Number(take),
      orderBy: { created_at: 'desc' },
    });
  }

  async findById(id: string) {
    const rec = await this.prisma.conversacion.findUnique({ where: { conversacion_id: id } });
    if (!rec) throw new NotFoundException(`Recurso ${id} no encontrado`);
    return rec;
  }

  async findByUserId(user_id: string) {
    // Used by findMe and by SCIM webhooks from WSO2 IS.
    // Resolves to the aggregate root filtered by user_id when present.
    const rec = await this.prisma.conversacion.findFirst({ where: { paciente_id: user_id } });
    if (!rec) throw new NotFoundException(`Usuario ${user_id} no encontrado`);
    return rec;
  }

  async findByPaciente(paciente_id: string) {
    return this.prisma.conversacion.findMany({
      where: { paciente_id },
      orderBy: { created_at: 'desc' },
    });
  }

  async findMe(user: any) {
    return this.findByUserId(user.sub);
  }

  async create(dto: CreateConversacionDto) {
    return this.prisma.$transaction(async (tx) => {
      const rec = await tx.conversacion.create({ data: dto as any });
      await this.outbox.publish(
        'telemedicina.conversacion.iniciada.v1',
        { conversacion_id: rec.conversacion_id, paciente_id: rec.paciente_id, profesional_id: rec.profesional_id, tipo: rec.tipo },
        tx,
      );
      return rec;
    });
  }

  async update(id: string, dto: UpdateConversacionDto) {
    return this.prisma.conversacion.update({
      where: { conversacion_id: id },
      data: dto as any,
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
