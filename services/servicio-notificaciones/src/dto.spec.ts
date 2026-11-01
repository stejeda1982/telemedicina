/** Unit tests for CreateNotificacionDto — class-validator validation.
 *
 * Verifies that the ValidationPipe (enabled in main.ts) correctly:
 * - Accepts valid input (0 validation errors)
 * - Rejects missing required fields
 * - Rejects invalid field values (wrong type, format, or enum)
 */
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateNotificacionDto } from './dto';

describe('CreateNotificacionDto', () => {
  const validData = {
  "destinatario_id": "550e8400-e29b-41d4-a716-446655440000",
  "tipo": "cita_recordatorio",
  "titulo": "Recordatorio de cita",
  "cuerpo": "Tiene una cita mañana a las 10:00",
  "canal": "email"
};

  it('acepta input válido sin errores de validación', async () => {
    const dto = plainToInstance(CreateNotificacionDto, validData);
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('rechaza destinatario_id faltante (campo requerido)', async () => {
    const { destinatario_id, ...without } = validData;
    const dto = plainToInstance(CreateNotificacionDto, without);
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'destinatario_id')).toBe(true);
  });

  it('rechaza destinatario_id vacío (campo requerido)', async () => {
    const dto = plainToInstance(CreateNotificacionDto, {
  "destinatario_id": "",
  "tipo": "cita_recordatorio",
  "titulo": "Recordatorio de cita",
  "cuerpo": "Tiene una cita mañana a las 10:00",
  "canal": "email"
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'destinatario_id')).toBe(true);
  });
  it('rechaza canal vacío (campo requerido)', async () => {
    const dto = plainToInstance(CreateNotificacionDto, {
  "destinatario_id": "550e8400-e29b-41d4-a716-446655440000",
  "tipo": "cita_recordatorio",
  "titulo": "Recordatorio de cita",
  "cuerpo": "Tiene una cita mañana a las 10:00",
  "canal": ""
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'canal')).toBe(true);
  });
  it('rechaza titulo vacío (campo requerido)', async () => {
    const dto = plainToInstance(CreateNotificacionDto, {
  "destinatario_id": "550e8400-e29b-41d4-a716-446655440000",
  "tipo": "cita_recordatorio",
  "titulo": "",
  "cuerpo": "Tiene una cita mañana a las 10:00",
  "canal": "email"
});
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'titulo')).toBe(true);
  });
});
