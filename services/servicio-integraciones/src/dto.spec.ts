/** Unit tests for CreateAplicacionDto — class-validator validation.
 *
 * Verifies that the ValidationPipe (enabled in main.ts) correctly:
 * - Accepts valid input (0 validation errors)
 * - Rejects missing required fields
 * - Rejects invalid field values (wrong type, format, or enum)
 */
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateAplicacionDto } from './dto';

describe('CreateAplicacionDto', () => {
  const validData = {
  "nombre": "Hospital HIS Integration",
  "client_id": "his-client-001",
  "tipo": "smart_on_fhir"
};

  it('acepta input válido sin errores de validación', async () => {
    const dto = plainToInstance(CreateAplicacionDto, validData);
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('rechaza nombre faltante (campo requerido)', async () => {
    const { nombre, ...without } = validData;
    const dto = plainToInstance(CreateAplicacionDto, without);
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'nombre')).toBe(true);
  });

  it('rechaza nombre vacío', async () => {
    const dto = plainToInstance(CreateAplicacionDto, {
  "nombre": "",
  "client_id": "his-client-001",
  "tipo": "smart_on_fhir"
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'nombre')).toBe(true);
  });
  it('rechaza client_id vacío', async () => {
    const dto = plainToInstance(CreateAplicacionDto, {
  "nombre": "Hospital HIS Integration",
  "client_id": "",
  "tipo": "smart_on_fhir"
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'client_id')).toBe(true);
  });
});
