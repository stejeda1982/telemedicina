// DTOs with class-validator decorators for servicio-recetas.
// Generated as part of Fase 1 (validation hardening).

import {
  IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDateString,
  IsInt, IsNumber, IsBoolean, IsIn, IsArray, IsUrl, IsIP, Length,
  Matches, Min, Max, ValidateNested, ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

export class CreateRecetaDto {
  @IsUUID()
  @ApiProperty({ description: 'UUID del paciente', example: "550e8400-e29b-41d4-a716-446655440000" })
  paciente_id!: string;

  @IsUUID()
  @ApiProperty({ description: 'UUID del profesional', example: "550e8400-e29b-41d4-a716-446655440000" })
  profesional_id!: string;

  @IsOptional() @IsUUID()
  @ApiPropertyOptional({ description: 'UUID de la cita', example: "550e8400-e29b-41d4-a716-446655440000" })
  cita_id?: string;

  @IsOptional() @IsBoolean()
  @ApiPropertyOptional({ description: 'Indica si es medicamento controlado', example: true })
  es_controlada?: boolean;

  @IsArray() @ArrayMinSize(1) @ValidateNested({ each: true }) @Type(() => ItemRecetaDto)
  @ApiProperty({ description: 'Items de la receta (medicamentos)', example: [] })
  items!: any[];

}

export class ItemRecetaDto {
  @IsString() @Length(2, 200)
  @ApiProperty({ description: 'Nombre del medicamento', example: "string" })
  medicamento!: string;

  @IsString() @Length(1, 100)
  @ApiProperty({ description: 'Dosis (ej: 500mg)', example: "string" })
  dosis!: string;

  @IsString() @Length(1, 100)
  @ApiProperty({ description: 'Frecuencia (ej: cada 8 horas)', example: "string" })
  frecuencia!: string;

  @IsString() @Length(1, 50)
  @ApiProperty({ description: 'Duración del tratamiento', example: "string" })
  duracion!: string;

}

export class FirmarRecetaDto {
  @IsString()
  @ApiProperty({ description: 'Certificado para firma digital', example: "string" })
  certificado!: string;

  @IsOptional() @IsIn(['sha256','sha512'])
  @ApiPropertyOptional({ description: 'Algoritmo de firma (RS256, etc.)', example: "string" })
  algoritmo?: string;

}

export class EnviarRecetaDto {
  @IsIn(['email','sms','whatsapp','app'])
  @ApiProperty({ description: 'Canal de envío (email, sms, push, whatsapp)', example: "email" })
  canal!: string;

  @IsString() @Length(5, 100)
  @ApiProperty({ description: 'Destinatario del envío', example: "string" })
  destino!: string;

}

export class UpdateRecetaDto extends PartialType(CreateRecetaDto) {}
