import {
  Controller, Get, Post, Patch, Param, Body, Req, Query, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public.decorator';
import { NotificacionesService } from './notificaciones.service';
import { CreateNotificacionDto, UpdateNotificacionDto } from './dto';

@ApiTags('notificaciones')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notificaciones')
export class NotificacionesController {
  constructor(private readonly svc: NotificacionesService, @Query() query: any) {}

  @Post('')
  @ApiOperation({ summary: 'Encola notificación (consumida por NATS)' })
  async encola_notificacion_consumida_por_nats(@Body() dto: CreateNotificacionDto) {
    return this.svc.create(dto);
  }

  @Get('me')
  @ApiOperation({ summary: 'Lista notificaciones del usuario' })
  async lista_notificaciones_del_usuario(@Req() req: any) {
    return this.svc.findMe(req.user);
  }

  @Post(':id/reintentar')
  @ApiOperation({ summary: 'Reintenta envío fallido' })
  async reintenta_envio_fallido(@Param('id') id: string, @Body() dto: any) {
    return this.svc.createRelated(id, dto);
  }

  @Patch('preferencias')
  @ApiOperation({ summary: 'Actualiza preferencias multi-canal' })
  async actualiza_preferencias_multi_canal(@Body() dto: any, @Query() query: any) {
    return this.svc.list(query);
  }

  @Public()
  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  health() {
    return { status: 'ok', service: 'notificaciones', timestamp: new Date().toISOString() };
  }
}
