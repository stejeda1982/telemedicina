// DTOs with class-validator decorators for servicio-pacientes.
// Generated as part of Fase 1 (validation hardening).

import {
  IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDateString,
  IsInt, IsNumber, IsBoolean, IsIn, IsArray, IsUrl, IsIP, Length,
  Matches, Min, Max, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePacienteDto {
  @IsUUID()
  @ApiProperty({ description: 'UUID del usuario en WSO2 Identity Server', example: "550e8400-e29b-41d4-a716-446655440000" })
  user_id!: string;

  @IsString() @Matches(/^[A-Z]{4}\d{6}[HM][A-Z]{5}\d{2}$/, { message: 'CURP inválido' })
  @ApiProperty({ description: 'CURP (18 caracteres, formato mexicano)', example: "GOOA850101HDFLRN01" })
  curp!: string;

  @IsOptional() @IsString() @Length(12, 13)
  @ApiPropertyOptional({ description: 'RFC (12-13 caracteres)', example: "string" })
  rfc?: string;

  @IsString() @Length(2, 100)
  @ApiProperty({ description: 'Nombres', example: "string" })
  nombres!: string;

  @IsString() @Length(2, 100)
  @ApiProperty({ description: 'Apellido paterno', example: "550e8400-e29b-41d4-a716-446655440000" })
  apellido_p!: string;

  @IsOptional() @IsString()
  @ApiPropertyOptional({ description: 'Apellido materno', example: "550e8400-e29b-41d4-a716-446655440000" })
  apellido_m?: string;

  @IsDateString()
  @ApiProperty({ description: 'Fecha de nacimiento (ISO 8601)', example: "2026-01-15T10:00:00Z" })
  fecha_nac!: string;

  @IsIn(['M','F','O'])
  @ApiProperty({ description: 'Sexo biológico (M, F, O)', example: "M" })
  sexo!: string;

  @IsString() @Matches(/^\+?\d{10,15}$/)
  @ApiProperty({ description: 'Teléfono (10-15 dígitos, con código de país)', example: "+525512345678" })
  telefono!: string;

  @IsEmail()
  @ApiProperty({ description: 'Correo electrónico', example: "usuario@ejemplo.com" })
  email!: string;

  @IsOptional() @IsIn(['es-MX','en-US'])
  @ApiPropertyOptional({ description: 'Idioma preferido (es-MX, en-US)', example: "550e8400-e29b-41d4-a716-446655440000" })
  idioma?: string;

}

export class UpdatePacienteDto {
  @IsOptional() @IsString()
  @ApiPropertyOptional({ description: 'Nombres', example: "string" })
  nombres?: string;

  @IsOptional() @IsString()
  @ApiPropertyOptional({ description: 'Apellido paterno', example: "550e8400-e29b-41d4-a716-446655440000" })
  apellido_p?: string;

  @IsOptional() @IsString()
  @ApiPropertyOptional({ description: 'Teléfono (10-15 dígitos, con código de país)', example: "+525512345678" })
  telefono?: string;

  @IsOptional() @IsEmail()
  @ApiPropertyOptional({ description: 'Correo electrónico', example: "usuario@ejemplo.com" })
  email?: string;

  @IsOptional() @IsIn(['es-MX','en-US'])
  @ApiPropertyOptional({ description: 'Idioma preferido (es-MX, en-US)', example: "550e8400-e29b-41d4-a716-446655440000" })
  idioma?: string;

}

export class CreateConsentimientoDto {
  @IsIn(['tratamiento_datos','compartir_expediente','telemedicina','recetas_digitales'])
  @ApiProperty({ description: 'Tipo de recurso o evento', example: "string" })
  tipo!: string;

  @IsUUID()
  @ApiProperty({ description: 'Campo plantilla_id', example: "550e8400-e29b-41d4-a716-446655440000" })
  plantilla_id!: string;

  @IsString() @Length(8, 256)
  @ApiProperty({ description: 'Campo firma_hash', example: "string" })
  firma_hash!: string;

}

