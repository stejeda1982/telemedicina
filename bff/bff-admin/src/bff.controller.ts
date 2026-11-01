import { Controller, Get, Post, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { BffService } from './bff.service';

// NOTE: en producción, las llamadas del BFF se autentican con un token
// service-to-service emitido por WSO2 IS (client_credentials grant).
// Para el desarrollo local, se reenvía el Bearer token del cliente.

@ApiTags('bff-administradores')
@ApiBearerAuth()
@Controller('bff/administradores')
export class BffController {
  constructor(private readonly bff: BffService) {}

  @Get('usuarios')
  @ApiOperation({ summary: 'Lista usuarios del tenant' })
  @ApiOkResponse({ description: 'Composed response from GET admin/usuarios' })
  async lista_usuarios_del_tenant(@Req() req: any) {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    // Downstream: GET admin/usuarios
    return this.bff.forward('get', '/administradores/1.0.0/usuarios', token);
  }

  @Post('usuarios')
  @ApiOperation({ summary: 'Crea usuario' })
  @ApiOkResponse({ description: 'Composed response from POST admin/usuarios' })
  async crea_usuario(@Req() req: any) {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    // Downstream: POST admin/usuarios
    return this.bff.forward('post', '/administradores/1.0.0/usuarios', token);
  }

  @Get('profesionales/verificacion')
  @ApiOperation({ summary: 'Profesionales pendientes de validar' })
  @ApiOkResponse({ description: 'Composed response from GET profesionales?estado=pendiente' })
  async profesionales_pendientes_de_validar(@Req() req: any) {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    // Downstream: GET profesionales?estado=pendiente
    return this.bff.forward('get', '/administradores/1.0.0/profesionales/verificacion', token);
  }

  @Post('profesionales/:id/verificar')
  @ApiOperation({ summary: 'Verifica profesional' })
  @ApiOkResponse({ description: 'Composed response from POST profesionales/:id/verificar' })
  async verifica_profesional(@Param('id') id: string, @Req() req: any) {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    // Downstream: POST profesionales/:id/verificar
    return this.bff.forward('post', '/administradores/1.0.0/profesionales/${id}/verificar', token);
  }

  @Get('audit/eventos')
  @ApiOperation({ summary: 'Bitácora de auditoría' })
  @ApiOkResponse({ description: 'Composed response from GET auditoria/eventos' })
  async bitacora_de_auditoria(@Req() req: any) {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    // Downstream: GET auditoria/eventos
    return this.bff.forward('get', '/administradores/1.0.0/audit/eventos', token);
  }

  @Get('kpis/operativos')
  @ApiOperation({ summary: 'KPIs operativos consolidados' })
  @ApiOkResponse({ description: 'Composed response from agregado' })
  async kpis_operativos_consolidados(@Req() req: any) {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    // Downstream: agregado
    return this.bff.forward('get', '/administradores/1.0.0/kpis/operativos', token);
  }

  @Get('health')
  health() { return { status: 'ok', bff: 'administradores' }; }
}
