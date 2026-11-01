// DTOs with class-validator decorators for servicio-identidad.
// Generated as part of Fase 1 (validation hardening).

import {
  IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDateString,
  IsInt, IsNumber, IsBoolean, IsIn, IsArray, IsUrl, IsIP, Length,
  Matches, Min, Max, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUsuarioPerfilDto {
  @IsString() @IsNotEmpty()
  wso2_user_id!: string;

  @IsString() @IsIn(['paciente','profesional','admin'])
  dominio!: string;

  @IsEmail()
  email!: string;

  @IsOptional() @IsString()
  telefono?: string;

}

export class UpdateUsuarioPerfilDto {
  @IsOptional() @IsEmail()
  email?: string;

  @IsOptional() @IsString()
  telefono?: string;

  @IsOptional() @IsIn(['activo','bloqueado','pendiente'])
  estado?: string;

}

