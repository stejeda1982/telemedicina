# Servicio Videoconsulta (`servicio-video`)

Microservicio NestJS del dominio **Videoconsulta**.

## Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `PORT` | `3005` | Puerto HTTP |
| `DATABASE_URL_VIDEO` | `postgresql://.../video_db` | Conexión a PostgreSQL |
| `NATS_URL` | `nats://localhost:4222` | Bus de eventos |
| `WSO2_IS_JWKS_URI` | `https://localhost:9443/oauth2/jwks` | JWKS del IdP |

## Endpoints

- `POST /api/v1/video/sesiones` — Crea sesión WebRTC para una cita
- `GET /api/v1/video/sesiones/:id` — Obtiene sesión y token
- `POST /api/v1/video/sesiones/:id/marcadores` — Añade marcador clínico durante la consulta
- `POST /api/v1/video/sesiones/:id/finalizar` — Finaliza sesión (inicia SEQ-03)

- `GET /api/v1/video/health` — health check (público)
- `GET /docs` — Swagger UI

## Desarrollo

```bash
pnpm install
pnpm prisma:generate
pnpm prisma:migrate
pnpm start:dev
```

## Modelo de datos

Ver `prisma/schema.prisma`. La PK principal es `sesion_id` sobre el modelo `sesionVideo`.
