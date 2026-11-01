// DTOs with class-validator decorators for servicio-expediente.
// Generated as part of Fase 1 (validation hardening).

import {
  IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDateString,
  IsInt, IsNumber, IsBoolean, IsIn, IsArray, IsUrl, IsIP, Length,
  Matches, Min, Max, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateNotaDto {
  @IsUUID()
  paciente_id!: string;

  @IsUUID()
  profesional_id!: string;

  @IsOptional() @IsUUID()
  cita_id?: string;

  @IsString() @Length(10, 5000)
  texto!: string;

  @IsOptional() @IsString()
  diagnostico?: string;

  @IsOptional() @IsString()
  plan?: string;

}

export class AddSignoVitalDto {
  @IsString() @Matches(/^\d{4,7}-\d{1,2}$/)
  loinc_code!: string;

  @IsString()
  valor!: string;

  @IsString() @Length(1, 20)
  unidad!: string;

}

export class AddAdjuntoDto {
  @IsIn(['imagen','pdf','video','audio'])
  tipo!: string;

  @IsUrl()
  url_s3!: string;

  @IsString() @Length(8, 128)
  hash!: string;

}

export class RegistrarAccesoDto {
  @IsString() @Length(5, 200)
  motivo!: string;

}

export class UpdateNotaDto extends PartialType(CreateNotaDto) {}
