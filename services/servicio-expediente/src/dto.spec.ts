/** Unit tests for CreateNotaDto — class-validator validation.
 *
 * Verifies that the ValidationPipe (enabled in main.ts) correctly:
 * - Accepts valid input (0 validation errors)
 * - Rejects missing required fields
 * - Rejects invalid field values (wrong type, format, or enum)
 */
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateNotaDto } from './dto';

describe('CreateNotaDto', () => {
  const validData = {
  "paciente_id": "550e8400-e29b-41d4-a716-446655440000",
  "profesional_id": "660e8400-e29b-41d4-a716-446655440000",
  "texto": "Paciente presenta mejoría. Se recomienda continuar tratamiento.",
  "diagnostico": "Hipertensión controlada",
  "plan": "Continuar losartán 50mg"
};

  it('acepta input válido sin errores de validación', async () => {
    const dto = plainToInstance(CreateNotaDto, validData);
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('rechaza paciente_id faltante (campo requerido)', async () => {
    const { paciente_id, ...without } = validData;
    const dto = plainToInstance(CreateNotaDto, without);
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'paciente_id')).toBe(true);
  });

  it('rechaza paciente_id que no es UUID', async () => {
    const dto = plainToInstance(CreateNotaDto, {
  "paciente_id": "not-a-uuid",
  "profesional_id": "660e8400-e29b-41d4-a716-446655440000",
  "texto": "Paciente presenta mejoría. Se recomienda continuar tratamiento.",
  "diagnostico": "Hipertensión controlada",
  "plan": "Continuar losartán 50mg"
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'paciente_id')).toBe(true);
  });
  it('rechaza texto vacío (campo requerido)', async () => {
    const dto = plainToInstance(CreateNotaDto, {
  "paciente_id": "550e8400-e29b-41d4-a716-446655440000",
  "profesional_id": "660e8400-e29b-41d4-a716-446655440000",
  "texto": "",
  "diagnostico": "Hipertensión controlada",
  "plan": "Continuar losartán 50mg"
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'texto')).toBe(true);
  });
});
