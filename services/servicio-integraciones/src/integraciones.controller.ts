import {
  Controller, Get, Post, Patch, Param, Body, Req, Query, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public.decorator';
import { IntegracionesService } from './integraciones.service';
import { CreateAplicacionDto, UpdateAplicacionDto } from './dto';

@ApiTags('integraciones')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('integraciones')
export class IntegracionesController {
  constructor(private readonly svc: IntegracionesService) {}

  @Get('fhir/Patient/:id')
  @ApiOperation({ summary: 'Recurso FHIR Patient (SEQ-07)' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido' })
  async recurso_fhir_patient_seq_07(@Param('id') id: string) {
    return this.svc.findById(id);
  }

  @Get('fhir/Patient/:id/$everything')
  @ApiOperation({ summary: 'Bundle FHIR completo del paciente (SEQ-07)' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido' })
  async bundle_fhir_completo_del_paciente_seq_07(@Param('id') id: string) {
    return this.svc.findById(id);
  }

  @Get('fhir/MedicationRequest')
  @ApiOperation({ summary: 'Recetas como MedicationRequest' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido' })
  async recetas_como_medicationrequest(@Query() query: any) {
    return this.svc.list(query);
  }

  @Post('fhir/Communication')
  @ApiOperation({ summary: 'Crea Communication (mensaje clínico)' })
  @ApiResponse({ status: 201, description: 'Recurso creado' })
  @ApiResponse({ status: 400, description: 'Solicitud invalida' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 409, description: 'Conflicto' })
  async crea_communication_mensaje_clinico(@Body() dto: any) {
    return this.svc.create(dto);
  }

  @Post('aplicaciones')
  @ApiOperation({ summary: 'Registra aplicación SMART on FHIR' })
  @ApiResponse({ status: 201, description: 'Recurso creado' })
  @ApiResponse({ status: 400, description: 'Solicitud invalida' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 409, description: 'Conflicto' })
  async registra_aplicacion_smart_on_fhir(@Body() dto: CreateAplicacionDto) {
    return this.svc.create(dto);
  }

  @Post('webhooks')
  @ApiOperation({ summary: 'Registra webhook para eventos' })
  @ApiResponse({ status: 201, description: 'Recurso creado' })
  @ApiResponse({ status: 400, description: 'Solicitud invalida' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 409, description: 'Conflicto' })
  async registra_webhook_para_eventos(@Body() dto: any) {
    return this.svc.create(dto);
  }

  @Public()
  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido' })
  health() {
    return { status: 'ok', service: 'integraciones', timestamp: new Date().toISOString() };
  }
}
