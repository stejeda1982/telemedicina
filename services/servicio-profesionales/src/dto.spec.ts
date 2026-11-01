/** Unit tests for CreateProfesionalDto — class-validator validation.
 *
 * Verifies that the ValidationPipe (enabled in main.ts) correctly:
 * - Accepts valid input (0 validation errors)
 * - Rejects missing required fields
 * - Rejects invalid field values (wrong type, format, or enum)
 */
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateProfesionalDto } from './dto';

describe('CreateProfesionalDto', () => {
  const validData = {
  "user_id": "660e8400-e29b-41d4-a716-446655440000",
  "cedula": "1234567",
  "nombres": "María Elena",
  "apellidos": "González López"
};

  it('acepta input válido sin errores de validación', async () => {
    const dto = plainToInstance(CreateProfesionalDto, validData);
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('rechaza user_id faltante (campo requerido)', async () => {
    const { user_id, ...without } = validData;
    const dto = plainToInstance(CreateProfesionalDto, without);
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'user_id')).toBe(true);
  });

  it('rechaza cédula con menos de 7 dígitos', async () => {
    const dto = plainToInstance(CreateProfesionalDto, {
  "user_id": "660e8400-e29b-41d4-a716-446655440000",
  "cedula": "123",
  "nombres": "María Elena",
  "apellidos": "González López"
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'cedula')).toBe(true);
  });
  it('rechaza user_id que no es UUID', async () => {
    const dto = plainToInstance(CreateProfesionalDto, {
  "user_id": "not-a-uuid",
  "cedula": "1234567",
  "nombres": "María Elena",
  "apellidos": "González López"
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'user_id')).toBe(true);
  });
  it('rechaza nombres vacío', async () => {
    const dto = plainToInstance(CreateProfesionalDto, {
  "user_id": "660e8400-e29b-41d4-a716-446655440000",
  "cedula": "1234567",
  "nombres": "",
  "apellidos": "González López"
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'nombres')).toBe(true);
  });
});
