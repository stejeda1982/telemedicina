// DTOs with class-validator decorators for servicio-notificaciones.
// Generated as part of Fase 1 (validation hardening).

import {
  IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDateString,
  IsInt, IsNumber, IsBoolean, IsIn, IsArray, IsUrl, IsIP, Length,
  Matches, Min, Max, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateNotificacionDto {
  @IsUUID()
  destinatario_id!: string;

  @IsIn(['cita_reservada','cita_recordatorio','receta_emitida','pago_confirmado','mensaje_nuevo','alerta_critica'])
  tipo!: string;

  @IsString() @Length(1, 200)
  titulo!: string;

  @IsString() @Length(1, 2000)
  cuerpo!: string;

  @IsIn(['email','sms','whatsapp','push','app'])
  canal!: string;

  @IsOptional() @IsUUID()
  correlation_id?: string;

}

export class UpdatePreferenciasDto {
  @IsIn(['email','sms','whatsapp','push','app'])
  canal!: string;

  @IsString()
  tipo!: string;

  @IsBoolean()
  habilitado!: boolean;

}

export class UpdateNotificacionDto extends PartialType(CreateNotificacionDto) {}
