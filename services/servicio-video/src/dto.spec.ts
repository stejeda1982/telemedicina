/** Unit tests for CreateSesionDto — class-validator validation.
 *
 * Verifies that the ValidationPipe (enabled in main.ts) correctly:
 * - Accepts valid input (0 validation errors)
 * - Rejects missing required fields
 * - Rejects invalid field values (wrong type, format, or enum)
 */
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateSesionDto } from './dto';

describe('CreateSesionDto', () => {
  const validData = {
  "cita_id": "770e8400-e29b-41d4-a716-446655440000",
  "grabacion": true
};

  it('acepta input válido sin errores de validación', async () => {
    const dto = plainToInstance(CreateSesionDto, validData);
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('rechaza cita_id faltante (campo requerido)', async () => {
    const { cita_id, ...without } = validData;
    const dto = plainToInstance(CreateSesionDto, without);
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'cita_id')).toBe(true);
  });

  it('rechaza cita_id que no es UUID', async () => {
    const dto = plainToInstance(CreateSesionDto, {
  "cita_id": "not-a-uuid",
  "grabacion": true
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'cita_id')).toBe(true);
  });
});
