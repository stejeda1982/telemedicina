// DTOs with class-validator decorators for servicio-agenda.
// Generated as part of Fase 1 (validation hardening).

import {
  IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDateString,
  IsInt, IsNumber, IsBoolean, IsIn, IsArray, IsUrl, IsIP, Length,
  Matches, Min, Max, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCitaDto {
  @IsUUID()
  paciente_id!: string;

  @IsUUID()
  profesional_id!: string;

  @IsIn(['primera_vez','subsecuente','urgencia','interconsulta'])
  tipo_consulta!: string;

  @IsDateString()
  fecha_hora!: string;

  @IsOptional() @IsInt() @Min(15) @Max(180)
  duracion_min?: number;

}

export class CancelarCitaDto {
  @IsString() @Length(5, 500)
  motivo!: string;

}

export class ReprogramarCitaDto {
  @IsDateString()
  fecha_hora!: string;

  @IsOptional() @IsString()
  motivo?: string;

}

export class UpdateCitaDto extends PartialType(CreateCitaDto) {}
