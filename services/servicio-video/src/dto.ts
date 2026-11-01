// DTOs with class-validator decorators for servicio-video.
// Generated as part of Fase 1 (validation hardening).

import {
  IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDateString,
  IsInt, IsNumber, IsBoolean, IsIn, IsArray, IsUrl, IsIP, Length,
  Matches, Min, Max, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateSesionDto {
  @IsUUID()
  cita_id: string;

  @IsOptional() @IsBoolean()
  grabacion?: boolean;

}

export class AddMarcadorDto {
  @IsString() @Length(1, 500)
  descripcion: string;

}

export class FinalizarSesionDto {
  @IsOptional() @IsIn(['completada','interrumpida','tecnica'])
  razon?: string;

}

export class UpdateSesionDto extends PartialType(CreateSesionDto) {}
