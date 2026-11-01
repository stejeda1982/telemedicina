// DTOs with class-validator decorators for servicio-recetas.
// Generated as part of Fase 1 (validation hardening).

import {
  IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDateString,
  IsInt, IsNumber, IsBoolean, IsIn, IsArray, IsUrl, IsIP, Length,
  Matches, Min, Max, ValidateNested, ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateRecetaDto {
  @IsUUID()
  paciente_id!: string;

  @IsUUID()
  profesional_id!: string;

  @IsOptional() @IsUUID()
  cita_id?: string;

  @IsOptional() @IsBoolean()
  es_controlada?: boolean;

  @IsArray() @ArrayMinSize(1) @ValidateNested({ each: true }) @Type(() => ItemRecetaDto)
  items!: any[];

}

export class ItemRecetaDto {
  @IsString() @Length(2, 200)
  medicamento!: string;

  @IsString() @Length(1, 100)
  dosis!: string;

  @IsString() @Length(1, 100)
  frecuencia!: string;

  @IsString() @Length(1, 50)
  duracion!: string;

}

export class FirmarRecetaDto {
  @IsString()
  certificado!: string;

  @IsOptional() @IsIn(['sha256','sha512'])
  algoritmo?: string;

}

export class EnviarRecetaDto {
  @IsIn(['email','sms','whatsapp','app'])
  canal!: string;

  @IsString() @Length(5, 100)
  destino!: string;

}

export class UpdateRecetaDto extends PartialType(CreateRecetaDto) {}
