# WSO2 Micro Integrator — Secuencias de Orquestación

8 secuencias que orquestan sagas multi-servicio sobre los 12 microservicios.

## Secuencias

| SEQ | Nombre | Patrón | Servicios | Compensación |
|-----|--------|--------|-----------|---------------|
| 01 | reserva-cita | saga | pacientes + profesionales + agenda + pagos | DELETE cita + reembolsar pago |
| 02 | checkin-video | sequential | agenda + video | — |
| 03 | cierre-video | sequential | video + expediente + agenda | — |
| 04 | receta-firmada | sequential | recetas (create + firmar + enviar) | receta voided by service |
| 05 | pago-cfdi | saga + retry(3) | pagos + sat-cfdi-connector | reembolsar si CFDI falla post-capture |
| 06 | reembolso | sequential | pagos | — |
| 07 | export-fhir | fetch + transform | pacientes + expediente | — |
| 08 | interconsulta | saga | mensajeria + profesionales + agenda | cancel interconsulta |

## Endpoints

Cada secuencia se expone como API REST en el contexto `/seq-XX-name`:

```
POST /seq-01-reserva-cita
POST /seq-02-checkin-video
POST /seq-03-cierre-video
POST /seq-04-receta-firmada
POST /seq-05-pago-cfdi
POST /seq-06-reembolso
POST /seq-07-export-fhir
POST /seq-08-interconsulta
```

## Saga State

Persistida en MySQL (`wso2mi_saga.saga_state`), datasource `jdbc/wso2mi_saga`.
DDL en `saga_state.sql`.

Cada saga registra: `saga_id`, `sequence_id`, `status` (STARTED→COMPLETED/COMPENSATED),
`started_at`, `completed_at`, `correlation_id`, `error`.

## Headers Propagados

- `X-Correlation-Id` — generado por API Gateway, propagado a todos los servicios
- `X-JWT-Sub` — subject del JWT (user_id)
- `X-JWT-Tenant` — tenant_id
- `Authorization` — Bearer token reenviado a los servicios backend

## Fault Sequences Reutilizables

- `fault-response-404` — recurso no encontrado
- `fault-response-502` — error de servicio upstream

## Compensación (SEQ-01 ejemplo)

```
STARTED
  → validate paciente (GET)
  → validate profesional (GET)
  → create cita (POST)        ← step_cita_created=true
  → auth hold pago (POST)     ← step_pago_created=true
COMPLETED

[si falla en cualquier paso después de crear cita]
FAULT:
  ← reembolsar pago (si step_pago_created)
  ← DELETE cita (si step_cita_created)
COMPENSATED
```

## Despliegue

Los archivos XML se copian a `<EI_HOME>/repository/deployment/server/synapse-configs/default/api/`
y las secuencias reutilizables a `.../sequences/`. WSO2 MI hot-deploya automáticamente.
