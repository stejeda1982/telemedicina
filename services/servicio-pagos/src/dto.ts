// DTOs with class-validator decorators for servicio-pagos.
// Generated as part of Fase 1 (validation hardening).

import {
  IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDateString,
  IsInt, IsNumber, IsBoolean, IsIn, IsArray, IsUrl, IsIP, Length,
  Matches, Min, Max, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTransaccionDto {
  @IsUUID()
  cita_id: string;

  @IsUUID()
  paciente_id: string;

  @IsNumber({ max_decimal_places: 2 }) @Min(0.01)
  monto: number;

  @IsOptional() @IsIn(['MXN','USD'])
  moneda?: string;

  @IsIn(['stripe','mercadopago','transferencia'])
  metodo: string;

  @IsOptional() @IsString()
  stripe_intent?: string;

  @IsOptional() @IsString()
  mp_preference?: string;

}

export class CapturarDto {
  @IsOptional() @IsNumber({ max_decimal_places: 2 }) @Min(0.01)
  monto?: number;

}

export class ReembolsarDto {
  @IsNumber({ max_decimal_places: 2 }) @Min(0.01)
  monto: number;

  @IsString() @Length(5, 500)
  motivo: string;

}

