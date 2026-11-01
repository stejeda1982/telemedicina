import {
  Controller, Get, Post, Patch, Param, Body, Req, Query, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public.decorator';
import { VideoService } from './video.service';
import { CreateSesionDto, UpdateSesionDto } from './dto';

@ApiTags('video')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('video')
export class VideoController {
  constructor(private readonly svc: VideoService, @Query() query: any) {}

  @Post('sesiones')
  @ApiOperation({ summary: 'Crea sesión WebRTC para una cita' })
  @ApiResponse({ status: 201, description: 'Recurso creado' })
  @ApiResponse({ status: 400, description: 'Solicitud invalida' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 409, description: 'Conflicto' })
  async crea_sesion_webrtc_para_una_cita(@Body() dto: CreateSesionDto, @Query() query: any) {
    return this.svc.create(dto);
  }

  @Get('sesiones/:id')
  @ApiOperation({ summary: 'Obtiene sesión y token' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido' })
  async obtiene_sesion_y_token(@Param('id') id: string) {
    return this.svc.findById(id);
  }

  @Post('sesiones/:id/marcadores')
  @ApiOperation({ summary: 'Añade marcador clínico durante la consulta' })
  @ApiResponse({ status: 201, description: 'Recurso creado' })
  @ApiResponse({ status: 400, description: 'Solicitud invalida' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 409, description: 'Conflicto' })
  async anade_marcador_clinico_durante_la_consulta(@Param('id') id: string, @Body() dto: any) {
    return this.svc.createRelated(id, dto);
  }

  @Post('sesiones/:id/finalizar')
  @ApiOperation({ summary: 'Finaliza sesión (inicia SEQ-03)' })
  @ApiResponse({ status: 201, description: 'Recurso creado' })
  @ApiResponse({ status: 400, description: 'Solicitud invalida' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 409, description: 'Conflicto' })
  async finaliza_sesion_inicia_seq_03(@Param('id') id: string, @Body() dto: any) {
    return this.svc.createRelated(id, dto);
  }

  @Public()
  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido' })
  health() {
    return { status: 'ok', service: 'video', timestamp: new Date().toISOString() };
  }
}
