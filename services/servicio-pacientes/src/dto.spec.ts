/** Unit tests for CreatePacienteDto — class-validator validation.
 *
 * Verifies that the ValidationPipe (enabled in main.ts) correctly:
 * - Accepts valid input (0 validation errors)
 * - Rejects missing required fields
 * - Rejects invalid field values (wrong type, format, or enum)
 */
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreatePacienteDto } from './dto';

describe('CreatePacienteDto', () => {
  const validData = {
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "curp": "GOOA850101HDFLRN01",
  "nombres": "Juan Carlos",
  "apellido_p": "Pérez",
  "fecha_nac": "1985-01-01",
  "sexo": "M",
  "telefono": "5512345678",
  "email": "juan.perez@test.com"
};

  it('acepta input válido sin errores de validación', async () => {
    const dto = plainToInstance(CreatePacienteDto, validData);
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('rechaza user_id faltante (campo requerido)', async () => {
    const { user_id, ...without } = validData;
    const dto = plainToInstance(CreatePacienteDto, without);
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'user_id')).toBe(true);
  });

  it('rechaza CURP que no cumple el formato', async () => {
    const dto = plainToInstance(CreatePacienteDto, {
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "curp": "invalid-curp",
  "nombres": "Juan Carlos",
  "apellido_p": "Pérez",
  "fecha_nac": "1985-01-01",
  "sexo": "M",
  "telefono": "5512345678",
  "email": "juan.perez@test.com"
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'curp')).toBe(true);
  });
  it('rechaza email inválido', async () => {
    const dto = plainToInstance(CreatePacienteDto, {
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "curp": "GOOA850101HDFLRN01",
  "nombres": "Juan Carlos",
  "apellido_p": "Pérez",
  "fecha_nac": "1985-01-01",
  "sexo": "M",
  "telefono": "5512345678",
  "email": "not-an-email"
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'email')).toBe(true);
  });
  it('rechaza sexo fuera del rango M/F/O', async () => {
    const dto = plainToInstance(CreatePacienteDto, {
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "curp": "GOOA850101HDFLRN01",
  "nombres": "Juan Carlos",
  "apellido_p": "Pérez",
  "fecha_nac": "1985-01-01",
  "sexo": "X",
  "telefono": "5512345678",
  "email": "juan.perez@test.com"
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'sexo')).toBe(true);
  });
  it('rechaza user_id que no es UUID', async () => {
    const dto = plainToInstance(CreatePacienteDto, {
  "user_id": "not-a-uuid",
  "curp": "GOOA850101HDFLRN01",
  "nombres": "Juan Carlos",
  "apellido_p": "Pérez",
  "fecha_nac": "1985-01-01",
  "sexo": "M",
  "telefono": "5512345678",
  "email": "juan.perez@test.com"
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'user_id')).toBe(true);
  });
});
