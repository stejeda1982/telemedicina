# Servicio Identidad (`servicio-identidad`)

Microservicio NestJS del dominio **Identidad**.

## Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `PORT` | `3001` | Puerto HTTP |
| `DATABASE_URL_IDENTIDAD` | `postgresql://.../identidad_db` | Conexión a PostgreSQL |
| `NATS_URL` | `nats://localhost:4222` | Bus de eventos |
| `WSO2_IS_JWKS_URI` | `https://localhost:9443/oauth2/jwks` | JWKS del IdP |

## Endpoints

- `GET /api/v1/identidad/me` — Obtiene el perfil del usuario autenticado
- `GET /api/v1/identidad/:user_id` — Obtiene un usuario por WSO2 user_id
- `POST /api/v1/identidad/` — Crea o actualiza perfil tras JIT provisioning
- `PATCH /api/v1/identidad/:user_id` — Actualiza claims del usuario
- `GET /api/v1/identidad/:user_id/auditoria` — Historial de sesiones

- `GET /api/v1/identidad/health` — health check (público)
- `GET /docs` — Swagger UI

## Desarrollo

```bash
pnpm install
pnpm prisma:generate
pnpm prisma:migrate
pnpm start:dev
```

## Modelo de datos

Ver `prisma/schema.prisma`. La PK principal es `user_id` sobre el modelo `usuarioPerfil`.
