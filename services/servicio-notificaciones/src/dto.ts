// DTOs with class-validator decorators for servicio-notificaciones.
// Generated as part of Fase 1 (validation hardening).

import {
  IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDateString,
  IsInt, IsNumber, IsBoolean, IsIn, IsArray, IsUrl, IsIP, Length,
  Matches, Min, Max, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

export class CreateNotificacionDto {
  @IsUUID()
  @ApiProperty({ description: 'UUID del destinatario', example: "550e8400-e29b-41d4-a716-446655440000" })
  destinatario_id!: string;

  @IsIn(['cita_reservada','cita_recordatorio','receta_emitida','pago_confirmado','mensaje_nuevo','alerta_critica'])
  @ApiProperty({ description: 'Tipo de recurso o evento', example: "string" })
  tipo!: string;

  @IsString() @Length(1, 200)
  @ApiProperty({ description: 'Título de la notificación', example: "string" })
  titulo!: string;

  @IsString() @Length(1, 2000)
  @ApiProperty({ description: 'Cuerpo del mensaje', example: "string" })
  cuerpo!: string;

  @IsIn(['email','sms','whatsapp','push','app'])
  @ApiProperty({ description: 'Canal de envío (email, sms, push, whatsapp)', example: "email" })
  canal!: string;

  @IsOptional() @IsUUID()
  @ApiPropertyOptional({ description: 'ID de correlación para trazabilidad distribuida', example: "550e8400-e29b-41d4-a716-446655440000" })
  correlation_id?: string;

}

export class UpdatePreferenciasDto {
  @IsIn(['email','sms','whatsapp','push','app'])
  @ApiProperty({ description: 'Canal de envío (email, sms, push, whatsapp)', example: "email" })
  canal!: string;

  @IsString()
  @ApiProperty({ description: 'Tipo de recurso o evento', example: "string" })
  tipo!: string;

  @IsBoolean()
  @ApiProperty({ description: 'Indica si el canal está habilitado', example: true })
  habilitado!: boolean;

}

export class UpdateNotificacionDto extends PartialType(CreateNotificacionDto) {}
