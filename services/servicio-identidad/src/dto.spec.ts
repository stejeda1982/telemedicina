/** Unit tests for CreateUsuarioPerfilDto — class-validator validation.
 *
 * Verifies that the ValidationPipe (enabled in main.ts) correctly:
 * - Accepts valid input (0 validation errors)
 * - Rejects missing required fields
 * - Rejects invalid field values (wrong type, format, or enum)
 */
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateUsuarioPerfilDto } from './dto';

describe('CreateUsuarioPerfilDto', () => {
  const validData = {
  "wso2_user_id": "wso2-user-001",
  "dominio": "paciente",
  "email": "user@test.com",
  "telefono": "5512345678"
};

  it('acepta input válido sin errores de validación', async () => {
    const dto = plainToInstance(CreateUsuarioPerfilDto, validData);
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('rechaza wso2_user_id faltante (campo requerido)', async () => {
    const { wso2_user_id, ...without } = validData;
    const dto = plainToInstance(CreateUsuarioPerfilDto, without);
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'wso2_user_id')).toBe(true);
  });

  it('rechaza wso2_user_id vacío (campo requerido)', async () => {
    const dto = plainToInstance(CreateUsuarioPerfilDto, {
  "wso2_user_id": "",
  "dominio": "paciente",
  "email": "user@test.com",
  "telefono": "5512345678"
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'wso2_user_id')).toBe(true);
  });
  it('rechaza email inválido', async () => {
    const dto = plainToInstance(CreateUsuarioPerfilDto, {
  "wso2_user_id": "wso2-user-001",
  "dominio": "paciente",
  "email": "not-an-email",
  "telefono": "5512345678"
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'email')).toBe(true);
  });
  it('rechaza dominio vacío (campo requerido)', async () => {
    const dto = plainToInstance(CreateUsuarioPerfilDto, {
  "wso2_user_id": "wso2-user-001",
  "dominio": "",
  "email": "user@test.com",
  "telefono": "5512345678"
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'dominio')).toBe(true);
  });
});
