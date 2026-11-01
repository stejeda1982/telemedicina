// DTOs with class-validator decorators for servicio-integraciones.
// Generated as part of Fase 1 (validation hardening).

import {
  IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDateString,
  IsInt, IsNumber, IsBoolean, IsIn, IsArray, IsUrl, IsIP, Length,
  Matches, Min, Max, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

export class CreateAplicacionDto {
  @IsString() @Length(2, 100)
  @ApiProperty({ description: 'Nombre', example: "string" })
  nombre!: string;

  @IsString() @Length(8, 100)
  @ApiProperty({ description: 'Client ID OAuth2', example: "550e8400-e29b-41d4-a716-446655440000" })
  client_id!: string;

  @IsOptional() @IsIn(['smart_on_fhir','hl7_v2','webhook','rest'])
  @ApiPropertyOptional({ description: 'Tipo de recurso o evento', example: "string" })
  tipo?: string;

}

export class CreateWebhookDto {
  @IsUUID()
  @ApiProperty({ description: 'UUID de la aplicación registrada', example: "550e8400-e29b-41d4-a716-446655440000" })
  app_id!: string;

  @IsUrl()
  @ApiProperty({ description: 'URL del webhook', example: "string" })
  url!: string;

  @IsString()
  @ApiProperty({ description: 'Tipo de evento que dispara el webhook', example: "string" })
  evento_tipo!: string;

}

export class UpdateAplicacionDto extends PartialType(CreateAplicacionDto) {}
