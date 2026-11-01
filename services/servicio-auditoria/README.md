# Servicio Auditoría (`servicio-auditoria`)

Microservicio NestJS del dominio **Auditoría**.

## Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `PORT` | `3012` | Puerto HTTP |
| `DATABASE_URL_AUDITORIA` | `postgresql://.../auditoria_db` | Conexión a PostgreSQL |
| `NATS_URL` | `nats://localhost:4222` | Bus de eventos |
| `WSO2_IS_JWKS_URI` | `https://localhost:9443/oauth2/jwks` | JWKS del IdP |

## Endpoints

- `GET /api/v1/auditoria/eventos` — Lista eventos (filtros: actor, recurso, fechas)
- `GET /api/v1/auditoria/eventos/:evento_id` — Detalle de un evento
- `GET /api/v1/auditoria/cadena/hash` — Verifica integridad de la cadena de hash
- `POST /api/v1/auditoria/eventos` — Registra evento (consumido por NATS, append-only)

- `GET /api/v1/auditoria/health` — health check (público)
- `GET /docs` — Swagger UI

## Desarrollo

```bash
pnpm install
pnpm prisma:generate
pnpm prisma:migrate
pnpm start:dev
```

## Modelo de datos

Ver `prisma/schema.prisma`. La PK principal es `evento_id` sobre el modelo `eventoAuditoria`.
