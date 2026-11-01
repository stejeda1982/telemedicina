// DTOs with class-validator decorators for servicio-pagos.
// Generated as part of Fase 1 (validation hardening).

import {
  IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDateString,
  IsInt, IsNumber, IsBoolean, IsIn, IsArray, IsUrl, IsIP, Length,
  Matches, Min, Max, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTransaccionDto {
  @IsUUID()
  @ApiProperty({ description: 'UUID de la cita', example: "550e8400-e29b-41d4-a716-446655440000" })
  cita_id!: string;

  @IsUUID()
  @ApiProperty({ description: 'UUID del paciente', example: "550e8400-e29b-41d4-a716-446655440000" })
  paciente_id!: string;

  @IsNumber({ maxDecimalPlaces: 2 }) @Min(0.01)
  @ApiProperty({ description: 'Monto del pago', example: 500.00 })
  monto!: number;

  @IsOptional() @IsIn(['MXN','USD'])
  @ApiPropertyOptional({ description: 'Moneda (MXN, USD)', example: "MXN" })
  moneda?: string;

  @IsIn(['stripe','mercadopago','transferencia'])
  @ApiProperty({ description: 'Método de pago (stripe, mercadopago, transferencia)', example: "stripe" })
  metodo!: string;

  @IsOptional() @IsString()
  @ApiPropertyOptional({ description: 'ID del Payment Intent de Stripe', example: "string" })
  stripe_intent?: string;

  @IsOptional() @IsString()
  @ApiPropertyOptional({ description: 'ID de preferencia de MercadoPago', example: "string" })
  mp_preference?: string;

}

export class CapturarDto {
  @IsOptional() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0.01)
  @ApiPropertyOptional({ description: 'Monto del pago', example: 500.00 })
  monto?: number;

}

export class ReembolsarDto {
  @IsNumber({ maxDecimalPlaces: 2 }) @Min(0.01)
  @ApiProperty({ description: 'Monto del pago', example: 500.00 })
  monto!: number;

  @IsString() @Length(5, 500)
  @ApiProperty({ description: 'Motivo de cancelación o reprogramación', example: "string" })
  motivo!: string;

}

export class UpdateTransaccionDto extends PartialType(CreateTransaccionDto) {}
