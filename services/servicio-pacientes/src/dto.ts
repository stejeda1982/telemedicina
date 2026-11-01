// DTOs with class-validator decorators for servicio-pacientes.
// Generated as part of Fase 1 (validation hardening).

import {
  IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDateString,
  IsInt, IsNumber, IsBoolean, IsIn, IsArray, IsUrl, IsIP, Length,
  Matches, Min, Max, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePacienteDto {
  @IsUUID()
  user_id!: string;

  @IsString() @Matches(/^[A-Z]{4}\d{6}[HM][A-Z]{5}\d{2}$/, { message: 'CURP inválido' })
  curp!: string;

  @IsOptional() @IsString() @Length(12, 13)
  rfc?: string;

  @IsString() @Length(2, 100)
  nombres!: string;

  @IsString() @Length(2, 100)
  apellido_p!: string;

  @IsOptional() @IsString()
  apellido_m?: string;

  @IsDateString()
  fecha_nac!: string;

  @IsIn(['M','F','O'])
  sexo!: string;

  @IsString() @Matches(/^\+?\d{10,15}$/)
  telefono!: string;

  @IsEmail()
  email!: string;

  @IsOptional() @IsIn(['es-MX','en-US'])
  idioma?: string;

}

export class UpdatePacienteDto {
  @IsOptional() @IsString()
  nombres?: string;

  @IsOptional() @IsString()
  apellido_p?: string;

  @IsOptional() @IsString()
  telefono?: string;

  @IsOptional() @IsEmail()
  email?: string;

  @IsOptional() @IsIn(['es-MX','en-US'])
  idioma?: string;

}

export class CreateConsentimientoDto {
  @IsIn(['tratamiento_datos','compartir_expediente','telemedicina','recetas_digitales'])
  tipo!: string;

  @IsUUID()
  plantilla_id!: string;

  @IsString() @Length(8, 256)
  firma_hash!: string;

}

