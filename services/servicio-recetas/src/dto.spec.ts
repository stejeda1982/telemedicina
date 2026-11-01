/** Unit tests for CreateRecetaDto — class-validator validation.
 *
 * Verifies that the ValidationPipe (enabled in main.ts) correctly:
 * - Accepts valid input (0 validation errors)
 * - Rejects missing required fields
 * - Rejects invalid field values (wrong type, format, or enum)
 */
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateRecetaDto } from './dto';

describe('CreateRecetaDto', () => {
  const validData = {
  "paciente_id": "550e8400-e29b-41d4-a716-446655440000",
  "profesional_id": "660e8400-e29b-41d4-a716-446655440000",
  "items": [
    {
      "medicamento": "Paracetamol",
      "dosis": "500mg",
      "frecuencia": "c/8h",
      "duracion": "7 dias"
    }
  ]
};

  it('acepta input válido sin errores de validación', async () => {
    const dto = plainToInstance(CreateRecetaDto, validData);
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('rechaza paciente_id faltante (campo requerido)', async () => {
    const { paciente_id, ...without } = validData;
    const dto = plainToInstance(CreateRecetaDto, without);
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'paciente_id')).toBe(true);
  });

  it('rechaza paciente_id que no es UUID', async () => {
    const dto = plainToInstance(CreateRecetaDto, {
  "paciente_id": "not-a-uuid",
  "profesional_id": "660e8400-e29b-41d4-a716-446655440000",
  "items": [
    {
      "medicamento": "Paracetamol",
      "dosis": "500mg",
      "frecuencia": "c/8h",
      "duracion": "7 dias"
    }
  ]
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'paciente_id')).toBe(true);
  });
  it('rechaza items vacío (array requerido)', async () => {
    const dto = plainToInstance(CreateRecetaDto, {
  "paciente_id": "550e8400-e29b-41d4-a716-446655440000",
  "profesional_id": "660e8400-e29b-41d4-a716-446655440000",
  "items": []
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'items')).toBe(true);
  });
});
