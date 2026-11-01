import {
  Controller, Get, Post, Patch, Param, Body, Req, Query, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public.decorator';
import { IdentidadService } from './identidad.service';

@ApiTags('identidad')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('identidad')
export class IdentidadController {
  constructor(private readonly svc: IdentidadService) {}

  @Get('me')
  @ApiOperation({ summary: 'Obtiene el perfil del usuario autenticado' })
  async obtiene_el_perfil_del_usuario_autenticado(@Req() req: any) {
    return this.svc.findMe(req.user);
  }

  @Get(':user_id')
  @ApiOperation({ summary: 'Obtiene un usuario por WSO2 user_id' })
  async obtiene_un_usuario_por_wso2_user_id(@Param('user_id') user_id: string) {
    return this.svc.findByUserId(user_id);
  }

  @Post('')
  @ApiOperation({ summary: 'Crea o actualiza perfil tras JIT provisioning' })
  async crea_o_actualiza_perfil_tras_jit_provisioning(@Body() dto: any) {
    return this.svc.create(dto);
  }

  @Patch(':user_id')
  @ApiOperation({ summary: 'Actualiza claims del usuario' })
  async actualiza_claims_del_usuario(@Param('user_id') user_id: string, @Body() dto: any) {
    return this.svc.list(req.query);
  }

  @Get(':user_id/auditoria')
  @ApiOperation({ summary: 'Historial de sesiones' })
  async historial_de_sesiones(@Param('user_id') user_id: string) {
    return this.svc.findByUserId(user_id);
  }

  @Public()
  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  health() {
    return { status: 'ok', service: 'identidad', timestamp: new Date().toISOString() };
  }
}
