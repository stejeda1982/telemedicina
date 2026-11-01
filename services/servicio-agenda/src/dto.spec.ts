/** Unit tests for CreateCitaDto — class-validator validation.
 *
 * Verifies that the ValidationPipe (enabled in main.ts) correctly:
 * - Accepts valid input (0 validation errors)
 * - Rejects missing required fields
 * - Rejects invalid field values (wrong type, format, or enum)
 */
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateCitaDto } from './dto';

describe('CreateCitaDto', () => {
  const validData = {
  "paciente_id": "550e8400-e29b-41d4-a716-446655440000",
  "profesional_id": "660e8400-e29b-41d4-a716-446655440000",
  "tipo_consulta": "primera_vez",
  "fecha_hora": "2026-11-15T10:00:00Z",
  "duracion_min": 30
};

  it('acepta input válido sin errores de validación', async () => {
    const dto = plainToInstance(CreateCitaDto, validData);
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('rechaza paciente_id faltante (campo requerido)', async () => {
    const { paciente_id, ...without } = validData;
    const dto = plainToInstance(CreateCitaDto, without);
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'paciente_id')).toBe(true);
  });

  it('rechaza paciente_id que no es UUID', async () => {
    const dto = plainToInstance(CreateCitaDto, {
  "paciente_id": "not-a-uuid",
  "profesional_id": "660e8400-e29b-41d4-a716-446655440000",
  "tipo_consulta": "primera_vez",
  "fecha_hora": "2026-11-15T10:00:00Z",
  "duracion_min": 30
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'paciente_id')).toBe(true);
  });
  it('rechaza fecha_hora que no es ISO date', async () => {
    const dto = plainToInstance(CreateCitaDto, {
  "paciente_id": "550e8400-e29b-41d4-a716-446655440000",
  "profesional_id": "660e8400-e29b-41d4-a716-446655440000",
  "tipo_consulta": "primera_vez",
  "fecha_hora": "not-a-date",
  "duracion_min": 30
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'fecha_hora')).toBe(true);
  });
});
