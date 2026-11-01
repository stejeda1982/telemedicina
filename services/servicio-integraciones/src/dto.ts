// DTOs with class-validator decorators for servicio-integraciones.
// Generated as part of Fase 1 (validation hardening).

import {
  IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDateString,
  IsInt, IsNumber, IsBoolean, IsIn, IsArray, IsUrl, IsIP, Length,
  Matches, Min, Max, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAplicacionDto {
  @IsString() @Length(2, 100)
  nombre: string;

  @IsString() @Length(8, 100)
  client_id: string;

  @IsOptional() @IsIn(['smart_on_fhir','hl7_v2','webhook','rest'])
  tipo?: string;

}

export class CreateWebhookDto {
  @IsUUID()
  app_id: string;

  @IsUrl()
  url: string;

  @IsString()
  evento_tipo: string;

}

