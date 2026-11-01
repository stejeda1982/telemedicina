import {
  Controller, Get, Post, Patch, Param, Body, Req, Query, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public.decorator';
import { MensajeriaService } from './mensajeria.service';
import { CreateConversacionDto, UpdateConversacionDto } from './dto';

@ApiTags('mensajeria')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('mensajeria')
export class MensajeriaController {
  constructor(private readonly svc: MensajeriaService) {}

  @Post('conversaciones')
  @ApiOperation({ summary: 'Crea conversación (paciente-profesional)' })
  @ApiResponse({ status: 201, description: 'Recurso creado' })
  @ApiResponse({ status: 400, description: 'Solicitud invalida' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 409, description: 'Conflicto' })
  async crea_conversacion_paciente_profesional(@Body() dto: CreateConversacionDto) {
    return this.svc.create(dto);
  }

  @Get('conversaciones')
  @ApiOperation({ summary: 'Lista conversaciones del usuario' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido' })
  async lista_conversaciones_del_usuario(@Query() query: any) {
    return this.svc.list(query);
  }

  @Post('conversaciones/:id/mensajes')
  @ApiOperation({ summary: 'Envía mensaje' })
  @ApiResponse({ status: 201, description: 'Recurso creado' })
  @ApiResponse({ status: 400, description: 'Solicitud invalida' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 409, description: 'Conflicto' })
  async envia_mensaje(@Param('id') id: string, @Body() dto: any) {
    return this.svc.createRelated(id, dto);
  }

  @Get('conversaciones/:id/mensajes')
  @ApiOperation({ summary: 'Lista mensajes' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido' })
  async lista_mensajes(@Param('id') id: string) {
    return this.svc.findById(id);
  }

  @Post('conversaciones/:id/interconsulta')
  @ApiOperation({ summary: 'Solicita interconsulta (SEQ-08)' })
  @ApiResponse({ status: 201, description: 'Recurso creado' })
  @ApiResponse({ status: 400, description: 'Solicitud invalida' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 409, description: 'Conflicto' })
  async solicita_interconsulta_seq_08(@Param('id') id: string, @Body() dto: any) {
    return this.svc.createRelated(id, dto);
  }

  @Public()
  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido' })
  health() {
    return { status: 'ok', service: 'mensajeria', timestamp: new Date().toISOString() };
  }
}
