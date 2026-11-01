// DTOs with class-validator decorators for servicio-auditoria.
// Generated as part of Fase 1 (validation hardening).

import {
  IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDateString,
  IsInt, IsNumber, IsBoolean, IsIn, IsArray, IsUrl, IsIP, Length,
  Matches, Min, Max, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateEventoAuditoriaDto {
  @IsOptional() @IsUUID()
  actor_id?: string;

  @IsOptional() @IsIn(['paciente','profesional','admin','sistema','app_externa'])
  actor_tipo?: string;

  @IsString() @Length(2, 100)
  accion: string;

  @IsString() @Length(2, 100)
  recurso_tipo: string;

  @IsOptional() @IsString()
  recurso_id?: string;

  @IsOptional() @IsIP()
  ip?: string;

  @IsOptional() @IsString()
  user_agent?: string;

}

export class UpdateEventoAuditoriaDto extends PartialType(CreateEventoAuditoriaDto) {}
