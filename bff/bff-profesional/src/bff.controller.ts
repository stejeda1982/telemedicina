import { Controller, Get, Post, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { BffService } from './bff.service';

// NOTE: en producción, las llamadas del BFF se autentican con un token
// service-to-service emitido por WSO2 IS (client_credentials grant).
// Para el desarrollo local, se reenvía el Bearer token del cliente.

@ApiTags('bff-profesionales')
@ApiBearerAuth()
@Controller('bff/profesionales')
export class BffController {
  constructor(private readonly bff: BffService) {}

  @Get('perfil')
  @ApiOperation({ summary: 'Perfil público del profesional' })
  @ApiOkResponse({ description: 'Composed response from GET profesionales/:id' })
  async perfil_publico_del_profesional(@Req() req: any) {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    // Downstream: GET profesionales/:id
    return this.bff.forward('get', '/profesionales/1.0.0/perfil', token);
  }

  @Get('agenda/hoy')
  @ApiOperation({ summary: 'Citas de hoy' })
  @ApiOkResponse({ description: 'Composed response from GET agenda?fecha=hoy&profesional_id=me' })
  async citas_de_hoy(@Req() req: any) {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    // Downstream: GET agenda?fecha=hoy&profesional_id=me
    return this.bff.forward('get', '/profesionales/1.0.0/agenda/hoy', token);
  }

  @Get('pacientes/asignados')
  @ApiOperation({ summary: 'Pacientes bajo cuidado' })
  @ApiOkResponse({ description: 'Composed response from GET pacientes?profesional_id=me' })
  async pacientes_bajo_cuidado(@Req() req: any) {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    // Downstream: GET pacientes?profesional_id=me
    return this.bff.forward('get', '/profesionales/1.0.0/pacientes/asignados', token);
  }

  @Post('notas')
  @ApiOperation({ summary: 'Crea nota de evolución' })
  @ApiOkResponse({ description: 'Composed response from POST expediente/notas' })
  async crea_nota_de_evolucion(@Req() req: any) {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    // Downstream: POST expediente/notas
    return this.bff.forward('post', '/profesionales/1.0.0/notas', token);
  }

  @Post('recetas')
  @ApiOperation({ summary: 'Emite receta firmada' })
  @ApiOkResponse({ description: 'Composed response from POST recetas (SEQ-04)' })
  async emite_receta_firmada(@Req() req: any) {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    // Downstream: POST recetas (SEQ-04)
    return this.bff.forward('post', '/profesionales/1.0.0/recetas', token);
  }

  @Post('video/sesiones')
  @ApiOperation({ summary: 'Crea sesión WebRTC' })
  @ApiOkResponse({ description: 'Composed response from POST video/sesiones' })
  async crea_sesion_webrtc(@Req() req: any) {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    // Downstream: POST video/sesiones
    return this.bff.forward('post', '/profesionales/1.0.0/video/sesiones', token);
  }

  @Get('health')
  health() { return { status: 'ok', bff: 'profesionales' }; }
}
