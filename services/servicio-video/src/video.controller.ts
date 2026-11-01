import {
  Controller, Get, Post, Patch, Param, Body, Req, Query, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
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
  async crea_sesion_webrtc_para_una_cita(@Body() dto: CreateSesionDto, @Query() query: any) {
    return this.svc.create(dto);
  }

  @Get('sesiones/:id')
  @ApiOperation({ summary: 'Obtiene sesión y token' })
  async obtiene_sesion_y_token(@Param('id') id: string) {
    return this.svc.findById(id);
  }

  @Post('sesiones/:id/marcadores')
  @ApiOperation({ summary: 'Añade marcador clínico durante la consulta' })
  async anade_marcador_clinico_durante_la_consulta(@Param('id') id: string, @Body() dto: any) {
    return this.svc.createRelated(id, dto);
  }

  @Post('sesiones/:id/finalizar')
  @ApiOperation({ summary: 'Finaliza sesión (inicia SEQ-03)' })
  async finaliza_sesion_inicia_seq_03(@Param('id') id: string, @Body() dto: any) {
    return this.svc.createRelated(id, dto);
  }

  @Public()
  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  health() {
    return { status: 'ok', service: 'video', timestamp: new Date().toISOString() };
  }
}
