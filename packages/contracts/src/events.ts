// Auto-generated CloudEvents 1.0 contracts for the Telemedicina platform.
// Each event is a TypeScript interface with strict typing of the `data` payload.

export interface CloudEvent<T = unknown> {
  specversion: '1.0';
  id: string;
  source: string;
  type: string;
  time: string;
  datacontenttype: 'application/json';
  data: T;
  correlation_id?: string;
  traceparent?: string;
}

// EVT-01 - telemedicina.identidad.usuario.creado.v1
// Publisher: WSO2 IS → Identidad | Subscribers: Pacientes, Profesionales
export interface E01Data {
  user_id: string;
  dominio: string;
  email: string;
}

export type EVT_01 = CloudEvent<E01Data>;
export const EVT_01_SUBJECT = 'telemedicina.identidad.usuario.creado.v1';

// EVT-02 - telemedicina.identidad.usuario.bloqueado.v1
// Publisher: WSO2 IS → Identidad | Subscribers: Auditoría, Notificaciones
export interface E02Data {
  user_id: string;
  motivo: string;
}

export type EVT_02 = CloudEvent<E02Data>;
export const EVT_02_SUBJECT = 'telemedicina.identidad.usuario.bloqueado.v1';

// EVT-03 - telemedicina.paciente.creado.v1
// Publisher: Pacientes | Subscribers: Auditoría
export interface E03Data {
  paciente_id: string;
  curp: string;
  tenant_id: string;
}

export type EVT_03 = CloudEvent<E03Data>;
export const EVT_03_SUBJECT = 'telemedicina.paciente.creado.v1';

// EVT-04 - telemedicina.paciente.consentimiento.otorgado.v1
// Publisher: Pacientes | Subscribers: Integraciones, Auditoría
export interface E04Data {
  paciente_id: string;
  tipo: string;
  app_id?: string;
}

export type EVT_04 = CloudEvent<E04Data>;
export const EVT_04_SUBJECT = 'telemedicina.paciente.consentimiento.otorgado.v1';

// EVT-05 - telemedicina.profesional.verificado.v1
// Publisher: Profesionales | Subscribers: Agenda, Auditoría
export interface E05Data {
  profesional_id: string;
  cedula: string;
}

export type EVT_05 = CloudEvent<E05Data>;
export const EVT_05_SUBJECT = 'telemedicina.profesional.verificado.v1';

// EVT-06 - telemedicina.cita.reservada.v1
// Publisher: Agenda | Subscribers: Pagos, Notificaciones, Video
export interface E06Data {
  cita_id: string;
  paciente_id: string;
  profesional_id: string;
  fecha_hora: string;
}

export type EVT_06 = CloudEvent<E06Data>;
export const EVT_06_SUBJECT = 'telemedicina.cita.reservada.v1';

// EVT-07 - telemedicina.cita.confirmada.v1
// Publisher: Agenda | Subscribers: Notificaciones
export interface E07Data {
  cita_id: string;
}

export type EVT_07 = CloudEvent<E07Data>;
export const EVT_07_SUBJECT = 'telemedicina.cita.confirmada.v1';

// EVT-08 - telemedicina.cita.cancelada.v1
// Publisher: Agenda | Subscribers: Pagos, Notificaciones
export interface E08Data {
  cita_id: string;
  motivo: string;
  initiated_by: string;
}

export type EVT_08 = CloudEvent<E08Data>;
export const EVT_08_SUBJECT = 'telemedicina.cita.cancelada.v1';

// EVT-09 - telemedicina.cita.checkin.v1
// Publisher: Agenda | Subscribers: Video, Expediente
export interface E09Data {
  cita_id: string;
  paciente_id: string;
}

export type EVT_09 = CloudEvent<E09Data>;
export const EVT_09_SUBJECT = 'telemedicina.cita.checkin.v1';

// EVT-10 - telemedicina.cita.noshow.v1
// Publisher: Agenda | Subscribers: Pagos, Notificaciones
export interface E10Data {
  cita_id: string;
  paciente_id: string;
}

export type EVT_10 = CloudEvent<E10Data>;
export const EVT_10_SUBJECT = 'telemedicina.cita.noshow.v1';

// EVT-11 - telemedicina.video.sesion.iniciada.v1
// Publisher: Video | Subscribers: Auditoría
export interface E11Data {
  sesion_id: string;
  cita_id: string;
}

export type EVT_11 = CloudEvent<E11Data>;
export const EVT_11_SUBJECT = 'telemedicina.video.sesion.iniciada.v1';

// EVT-12 - telemedicina.video.sesion.finalizada.v1
// Publisher: Video | Subscribers: Expediente, Notificaciones
export interface E12Data {
  sesion_id: string;
  cita_id: string;
  duracion_seg: number;
}

export type EVT_12 = CloudEvent<E12Data>;
export const EVT_12_SUBJECT = 'telemedicina.video.sesion.finalizada.v1';

// EVT-13 - telemedicina.expediente.nota.creada.v1
// Publisher: Expediente | Subscribers: Recetas, Integraciones, Auditoría
export interface E13Data {
  nota_id: string;
  paciente_id: string;
  profesional_id: string;
  cita_id?: string;
}

export type EVT_13 = CloudEvent<E13Data>;
export const EVT_13_SUBJECT = 'telemedicina.expediente.nota.creada.v1';

// EVT-14 - telemedicina.expediente.acceso.registrado.v1
// Publisher: Expediente | Subscribers: Auditoría
export interface E14Data {
  paciente_id: string;
  profesional_id: string;
  motivo: string;
}

export type EVT_14 = CloudEvent<E14Data>;
export const EVT_14_SUBJECT = 'telemedicina.expediente.acceso.registrado.v1';

// EVT-15 - telemedicina.receta.emitida.v1
// Publisher: Recetas | Subscribers: Notificaciones, Integraciones, Auditoría
export interface E15Data {
  receta_id: string;
  paciente_id: string;
  profesional_id: string;
  es_controlada: boolean;
}

export type EVT_15 = CloudEvent<E15Data>;
export const EVT_15_SUBJECT = 'telemedicina.receta.emitida.v1';

// EVT-16 - telemedicina.pago.autorizado.v1
// Publisher: Pagos | Subscribers: Agenda
export interface E16Data {
  transaccion_id: string;
  cita_id: string;
  monto: string;
  metodo: string;
}

export type EVT_16 = CloudEvent<E16Data>;
export const EVT_16_SUBJECT = 'telemedicina.pago.autorizado.v1';

// EVT-17 - telemedicina.pago.capturado.v1
// Publisher: Pagos | Subscribers: Notificaciones, Auditoría
export interface E17Data {
  transaccion_id: string;
  cita_id: string;
  monto: string;
}

export type EVT_17 = CloudEvent<E17Data>;
export const EVT_17_SUBJECT = 'telemedicina.pago.capturado.v1';

// EVT-18 - telemedicina.cfdi.generado.v1
// Publisher: Pagos | Subscribers: Notificaciones, Auditoría
export interface E18Data {
  transaccion_id: string;
  uuid_fiscal: string;
}

export type EVT_18 = CloudEvent<E18Data>;
export const EVT_18_SUBJECT = 'telemedicina.cfdi.generado.v1';

// EVT-19 - telemedicina.notificacion.enviada.v1
// Publisher: Notificaciones | Subscribers: Auditoría
export interface E19Data {
  notificacion_id: string;
  destinatario_id: string;
  canal: string;
}

export type EVT_19 = CloudEvent<E19Data>;
export const EVT_19_SUBJECT = 'telemedicina.notificacion.enviada.v1';

// EVT-20 - telemedicina.alerta.critica.laboratorio.v1
// Publisher: Integraciones | Subscribers: Notificaciones
export interface E20Data {
  paciente_id: string;
  loinc_code: string;
  valor: string;
  severidad: string;
}

export type EVT_20 = CloudEvent<E20Data>;
export const EVT_20_SUBJECT = 'telemedicina.alerta.critica.laboratorio.v1';


// ============================================================
// NATS subjects registry
// ============================================================
export const NATS_SUBJECTS = {
  EVT_01: EVT_01_SUBJECT,
  EVT_02: EVT_02_SUBJECT,
  EVT_03: EVT_03_SUBJECT,
  EVT_04: EVT_04_SUBJECT,
  EVT_05: EVT_05_SUBJECT,
  EVT_06: EVT_06_SUBJECT,
  EVT_07: EVT_07_SUBJECT,
  EVT_08: EVT_08_SUBJECT,
  EVT_09: EVT_09_SUBJECT,
  EVT_10: EVT_10_SUBJECT,
  EVT_11: EVT_11_SUBJECT,
  EVT_12: EVT_12_SUBJECT,
  EVT_13: EVT_13_SUBJECT,
  EVT_14: EVT_14_SUBJECT,
  EVT_15: EVT_15_SUBJECT,
  EVT_16: EVT_16_SUBJECT,
  EVT_17: EVT_17_SUBJECT,
  EVT_18: EVT_18_SUBJECT,
  EVT_19: EVT_19_SUBJECT,
  EVT_20: EVT_20_SUBJECT,
};
