// DTOs with class-validator decorators for servicio-auditoria.
// Generated as part of Fase 1 (validation hardening).

import {
  IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDateString,
  IsInt, IsNumber, IsBoolean, IsIn, IsArray, IsUrl, IsIP, Length,
  Matches, Min, Max, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

export class CreateEventoAuditoriaDto {
  @IsOptional() @IsUUID()
  @ApiPropertyOptional({ description: 'UUID del actor que ejecutó la acción', example: "550e8400-e29b-41d4-a716-446655440000" })
  actor_id?: string;

  @IsOptional() @IsIn(['paciente','profesional','admin','sistema','app_externa'])
  @ApiPropertyOptional({ description: 'Tipo de actor (usuario, sistema, servicio)', example: "string" })
  actor_tipo?: string;

  @IsString() @Length(2, 100)
  @ApiProperty({ description: 'Acción realizada (CREATE, READ, UPDATE, DELETE)', example: "string" })
  accion!: string;

  @IsString() @Length(2, 100)
  @ApiProperty({ description: 'Tipo de recurso afectado', example: "string" })
  recurso_tipo!: string;

  @IsOptional() @IsString()
  @ApiPropertyOptional({ description: 'UUID del recurso afectado', example: "550e8400-e29b-41d4-a716-446655440000" })
  recurso_id?: string;

  @IsOptional() @IsIP()
  @ApiPropertyOptional({ description: 'Dirección IP del actor', example: "string" })
  ip?: string;

  @IsOptional() @IsString()
  @ApiPropertyOptional({ description: 'User-Agent del cliente', example: "string" })
  user_agent?: string;

}

export class UpdateEventoAuditoriaDto extends PartialType(CreateEventoAuditoriaDto) {}
