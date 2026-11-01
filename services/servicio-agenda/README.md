# Servicio Agenda y Citas (`servicio-agenda`)

Microservicio NestJS del dominio **Agenda y Citas**.

## Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `PORT` | `3004` | Puerto HTTP |
| `DATABASE_URL_AGENDA` | `postgresql://.../agenda_db` | Conexión a PostgreSQL |
| `NATS_URL` | `nats://localhost:4222` | Bus de eventos |
| `WSO2_IS_JWKS_URI` | `https://localhost:9443/oauth2/jwks` | JWKS del IdP |

## Endpoints

- `GET /api/v1/agenda/` — Lista citas (filtros: paciente, profesional, fecha)
- `POST /api/v1/agenda/` — Reserva una cita (inicia SEQ-01)
- `GET /api/v1/agenda/:id` — Detalle de cita
- `POST /api/v1/agenda/:id/cancelar` — Cancela cita
- `POST /api/v1/agenda/:id/checkin` — Check-in a sala de espera (inicia SEQ-02)
- `POST /api/v1/agenda/:id/reprogramar` — Reprograma cita

- `GET /api/v1/agenda/health` — health check (público)
- `GET /docs` — Swagger UI

## Desarrollo

```bash
pnpm install
pnpm prisma:generate
pnpm prisma:migrate
pnpm start:dev
```

## Modelo de datos

Ver `prisma/schema.prisma`. La PK principal es `cita_id` sobre el modelo `cita`.
