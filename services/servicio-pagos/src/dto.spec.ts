/** Unit tests for CreateTransaccionDto — class-validator validation.
 *
 * Verifies that the ValidationPipe (enabled in main.ts) correctly:
 * - Accepts valid input (0 validation errors)
 * - Rejects missing required fields
 * - Rejects invalid field values (wrong type, format, or enum)
 */
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateTransaccionDto } from './dto';

describe('CreateTransaccionDto', () => {
  const validData = {
  "cita_id": "770e8400-e29b-41d4-a716-446655440000",
  "paciente_id": "550e8400-e29b-41d4-a716-446655440000",
  "monto": 500.0,
  "moneda": "MXN",
  "metodo": "stripe"
};

  it('acepta input válido sin errores de validación', async () => {
    const dto = plainToInstance(CreateTransaccionDto, validData);
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('rechaza cita_id faltante (campo requerido)', async () => {
    const { cita_id, ...without } = validData;
    const dto = plainToInstance(CreateTransaccionDto, without);
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'cita_id')).toBe(true);
  });

  it('rechaza monto menor al mínimo permitido', async () => {
    const dto = plainToInstance(CreateTransaccionDto, {
  "cita_id": "770e8400-e29b-41d4-a716-446655440000",
  "paciente_id": "550e8400-e29b-41d4-a716-446655440000",
  "monto": 0.001,
  "moneda": "MXN",
  "metodo": "stripe"
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'monto')).toBe(true);
  });
  it('rechaza método de pago no soportado', async () => {
    const dto = plainToInstance(CreateTransaccionDto, {
  "cita_id": "770e8400-e29b-41d4-a716-446655440000",
  "paciente_id": "550e8400-e29b-41d4-a716-446655440000",
  "monto": 500.0,
  "moneda": "MXN",
  "metodo": "bitcoin"
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'metodo')).toBe(true);
  });
  it('rechaza cita_id que no es UUID', async () => {
    const dto = plainToInstance(CreateTransaccionDto, {
  "cita_id": "not-a-uuid",
  "paciente_id": "550e8400-e29b-41d4-a716-446655440000",
  "monto": 500.0,
  "moneda": "MXN",
  "metodo": "stripe"
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'cita_id')).toBe(true);
  });
});
