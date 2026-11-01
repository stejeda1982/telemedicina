// DTOs with class-validator decorators for servicio-agenda.
// Generated as part of Fase 1 (validation hardening).

import {
  IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDateString,
  IsInt, IsNumber, IsBoolean, IsIn, IsArray, IsUrl, IsIP, Length,
  Matches, Min, Max, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCitaDto {
  @IsUUID()
  @ApiProperty({ description: 'UUID del paciente', example: "550e8400-e29b-41d4-a716-446655440000" })
  paciente_id!: string;

  @IsUUID()
  @ApiProperty({ description: 'UUID del profesional', example: "550e8400-e29b-41d4-a716-446655440000" })
  profesional_id!: string;

  @IsIn(['primera_vez','subsecuente','urgencia','interconsulta'])
  @ApiProperty({ description: 'Tipo de consulta (primera_vez, seguimiento, etc.)', example: "string" })
  tipo_consulta!: string;

  @IsDateString()
  @ApiProperty({ description: 'Fecha y hora de la cita (ISO 8601)', example: "2026-01-15T10:00:00Z" })
  fecha_hora!: string;

  @IsOptional() @IsInt() @Min(15) @Max(180)
  @ApiPropertyOptional({ description: 'Duración en minutos', example: 30 })
  duracion_min?: number;

}

export class CancelarCitaDto {
  @IsString() @Length(5, 500)
  @ApiProperty({ description: 'Motivo de cancelación o reprogramación', example: "string" })
  motivo!: string;

}

export class ReprogramarCitaDto {
  @IsDateString()
  @ApiProperty({ description: 'Fecha y hora de la cita (ISO 8601)', example: "2026-01-15T10:00:00Z" })
  fecha_hora!: string;

  @IsOptional() @IsString()
  @ApiPropertyOptional({ description: 'Motivo de cancelación o reprogramación', example: "string" })
  motivo?: string;

}

export class UpdateCitaDto extends PartialType(CreateCitaDto) {}
