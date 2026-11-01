# Servicio Mensajería (`servicio-mensajeria`)

Microservicio NestJS del dominio **Mensajería**.

## Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `PORT` | `3009` | Puerto HTTP |
| `DATABASE_URL_MENSAJERIA` | `postgresql://.../mensajeria_db` | Conexión a PostgreSQL |
| `NATS_URL` | `nats://localhost:4222` | Bus de eventos |
| `WSO2_IS_JWKS_URI` | `https://localhost:9443/oauth2/jwks` | JWKS del IdP |

## Endpoints

- `POST /api/v1/mensajeria/conversaciones` — Crea conversación (paciente-profesional)
- `GET /api/v1/mensajeria/conversaciones` — Lista conversaciones del usuario
- `POST /api/v1/mensajeria/conversaciones/:id/mensajes` — Envía mensaje
- `GET /api/v1/mensajeria/conversaciones/:id/mensajes` — Lista mensajes
- `POST /api/v1/mensajeria/conversaciones/:id/interconsulta` — Solicita interconsulta (SEQ-08)

- `GET /api/v1/mensajeria/health` — health check (público)
- `GET /docs` — Swagger UI

## Desarrollo

```bash
pnpm install
pnpm prisma:generate
pnpm prisma:migrate
pnpm start:dev
```

## Modelo de datos

Ver `prisma/schema.prisma`. La PK principal es `conversacion_id` sobre el modelo `conversacion`.
