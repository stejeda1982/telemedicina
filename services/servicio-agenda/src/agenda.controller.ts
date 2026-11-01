import {
  Controller, Get, Post, Patch, Param, Body, Req, Query, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public.decorator';
import { AgendaService } from './agenda.service';
import { CreateCitaDto, UpdateCitaDto } from './dto';

@ApiTags('agenda')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('agenda')
export class AgendaController {
  constructor(private readonly svc: AgendaService) {}

  @Get('')
  @ApiOperation({ summary: 'Lista citas (filtros: paciente, profesional, fecha)' })
  async lista_citas_filtros_paciente_profesional_fecha() {
    return this.svc.list(req.query);
  }

  @Post('')
  @ApiOperation({ summary: 'Reserva una cita (inicia SEQ-01)' })
  async reserva_una_cita_inicia_seq_01(@Body() dto: CreateCitaDto) {
    return this.svc.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalle de cita' })
  async detalle_de_cita(@Param('id') id: string) {
    return this.svc.findById(id);
  }

  @Post(':id/cancelar')
  @ApiOperation({ summary: 'Cancela cita' })
  async cancela_cita(@Param('id') id: string, @Body() dto: any) {
    return this.svc.createRelated(id, dto);
  }

  @Post(':id/checkin')
  @ApiOperation({ summary: 'Check-in a sala de espera (inicia SEQ-02)' })
  async check_in_a_sala_de_espera_inicia_seq_02(@Param('id') id: string, @Body() dto: any) {
    return this.svc.createRelated(id, dto);
  }

  @Post(':id/reprogramar')
  @ApiOperation({ summary: 'Reprograma cita' })
  async reprograma_cita(@Param('id') id: string, @Body() dto: any) {
    return this.svc.createRelated(id, dto);
  }

  @Public()
  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  health() {
    return { status: 'ok', service: 'agenda', timestamp: new Date().toISOString() };
  }
}
