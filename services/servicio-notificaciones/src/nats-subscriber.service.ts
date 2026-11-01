import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { NatsClient } from '@telemed/common';

// Subscribes to telemedicina.> events and enqueues notifications
// based on the event type. This is the event-driven entry point for
// the notificaciones service - the REST API is only used for direct
// queries (GET /me, PATCH preferencias).

@Injectable()
export class NatsSubscriberService implements OnModuleInit {
  private readonly logger = new Logger(NatsSubscriberService.name);

  constructor(private readonly nats: NatsClient) {}

  async onModuleInit(): Promise<void> {
    // Subscribe to a few key events. In production this maps each event
    // type to a notification template via the Plantilla model.
    await this.nats.subscribe(
      'telemedicina.cita.reservada.v1',
      'notif-cita-reservada',
      async (event: any) => this.handleCitaReservada(event),
    );
    await this.nats.subscribe(
      'telemedicina.receta.emitida.v1',
      'notif-receta-emitida',
      async (event: any) => this.handleRecetaEmitida(event),
    );
    await this.nats.subscribe(
      'telemedicina.pago.capturado.v1',
      'notif-pago-capturado',
      async (event: any) => this.handlePagoCapturado(event),
    );
    this.logger.log('Subscribed to telemedicina.> events');
  }

  private async handleCitaReservada(event: any): Promise<void> {
    const data = event.data;
    this.logger.log(`Enqueuing cita-reservada notification for paciente ${data.paciente_id}`);
    // TODO: persist Notificacion row with template 'cita_reservada'
    // and trigger delivery via the appropriate canal based on preferences.
  }

  private async handleRecetaEmitida(event: any): Promise<void> {
    const data = event.data;
    this.logger.log(`Enqueuing receta-emitida notification for paciente ${data.paciente_id}`);
  }

  private async handlePagoCapturado(event: any): Promise<void> {
    const data = event.data;
    this.logger.log(`Enqueuing pago-capturado notification for paciente ${data.paciente_id}`);
  }
}
