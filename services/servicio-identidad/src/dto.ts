// DTOs with class-validator decorators for servicio-identidad.
// Generated as part of Fase 1 (validation hardening).

import {
  IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDateString,
  IsInt, IsNumber, IsBoolean, IsIn, IsArray, IsUrl, IsIP, Length,
  Matches, Min, Max, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUsuarioPerfilDto {
  @IsString() @IsNotEmpty()
  @ApiProperty({ description: 'ID del usuario en WSO2 IS (sub claim)', example: "550e8400-e29b-41d4-a716-446655440000" })
  wso2_user_id!: string;

  @IsString() @IsIn(['paciente','profesional','admin'])
  @ApiProperty({ description: 'Dominio del usuario (paciente, profesional, admin)', example: "string" })
  dominio!: string;

  @IsEmail()
  @ApiProperty({ description: 'Correo electrónico', example: "usuario@ejemplo.com" })
  email!: string;

  @IsOptional() @IsString()
  @ApiPropertyOptional({ description: 'Teléfono (10-15 dígitos, con código de país)', example: "+525512345678" })
  telefono?: string;

}

export class UpdateUsuarioPerfilDto {
  @IsOptional() @IsEmail()
  @ApiPropertyOptional({ description: 'Correo electrónico', example: "usuario@ejemplo.com" })
  email?: string;

  @IsOptional() @IsString()
  @ApiPropertyOptional({ description: 'Teléfono (10-15 dígitos, con código de país)', example: "+525512345678" })
  telefono?: string;

  @IsOptional() @IsIn(['activo','bloqueado','pendiente'])
  @ApiPropertyOptional({ description: 'Estado del recurso', example: "string" })
  estado?: string;

}

