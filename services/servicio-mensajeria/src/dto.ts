// DTOs with class-validator decorators for servicio-mensajeria.
// Generated as part of Fase 1 (validation hardening).

import {
  IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDateString,
  IsInt, IsNumber, IsBoolean, IsIn, IsArray, IsUrl, IsIP, Length,
  Matches, Min, Max, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

export class CreateConversacionDto {
  @IsUUID()
  @ApiProperty({ description: 'UUID del paciente', example: "550e8400-e29b-41d4-a716-446655440000" })
  paciente_id!: string;

  @IsUUID()
  @ApiProperty({ description: 'UUID del profesional', example: "550e8400-e29b-41d4-a716-446655440000" })
  profesional_id!: string;

  @IsOptional() @IsUUID()
  @ApiPropertyOptional({ description: 'UUID de la cita', example: "550e8400-e29b-41d4-a716-446655440000" })
  cita_id?: string;

  @IsOptional() @IsIn(['paciente_profesional','interconsulta'])
  @ApiPropertyOptional({ description: 'Tipo de recurso o evento', example: "string" })
  tipo?: string;

}

export class SendMensajeDto {
  @IsString() @Length(1, 1000)
  @ApiProperty({ description: 'Texto de la nota o mensaje', example: "string" })
  texto!: string;

}

export class SolicitarInterconsultaDto {
  @IsString() @Length(2, 100)
  @ApiProperty({ description: 'Especialidad médica solicitada', example: "550e8400-e29b-41d4-a716-446655440000" })
  especialidad!: string;

  @IsString() @Length(10, 1000)
  @ApiProperty({ description: 'Motivo de cancelación o reprogramación', example: "string" })
  motivo!: string;

}

export class UpdateConversacionDto extends PartialType(CreateConversacionDto) {}
