import {
  Controller, Get, Post, Patch, Param, Body, Req, Query, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public.decorator';
import { ExpedienteService } from './expediente.service';

@ApiTags('expediente')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('expediente')
export class ExpedienteController {
  constructor(private readonly svc: ExpedienteService) {}

  @Get('paciente/:paciente_id/notas')
  @ApiOperation({ summary: 'Lista notas de evolución del paciente' })
  async lista_notas_de_evolucion_del_paciente(@Param('paciente_id') paciente_id: string) {
    return this.svc.findByPaciente(paciente_id);
  }

  @Post('notas')
  @ApiOperation({ summary: 'Crea nota de evolución (vincula cita)' })
  async crea_nota_de_evolucion_vincula_cita(@Body() dto: any) {
    return this.svc.list(req.query);
  }

  @Get('notas/:id')
  @ApiOperation({ summary: 'Obtiene nota con signos vitales y adjuntos' })
  async obtiene_nota_con_signos_vitales_y_adjuntos(@Param('id') id: string) {
    return this.svc.findById(id);
  }

  @Post('notas/:id/signos-vitales')
  @ApiOperation({ summary: 'Registra signos vitales' })
  async registra_signos_vitales(@Param('id') id: string, @Body() dto: any) {
    return this.svc.createRelated(id, dto);
  }

  @Post('notas/:id/adjuntos')
  @ApiOperation({ summary: 'Carga adjunto (S3 presigned)' })
  async carga_adjunto_s3_presigned(@Param('id') id: string, @Body() dto: any) {
    return this.svc.createRelated(id, dto);
  }

  @Post('paciente/:paciente_id/acceso')
  @ApiOperation({ summary: 'Registra acceso al expediente (auditoría)' })
  async registra_acceso_al_expediente_auditoria(@Param('paciente_id') paciente_id: string, @Body() dto: any) {
    return this.svc.list(req.query);
  }

  @Public()
  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  health() {
    return { status: 'ok', service: 'expediente', timestamp: new Date().toISOString() };
  }
}
