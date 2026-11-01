// DTOs with class-validator decorators for servicio-video.
// Generated as part of Fase 1 (validation hardening).

import {
  IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDateString,
  IsInt, IsNumber, IsBoolean, IsIn, IsArray, IsUrl, IsIP, Length,
  Matches, Min, Max, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

export class CreateSesionDto {
  @IsUUID()
  @ApiProperty({ description: 'UUID de la cita', example: "550e8400-e29b-41d4-a716-446655440000" })
  cita_id!: string;

  @IsOptional() @IsBoolean()
  @ApiPropertyOptional({ description: 'Indica si la sesión se graba', example: true })
  grabacion?: boolean;

}

export class AddMarcadorDto {
  @IsString() @Length(1, 500)
  @ApiProperty({ description: 'Descripción', example: "string" })
  descripcion!: string;

}

export class FinalizarSesionDto {
  @IsOptional() @IsIn(['completada','interrumpida','tecnica'])
  @ApiPropertyOptional({ description: 'Razón de finalización', example: "string" })
  razon?: string;

}

export class UpdateSesionDto extends PartialType(CreateSesionDto) {}
