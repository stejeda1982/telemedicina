// DTOs with class-validator decorators for servicio-expediente.
// Generated as part of Fase 1 (validation hardening).

import {
  IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDateString,
  IsInt, IsNumber, IsBoolean, IsIn, IsArray, IsUrl, IsIP, Length,
  Matches, Min, Max, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

export class CreateNotaDto {
  @IsUUID()
  @ApiProperty({ description: 'UUID del paciente', example: "550e8400-e29b-41d4-a716-446655440000" })
  paciente_id!: string;

  @IsUUID()
  @ApiProperty({ description: 'UUID del profesional', example: "550e8400-e29b-41d4-a716-446655440000" })
  profesional_id!: string;

  @IsOptional() @IsUUID()
  @ApiPropertyOptional({ description: 'UUID de la cita', example: "550e8400-e29b-41d4-a716-446655440000" })
  cita_id?: string;

  @IsString() @Length(10, 5000)
  @ApiProperty({ description: 'Texto de la nota o mensaje', example: "string" })
  texto!: string;

  @IsOptional() @IsString()
  @ApiPropertyOptional({ description: 'Diagnóstico clínico', example: "string" })
  diagnostico?: string;

  @IsOptional() @IsString()
  @ApiPropertyOptional({ description: 'Plan de tratamiento', example: "string" })
  plan?: string;

}

export class AddSignoVitalDto {
  @IsString() @Matches(/^\d{4,7}-\d{1,2}$/)
  @ApiProperty({ description: 'Código LOINC del signo vital', example: "string" })
  loinc_code!: string;

  @IsString()
  @ApiProperty({ description: 'Valor medido', example: "string" })
  valor!: string;

  @IsString() @Length(1, 20)
  @ApiProperty({ description: 'Unidad de medida', example: "550e8400-e29b-41d4-a716-446655440000" })
  unidad!: string;

}

export class AddAdjuntoDto {
  @IsIn(['imagen','pdf','video','audio'])
  @ApiProperty({ description: 'Tipo de recurso o evento', example: "string" })
  tipo!: string;

  @IsUrl()
  @ApiProperty({ description: 'Campo url_s3', example: "string" })
  url_s3!: string;

  @IsString() @Length(8, 128)
  @ApiProperty({ description: 'Hash del archivo adjunto', example: "string" })
  hash!: string;

}

export class RegistrarAccesoDto {
  @IsString() @Length(5, 200)
  @ApiProperty({ description: 'Motivo de cancelación o reprogramación', example: "string" })
  motivo!: string;

}

export class UpdateNotaDto extends PartialType(CreateNotaDto) {}
