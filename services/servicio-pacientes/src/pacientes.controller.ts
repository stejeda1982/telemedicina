import {
  Controller, Get, Post, Patch, Param, Body, Req, Query, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public.decorator';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto, UpdatePacienteDto } from './dto';

@ApiTags('pacientes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('pacientes')
export class PacientesController {
  constructor(private readonly svc: PacientesService) {}

  @Get('me')
  @ApiOperation({ summary: 'Perfil del paciente autenticado' })
  async perfil_del_paciente_autenticado(@Req() req: any) {
    return this.svc.findMe(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un paciente por id' })
  async obtiene_un_paciente_por_id(@Param('id') id: string) {
    return this.svc.findById(id);
  }

  @Post('')
  @ApiOperation({ summary: 'Crea el perfil clínico del paciente' })
  async crea_el_perfil_clinico_del_paciente(@Body() dto: CreatePacienteDto) {
    return this.svc.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza datos demográficos' })
  async actualiza_datos_demograficos(@Param('id') id: string, @Body() dto: UpdatePacienteDto) {
    return this.svc.update(id, dto);
  }

  @Post(':id/consentimientos')
  @ApiOperation({ summary: 'Registra consentimiento informado digital' })
  async registra_consentimiento_informado_digital(@Param('id') id: string, @Body() dto: any) {
    return this.svc.createRelated(id, dto);
  }

  @Get(':id/antecedentes')
  @ApiOperation({ summary: 'Lista antecedentes' })
  async lista_antecedentes(@Param('id') id: string) {
    return this.svc.findById(id);
  }

  @Public()
  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  health() {
    return { status: 'ok', service: 'pacientes', timestamp: new Date().toISOString() };
  }
}
