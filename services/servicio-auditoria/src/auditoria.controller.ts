import {
  Controller, Get, Post, Patch, Param, Body, Req, Query, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public.decorator';
import { AuditoriaService } from './auditoria.service';
import { CreateEventoAuditoriaDto, UpdateEventoAuditoriaDto } from './dto';

@ApiTags('auditoria')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('auditoria')
export class AuditoriaController {
  constructor(private readonly svc: AuditoriaService) {}

  @Get('eventos')
  @ApiOperation({ summary: 'Lista eventos (filtros: actor, recurso, fechas)' })
  async lista_eventos_filtros_actor_recurso_fechas(@Query() query: any) {
    return this.svc.list(query);
  }

  @Get('eventos/:evento_id')
  @ApiOperation({ summary: 'Detalle de un evento' })
  async detalle_de_un_evento(@Query() query: any) {
    return this.svc.list(query);
  }

  @Get('cadena/hash')
  @ApiOperation({ summary: 'Verifica integridad de la cadena de hash' })
  async verifica_integridad_de_la_cadena_de_hash(@Query() query: any) {
    return this.svc.list(query);
  }

  @Post('eventos')
  @ApiOperation({ summary: 'Registra evento (consumido por NATS, append-only)' })
  async registra_evento_consumido_por_nats_append_only(@Body() dto: CreateEventoAuditoriaDto) {
    return this.svc.create(dto);
  }

  @Public()
  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  health() {
    return { status: 'ok', service: 'auditoria', timestamp: new Date().toISOString() };
  }
}
