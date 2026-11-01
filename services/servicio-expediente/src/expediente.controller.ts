import {
  Controller, Get, Post, Patch, Param, Body, Req, Query, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public.decorator';
import { ExpedienteService } from './expediente.service';
import { CreateNotaDto, UpdateNotaDto } from './dto';

@ApiTags('expediente')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('expediente')
export class ExpedienteController {
  constructor(private readonly svc: ExpedienteService, @Query() query: any) {}

  @Get('paciente/:paciente_id/notas')
  @ApiOperation({ summary: 'Lista notas de evolución del paciente' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido' })
  async lista_notas_de_evolucion_del_paciente(@Param('paciente_id') paciente_id: string) {
    return this.svc.findByPaciente(paciente_id);
  }

  @Post('notas')
  @ApiOperation({ summary: 'Crea nota de evolución (vincula cita)' })
  @ApiResponse({ status: 201, description: 'Recurso creado' })
  @ApiResponse({ status: 400, description: 'Solicitud invalida' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 409, description: 'Conflicto' })
  async crea_nota_de_evolucion_vincula_cita(@Body() dto: CreateNotaDto, @Query() query: any) {
    return this.svc.create(dto);
  }

  @Get('notas/:id')
  @ApiOperation({ summary: 'Obtiene nota con signos vitales y adjuntos' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido' })
  async obtiene_nota_con_signos_vitales_y_adjuntos(@Param('id') id: string) {
    return this.svc.findById(id);
  }

  @Post('notas/:id/signos-vitales')
  @ApiOperation({ summary: 'Registra signos vitales' })
  @ApiResponse({ status: 201, description: 'Recurso creado' })
  @ApiResponse({ status: 400, description: 'Solicitud invalida' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 409, description: 'Conflicto' })
  async registra_signos_vitales(@Param('id') id: string, @Body() dto: any) {
    return this.svc.createRelated(id, dto);
  }

  @Post('notas/:id/adjuntos')
  @ApiOperation({ summary: 'Carga adjunto (S3 presigned)' })
  @ApiResponse({ status: 201, description: 'Recurso creado' })
  @ApiResponse({ status: 400, description: 'Solicitud invalida' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 409, description: 'Conflicto' })
  async carga_adjunto_s3_presigned(@Param('id') id: string, @Body() dto: any) {
    return this.svc.createRelated(id, dto);
  }

  @Post('paciente/:paciente_id/acceso')
  @ApiOperation({ summary: 'Registra acceso al expediente (auditoría)' })
  @ApiResponse({ status: 201, description: 'Recurso creado' })
  @ApiResponse({ status: 400, description: 'Solicitud invalida' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 409, description: 'Conflicto' })
  async registra_acceso_al_expediente_auditoria(@Param('paciente_id') paciente_id: string, @Body() dto: any, @Query() query: any) {
    return this.svc.create(dto);
  }

  @Public()
  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido' })
  health() {
    return { status: 'ok', service: 'expediente', timestamp: new Date().toISOString() };
  }
}
