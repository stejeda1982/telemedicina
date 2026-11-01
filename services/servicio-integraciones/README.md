# Servicio Integraciones EHR / FHIR (`servicio-integraciones`)

Microservicio NestJS del dominio **Integraciones EHR / FHIR**.

## Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `PORT` | `3011` | Puerto HTTP |
| `DATABASE_URL_INTEGRACIONES` | `postgresql://.../integraciones_db` | Conexión a PostgreSQL |
| `NATS_URL` | `nats://localhost:4222` | Bus de eventos |
| `WSO2_IS_JWKS_URI` | `https://localhost:9443/oauth2/jwks` | JWKS del IdP |

## Endpoints

- `GET /api/v1/integraciones/fhir/Patient/:id` — Recurso FHIR Patient (SEQ-07)
- `GET /api/v1/integraciones/fhir/Patient/:id/$everything` — Bundle FHIR completo del paciente (SEQ-07)
- `GET /api/v1/integraciones/fhir/MedicationRequest` — Recetas como MedicationRequest
- `POST /api/v1/integraciones/fhir/Communication` — Crea Communication (mensaje clínico)
- `POST /api/v1/integraciones/aplicaciones` — Registra aplicación SMART on FHIR
- `POST /api/v1/integraciones/webhooks` — Registra webhook para eventos

- `GET /api/v1/integraciones/health` — health check (público)
- `GET /docs` — Swagger UI

## Desarrollo

```bash
pnpm install
pnpm prisma:generate
pnpm prisma:migrate
pnpm start:dev
```

## Modelo de datos

Ver `prisma/schema.prisma`. La PK principal es `app_id` sobre el modelo `aplicacion`.
