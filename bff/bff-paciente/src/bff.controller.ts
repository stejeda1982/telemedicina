import { Controller, Get, Post, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { BffService } from './bff.service';

// NOTE: en producción, las llamadas del BFF se autentican con un token
// service-to-service emitido por WSO2 IS (client_credentials grant).
// Para el desarrollo local, se reenvía el Bearer token del cliente.

@ApiTags('bff-pacientes')
@ApiBearerAuth()
@Controller('bff/pacientes')
export class BffController {
  constructor(private readonly bff: BffService) {}

  @Get('perfil')
  @ApiOperation({ summary: 'Obtiene perfil + preferencias del paciente' })
  @ApiOkResponse({ description: 'Composed response from GET paciente/me' })
  async obtiene_perfil___preferencias_del_paciente(@Req() req: any) {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    // Downstream: GET paciente/me
    return this.bff.forward('get', '/pacientes/1.0.0/perfil', token);
  }

  @Get('citas/proximas')
  @ApiOperation({ summary: 'Próximas 5 citas del paciente' })
  @ApiOkResponse({ description: 'Composed response from GET agenda?estado=reservada&limit=5' })
  async proximas_5_citas_del_paciente(@Req() req: any) {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    // Downstream: GET agenda?estado=reservada&limit=5
    return this.bff.forward('get', '/pacientes/1.0.0/citas/proximas', token);
  }

  @Get('citas/:id/detalle')
  @ApiOperation({ summary: 'Detalle completo de cita' })
  @ApiOkResponse({ description: 'Composed response from GET agenda/:id (agregado)' })
  async detalle_completo_de_cita(@Param('id') id: string, @Req() req: any) {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    // Downstream: GET agenda/:id (agregado)
    return this.bff.forward('get', '/pacientes/1.0.0/citas/${id}/detalle', token);
  }

  @Get('expediente/notas')
  @ApiOperation({ summary: 'Notas del expediente del paciente' })
  @ApiOkResponse({ description: 'Composed response from GET expediente/paciente/:paciente_id/notas' })
  async notas_del_expediente_del_paciente(@Req() req: any) {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    // Downstream: GET expediente/paciente/:paciente_id/notas
    return this.bff.forward('get', '/pacientes/1.0.0/expediente/notas', token);
  }

  @Get('recetas/vigentes')
  @ApiOperation({ summary: 'Recetas vigentes' })
  @ApiOkResponse({ description: 'Composed response from GET recetas/paciente/:paciente_id' })
  async recetas_vigentes(@Req() req: any) {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    // Downstream: GET recetas/paciente/:paciente_id
    return this.bff.forward('get', '/pacientes/1.0.0/recetas/vigentes', token);
  }

  @Post('citas')
  @ApiOperation({ summary: 'Reserva una cita' })
  @ApiOkResponse({ description: 'Composed response from POST agenda (SEQ-01)' })
  async reserva_una_cita(@Req() req: any) {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    // Downstream: POST agenda (SEQ-01)
    return this.bff.forward('post', '/pacientes/1.0.0/citas', token);
  }

  @Post('mensajes')
  @ApiOperation({ summary: 'Envía mensaje' })
  @ApiOkResponse({ description: 'Composed response from POST mensajeria/conversaciones/:id/mensajes' })
  async envia_mensaje(@Req() req: any) {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    // Downstream: POST mensajeria/conversaciones/:id/mensajes
    return this.bff.forward('post', '/pacientes/1.0.0/mensajes', token);
  }

  @Get('health')
  health() { return { status: 'ok', bff: 'pacientes' }; }
}
