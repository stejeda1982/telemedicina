// DTOs with class-validator decorators for servicio-profesionales.
// Generated as part of Fase 1 (validation hardening).

import {
  IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDateString,
  IsInt, IsNumber, IsBoolean, IsIn, IsArray, IsUrl, IsIP, Length,
  Matches, Min, Max, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateProfesionalDto {
  @IsUUID()
  user_id: string;

  @IsString() @Matches(/^\d{7,8}$/, { message: 'Cédula debe tener 7-8 dígitos' })
  cedula: string;

  @IsString() @Length(2, 100)
  nombres: string;

  @IsString() @Length(2, 100)
  apellidos: string;

  @IsOptional() @IsString() @Length(0, 2000)
  biografia?: string;

  @IsOptional() @IsArray() @IsString({ each: true })
  idiomas?: string[];

}

export class CreateTarifaDto {
  @IsIn(['primera_vez','subsecuente','urgencia','interconsulta'])
  tipo_consulta: string;

  @IsNumber({ max_decimal_places: 2 }) @Min(0)
  monto: number;

  @IsOptional() @IsIn(['MXN','USD'])
  moneda?: string;

}

export class UpdateProfesionalDto extends PartialType(CreateProfesionalDto) {}
