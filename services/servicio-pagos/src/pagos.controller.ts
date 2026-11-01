import {
  Controller, Get, Post, Patch, Param, Body, Req, Query, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public.decorator';
import { PagosService } from './pagos.service';
import { CreateTransaccionDto, UpdateTransaccionDto } from './dto';

@ApiTags('pagos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('pagos')
export class PagosController {
  constructor(private readonly svc: PagosService) {}

  @Post('')
  @ApiOperation({ summary: 'Crea transacción y autoriza en Stripe/MP' })
  async crea_transaccion_y_autoriza_en_stripe_mp(@Body() dto: CreateTransaccionDto) {
    return this.svc.create(dto);
  }

  @Post(':id/capturar')
  @ApiOperation({ summary: 'Captura pago autorizado (inicia SEQ-05)' })
  async captura_pago_autorizado_inicia_seq_05(@Param('id') id: string, @Body() dto: any) {
    return this.svc.createRelated(id, dto);
  }

  @Post(':id/reembolsar')
  @ApiOperation({ summary: 'Reembolso total/parcial (inicia SEQ-06)' })
  async reembolso_total_parcial_inicia_seq_06(@Param('id') id: string, @Body() dto: any) {
    return this.svc.createRelated(id, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalle de transacción' })
  async detalle_de_transaccion(@Param('id') id: string) {
    return this.svc.findById(id);
  }

  @Get(':id/factura')
  @ApiOperation({ summary: 'PDF/CFDI de la transacción' })
  async pdf_cfdi_de_la_transaccion(@Param('id') id: string) {
    return this.svc.findById(id);
  }

  @Public()
  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  health() {
    return { status: 'ok', service: 'pagos', timestamp: new Date().toISOString() };
  }
}
