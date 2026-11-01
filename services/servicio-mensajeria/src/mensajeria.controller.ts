import {
  Controller, Get, Post, Patch, Param, Body, Req, Query, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
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
  async crea_conversacion_paciente_profesional(@Body() dto: CreateConversacionDto) {
    return this.svc.create(dto);
  }

  @Get('conversaciones')
  @ApiOperation({ summary: 'Lista conversaciones del usuario' })
  async lista_conversaciones_del_usuario(@Query() query: any) {
    return this.svc.list(query);
  }

  @Post('conversaciones/:id/mensajes')
  @ApiOperation({ summary: 'Envía mensaje' })
  async envia_mensaje(@Param('id') id: string, @Body() dto: any) {
    return this.svc.createRelated(id, dto);
  }

  @Get('conversaciones/:id/mensajes')
  @ApiOperation({ summary: 'Lista mensajes' })
  async lista_mensajes(@Param('id') id: string) {
    return this.svc.findById(id);
  }

  @Post('conversaciones/:id/interconsulta')
  @ApiOperation({ summary: 'Solicita interconsulta (SEQ-08)' })
  async solicita_interconsulta_seq_08(@Param('id') id: string, @Body() dto: any) {
    return this.svc.createRelated(id, dto);
  }

  @Public()
  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  health() {
    return { status: 'ok', service: 'mensajeria', timestamp: new Date().toISOString() };
  }
}
