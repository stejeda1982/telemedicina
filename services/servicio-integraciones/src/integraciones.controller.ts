import {
  Controller, Get, Post, Patch, Param, Body, Req, Query, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public.decorator';
import { IntegracionesService } from './integraciones.service';

@ApiTags('integraciones')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('integraciones')
export class IntegracionesController {
  constructor(private readonly svc: IntegracionesService) {}

  @Get('fhir/Patient/:id')
  @ApiOperation({ summary: 'Recurso FHIR Patient (SEQ-07)' })
  async recurso_fhir_patient_seq_07(@Param('id') id: string) {
    return this.svc.findById(id);
  }

  @Get('fhir/Patient/:id/$everything')
  @ApiOperation({ summary: 'Bundle FHIR completo del paciente (SEQ-07)' })
  async bundle_fhir_completo_del_paciente_seq_07(@Param('id') id: string) {
    return this.svc.findById(id);
  }

  @Get('fhir/MedicationRequest')
  @ApiOperation({ summary: 'Recetas como MedicationRequest' })
  async recetas_como_medicationrequest() {
    return this.svc.list(req.query);
  }

  @Post('fhir/Communication')
  @ApiOperation({ summary: 'Crea Communication (mensaje clínico)' })
  async crea_communication_mensaje_clinico(@Body() dto: any) {
    return this.svc.list(req.query);
  }

  @Post('aplicaciones')
  @ApiOperation({ summary: 'Registra aplicación SMART on FHIR' })
  async registra_aplicacion_smart_on_fhir(@Body() dto: any) {
    return this.svc.list(req.query);
  }

  @Post('webhooks')
  @ApiOperation({ summary: 'Registra webhook para eventos' })
  async registra_webhook_para_eventos(@Body() dto: any) {
    return this.svc.list(req.query);
  }

  @Public()
  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  health() {
    return { status: 'ok', service: 'integraciones', timestamp: new Date().toISOString() };
  }
}
