// DTOs with class-validator decorators for servicio-mensajeria.
// Generated as part of Fase 1 (validation hardening).

import {
  IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDateString,
  IsInt, IsNumber, IsBoolean, IsIn, IsArray, IsUrl, IsIP, Length,
  Matches, Min, Max, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateConversacionDto {
  @IsUUID()
  paciente_id!: string;

  @IsUUID()
  profesional_id!: string;

  @IsOptional() @IsUUID()
  cita_id?: string;

  @IsOptional() @IsIn(['paciente_profesional','interconsulta'])
  tipo?: string;

}

export class SendMensajeDto {
  @IsString() @Length(1, 1000)
  texto!: string;

}

export class SolicitarInterconsultaDto {
  @IsString() @Length(2, 100)
  especialidad!: string;

  @IsString() @Length(10, 1000)
  motivo!: string;

}

export class UpdateConversacionDto extends PartialType(CreateConversacionDto) {}
