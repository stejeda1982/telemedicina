# Servicio Profesionales (`servicio-profesionales`)

Microservicio NestJS del dominio **Profesionales**.

## Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `PORT` | `3003` | Puerto HTTP |
| `DATABASE_URL_PROFESIONALES` | `postgresql://.../profesionales_db` | Conexión a PostgreSQL |
| `NATS_URL` | `nats://localhost:4222` | Bus de eventos |
| `WSO2_IS_JWKS_URI` | `https://localhost:9443/oauth2/jwks` | JWKS del IdP |

## Endpoints

- `GET /api/v1/profesionales/:id` — Perfil público del profesional
- `GET /api/v1/profesionales/` — Lista profesionales (con filtros)
- `POST /api/v1/profesionales/` — Crea perfil profesional (admin)
- `POST /api/v1/profesionales/:id/verificar` — Marca como verificado tras validación DGP
- `GET /api/v1/profesionales/:id/disponibilidad` — Slots disponibles
- `POST /api/v1/profesionales/:id/tarifas` — Crea tarifa

- `GET /api/v1/profesionales/health` — health check (público)
- `GET /docs` — Swagger UI

## Desarrollo

```bash
pnpm install
pnpm prisma:generate
pnpm prisma:migrate
pnpm start:dev
```

## Modelo de datos

Ver `prisma/schema.prisma`. La PK principal es `profesional_id` sobre el modelo `profesional`.
