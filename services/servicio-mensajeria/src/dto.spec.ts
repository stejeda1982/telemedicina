/** Unit tests for CreateConversacionDto — class-validator validation.
 *
 * Verifies that the ValidationPipe (enabled in main.ts) correctly:
 * - Accepts valid input (0 validation errors)
 * - Rejects missing required fields
 * - Rejects invalid field values (wrong type, format, or enum)
 */
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateConversacionDto } from './dto';

describe('CreateConversacionDto', () => {
  const validData = {
  "paciente_id": "550e8400-e29b-41d4-a716-446655440000",
  "profesional_id": "660e8400-e29b-41d4-a716-446655440000",
  "tipo": "paciente_profesional"
};

  it('acepta input válido sin errores de validación', async () => {
    const dto = plainToInstance(CreateConversacionDto, validData);
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('rechaza paciente_id faltante (campo requerido)', async () => {
    const { paciente_id, ...without } = validData;
    const dto = plainToInstance(CreateConversacionDto, without);
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'paciente_id')).toBe(true);
  });

  it('rechaza paciente_id que no es UUID', async () => {
    const dto = plainToInstance(CreateConversacionDto, {
  "paciente_id": "not-a-uuid",
  "profesional_id": "660e8400-e29b-41d4-a716-446655440000",
  "tipo": "paciente_profesional"
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'paciente_id')).toBe(true);
  });
  it('rechaza profesional_id que no es UUID', async () => {
    const dto = plainToInstance(CreateConversacionDto, {
  "paciente_id": "550e8400-e29b-41d4-a716-446655440000",
  "profesional_id": "not-a-uuid",
  "tipo": "paciente_profesional"
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'profesional_id')).toBe(true);
  });
});
