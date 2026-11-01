import {
  Controller, Get, Post, Patch, Param, Body, Req, Query, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public.decorator';
import { ProfesionalesService } from './profesionales.service';
import { CreateProfesionalDto, UpdateProfesionalDto } from './dto';

@ApiTags('profesionales')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('profesionales')
export class ProfesionalesController {
  constructor(private readonly svc: ProfesionalesService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Perfil público del profesional' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido' })
  async perfil_publico_del_profesional(@Param('id') id: string) {
    return this.svc.findById(id);
  }

  @Get('')
  @ApiOperation({ summary: 'Lista profesionales (con filtros)' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido' })
  async lista_profesionales_con_filtros(@Query() query: any) {
    return this.svc.list(query);
  }

  @Post('')
  @ApiOperation({ summary: 'Crea perfil profesional (admin)' })
  @ApiResponse({ status: 201, description: 'Recurso creado' })
  @ApiResponse({ status: 400, description: 'Solicitud invalida' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 409, description: 'Conflicto' })
  async crea_perfil_profesional_admin(@Body() dto: CreateProfesionalDto) {
    return this.svc.create(dto);
  }

  @Post(':id/verificar')
  @ApiOperation({ summary: 'Marca como verificado tras validación DGP' })
  @ApiResponse({ status: 201, description: 'Recurso creado' })
  @ApiResponse({ status: 400, description: 'Solicitud invalida' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 409, description: 'Conflicto' })
  async marca_como_verificado_tras_validacion_dgp(@Param('id') id: string, @Body() dto: any) {
    return this.svc.createRelated(id, dto);
  }

  @Get(':id/disponibilidad')
  @ApiOperation({ summary: 'Slots disponibles' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido' })
  async slots_disponibles(@Param('id') id: string) {
    return this.svc.findById(id);
  }

  @Post(':id/tarifas')
  @ApiOperation({ summary: 'Crea tarifa' })
  @ApiResponse({ status: 201, description: 'Recurso creado' })
  @ApiResponse({ status: 400, description: 'Solicitud invalida' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 409, description: 'Conflicto' })
  async crea_tarifa(@Param('id') id: string, @Body() dto: any) {
    return this.svc.createRelated(id, dto);
  }

  @Public()
  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido' })
  health() {
    return { status: 'ok', service: 'profesionales', timestamp: new Date().toISOString() };
  }
}
