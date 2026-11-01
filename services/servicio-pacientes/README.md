# Servicio Pacientes (`servicio-pacientes`)

Microservicio NestJS del dominio **Pacientes**.

## Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `PORT` | `3002` | Puerto HTTP |
| `DATABASE_URL_PACIENTES` | `postgresql://.../pacientes_db` | Conexión a PostgreSQL |
| `NATS_URL` | `nats://localhost:4222` | Bus de eventos |
| `WSO2_IS_JWKS_URI` | `https://localhost:9443/oauth2/jwks` | JWKS del IdP |

## Endpoints

- `GET /api/v1/pacientes/me` — Perfil del paciente autenticado
- `GET /api/v1/pacientes/:id` — Obtiene un paciente por id
- `POST /api/v1/pacientes/` — Crea el perfil clínico del paciente
- `PATCH /api/v1/pacientes/:id` — Actualiza datos demográficos
- `POST /api/v1/pacientes/:id/consentimientos` — Registra consentimiento informado digital
- `GET /api/v1/pacientes/:id/antecedentes` — Lista antecedentes

- `GET /api/v1/pacientes/health` — health check (público)
- `GET /docs` — Swagger UI

## Desarrollo

```bash
pnpm install
pnpm prisma:generate
pnpm prisma:migrate
pnpm start:dev
```

## Modelo de datos

Ver `prisma/schema.prisma`. La PK principal es `paciente_id` sobre el modelo `paciente`.
