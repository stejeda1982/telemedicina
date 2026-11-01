# Servicio Notificaciones (`servicio-notificaciones`)

Microservicio NestJS del dominio **Notificaciones**.

## Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `PORT` | `3010` | Puerto HTTP |
| `DATABASE_URL_NOTIFICACIONES` | `postgresql://.../notificaciones_db` | Conexión a PostgreSQL |
| `NATS_URL` | `nats://localhost:4222` | Bus de eventos |
| `WSO2_IS_JWKS_URI` | `https://localhost:9443/oauth2/jwks` | JWKS del IdP |

## Endpoints

- `POST /api/v1/notificaciones/` — Encola notificación (consumida por NATS)
- `GET /api/v1/notificaciones/me` — Lista notificaciones del usuario
- `POST /api/v1/notificaciones/:id/reintentar` — Reintenta envío fallido
- `PATCH /api/v1/notificaciones/preferencias` — Actualiza preferencias multi-canal

- `GET /api/v1/notificaciones/health` — health check (público)
- `GET /docs` — Swagger UI

## Desarrollo

```bash
pnpm install
pnpm prisma:generate
pnpm prisma:migrate
pnpm start:dev
```

## Modelo de datos

Ver `prisma/schema.prisma`. La PK principal es `notificacion_id` sobre el modelo `notificacion`.
