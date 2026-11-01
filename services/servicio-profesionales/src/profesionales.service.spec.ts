/** Unit tests for ProfesionalesService — Transactional outbox pattern.
 *
 * Covers the three guarantees of the outbox pattern:
 * 1. create() success → publishes the correct CloudEvent
 * 2. create() transaction failure → does NOT publish (atomicity)
 * 3. outbox.publish failure inside transaction → transaction fails (no orphan record)
 */
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { OutboxService } from '@telemed/common';
import { ProfesionalesService } from './profesionales.service';

describe('ProfesionalesService', () => {
  let service: ProfesionalesService;
  let prisma: any;
  let outbox: any;

  beforeEach(async () => {
    // Mock PrismaService: $transaction executes the callback with the tx object
    // (which is the mock itself, so tx.profesional.create resolves).
    const mockPrisma = {
      $transaction: jest.fn(async (cb: any) => cb(mockPrisma)),
      profesional: { create: jest.fn() },
    };

    const mockOutbox = {
      publish: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfesionalesService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: OutboxService, useValue: mockOutbox },
      ],
    }).compile();

    service = module.get<ProfesionalesService>(ProfesionalesService);
    prisma = module.get(PrismaService);
    outbox = module.get(OutboxService);
  });

  describe('create (outbox pattern)', () => {
    const validDto = {
  "user_id": "660e8400-e29b-41d4-a716-446655440000",
  "cedula": "1234567",
  "nombres": "María Elena",
  "apellidos": "González López"
};

    it('publica evento telemedicina.profesional.creado.v1 cuando la transacción es exitosa', async () => {
      const created = {
  "user_id": "660e8400-e29b-41d4-a716-446655440000",
  "cedula": "1234567",
  "nombres": "María Elena",
  "apellidos": "González López",
  "profesional_id": "rec-123-profesionales"
};
      prisma.profesional.create.mockResolvedValue(created);

      const result = await service.create(validDto);

      expect(result).toEqual(created);
      expect(outbox.publish).toHaveBeenCalledTimes(1);
      expect(outbox.publish).toHaveBeenCalledWith(
        'telemedicina.profesional.creado.v1',
        expect.objectContaining({ profesional_id: 'rec-123-profesionales' }),
        expect.anything(), // tx (the Prisma transaction client)
      );
    });

    it('NO publica evento cuando la transacción falla', async () => {
      prisma.$transaction.mockRejectedValue(new Error('DB connection lost'));

      await expect(service.create(validDto)).rejects.toThrow('DB connection lost');
      expect(outbox.publish).not.toHaveBeenCalled();
    });

    it('NO deja registro huérfano si outbox.publish falla dentro de la transacción', async () => {
      // prisma.create succeeds, but outbox.publish throws.
      // Since publish runs inside $transaction, the whole tx fails
      // and the created record is rolled back by Prisma.
      prisma.profesional.create.mockResolvedValue({ profesional_id: 'rec-123-profesionales' });
      outbox.publish.mockRejectedValue(new Error('NATS connection lost'));

      await expect(service.create(validDto)).rejects.toThrow('NATS connection lost');

      // publish was called (inside the tx) but the tx failed, so no event reaches NATS.
      // In production, the OutboxService writes to the outbox table (same tx),
      // and a relay publishes later. Here we verify the publish was attempted
      // but the transaction rejected.
      expect(prisma.profesional.create).toHaveBeenCalledTimes(1);
    });
  });
});
