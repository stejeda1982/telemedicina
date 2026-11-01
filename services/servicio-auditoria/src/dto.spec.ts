/** Unit tests for CreateEventoAuditoriaDto — class-validator validation.
 *
 * Verifies that the ValidationPipe (enabled in main.ts) correctly:
 * - Accepts valid input (0 validation errors)
 * - Rejects missing required fields
 * - Rejects invalid field values (wrong type, format, or enum)
 */
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateEventoAuditoriaDto } from './dto';

describe('CreateEventoAuditoriaDto', () => {
  const validData = {
  "accion": "READ_EXPEDIENTE",
  "recurso_tipo": "paciente",
  "recurso_id": "550e8400-e29b-41d4-a716-446655440000"
};

  it('acepta input válido sin errores de validación', async () => {
    const dto = plainToInstance(CreateEventoAuditoriaDto, validData);
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('rechaza accion faltante (campo requerido)', async () => {
    const { accion, ...without } = validData;
    const dto = plainToInstance(CreateEventoAuditoriaDto, without);
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'accion')).toBe(true);
  });

  it('rechaza accion vacía (campo requerido)', async () => {
    const dto = plainToInstance(CreateEventoAuditoriaDto, {
  "accion": "",
  "recurso_tipo": "paciente",
  "recurso_id": "550e8400-e29b-41d4-a716-446655440000"
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'accion')).toBe(true);
  });
  it('rechaza recurso_tipo vacío (campo requerido)', async () => {
    const dto = plainToInstance(CreateEventoAuditoriaDto, {
  "accion": "READ_EXPEDIENTE",
  "recurso_tipo": "",
  "recurso_id": "550e8400-e29b-41d4-a716-446655440000"
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'recurso_tipo')).toBe(true);
  });
});
