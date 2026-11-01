// DTOs with class-validator decorators for servicio-profesionales.
// Generated as part of Fase 1 (validation hardening).

import {
  IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDateString,
  IsInt, IsNumber, IsBoolean, IsIn, IsArray, IsUrl, IsIP, Length,
  Matches, Min, Max, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

export class CreateProfesionalDto {
  @IsUUID()
  @ApiProperty({ description: 'UUID del usuario en WSO2 Identity Server', example: "550e8400-e29b-41d4-a716-446655440000" })
  user_id!: string;

  @IsString() @Matches(/^\d{7,8}$/, { message: 'Cédula debe tener 7-8 dígitos' })
  @ApiProperty({ description: 'Cédula profesional (7-8 dígitos)', example: "1234567" })
  cedula!: string;

  @IsString() @Length(2, 100)
  @ApiProperty({ description: 'Nombres', example: "string" })
  nombres!: string;

  @IsString() @Length(2, 100)
  @ApiProperty({ description: 'Apellidos completos', example: "550e8400-e29b-41d4-a716-446655440000" })
  apellidos!: string;

  @IsOptional() @IsString() @Length(0, 2000)
  @ApiPropertyOptional({ description: 'Biografía del profesional', example: "string" })
  biografia?: string;

  @IsOptional() @IsArray() @IsString({ each: true })
  @ApiPropertyOptional({ description: 'Idiomas que habla el profesional', example: [] })
  idiomas?: string[];

}

export class CreateTarifaDto {
  @IsIn(['primera_vez','subsecuente','urgencia','interconsulta'])
  @ApiProperty({ description: 'Tipo de consulta (primera_vez, seguimiento, etc.)', example: "string" })
  tipo_consulta!: string;

  @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  @ApiProperty({ description: 'Monto del pago', example: 500.00 })
  monto!: number;

  @IsOptional() @IsIn(['MXN','USD'])
  @ApiPropertyOptional({ description: 'Moneda (MXN, USD)', example: "MXN" })
  moneda?: string;

}

export class UpdateProfesionalDto extends PartialType(CreateProfesionalDto) {}
