import {
  Controller, Get, Post, Patch, Param, Body, Req, Query, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public.decorator';
import { RecetasService } from './recetas.service';

@ApiTags('recetas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('recetas')
export class RecetasController {
  constructor(private readonly svc: RecetasService) {}

  @Post('')
  @ApiOperation({ summary: 'Crea receta en borrador (inicia SEQ-04)' })
  async crea_receta_en_borrador_inicia_seq_04(@Body() dto: any) {
    return this.svc.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalle de receta (con QR)' })
  async detalle_de_receta_con_qr(@Param('id') id: string) {
    return this.svc.findById(id);
  }

  @Post(':id/firmar')
  @ApiOperation({ summary: 'Firma e.firma + timbra (continúa SEQ-04)' })
  async firma_efirma_timbra_continua_seq_04(@Param('id') id: string, @Body() dto: any) {
    return this.svc.createRelated(id, dto);
  }

  @Post(':id/enviar')
  @ApiOperation({ summary: 'Envía receta al paciente y farmacia' })
  async envia_receta_al_paciente_y_farmacia(@Param('id') id: string, @Body() dto: any) {
    return this.svc.createRelated(id, dto);
  }

  @Get(':id/qr')
  @ApiOperation({ summary: 'Genera/verifica QR de anti-falsificación' })
  async genera_verifica_qr_de_anti_falsificacion(@Param('id') id: string) {
    return this.svc.findById(id);
  }

  @Get('paciente/:paciente_id')
  @ApiOperation({ summary: 'Recetas vigentes del paciente' })
  async recetas_vigentes_del_paciente(@Param('paciente_id') paciente_id: string) {
    return this.svc.findByPaciente(paciente_id);
  }

  @Public()
  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  health() {
    return { status: 'ok', service: 'recetas', timestamp: new Date().toISOString() };
  }
}
