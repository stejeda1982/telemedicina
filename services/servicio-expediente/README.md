# Servicio Expediente Clínico (`servicio-expediente`)

Microservicio NestJS del dominio **Expediente Clínico**.

## Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `PORT` | `3006` | Puerto HTTP |
| `DATABASE_URL_EXPEDIENTE` | `postgresql://.../expediente_db` | Conexión a PostgreSQL |
| `NATS_URL` | `nats://localhost:4222` | Bus de eventos |
| `WSO2_IS_JWKS_URI` | `https://localhost:9443/oauth2/jwks` | JWKS del IdP |

## Endpoints

- `GET /api/v1/expediente/paciente/:paciente_id/notas` — Lista notas de evolución del paciente
- `POST /api/v1/expediente/notas` — Crea nota de evolución (vincula cita)
- `GET /api/v1/expediente/notas/:id` — Obtiene nota con signos vitales y adjuntos
- `POST /api/v1/expediente/notas/:id/signos-vitales` — Registra signos vitales
- `POST /api/v1/expediente/notas/:id/adjuntos` — Carga adjunto (S3 presigned)
- `POST /api/v1/expediente/paciente/:paciente_id/acceso` — Registra acceso al expediente (auditoría)

- `GET /api/v1/expediente/health` — health check (público)
- `GET /docs` — Swagger UI

## Desarrollo

```bash
pnpm install
pnpm prisma:generate
pnpm prisma:migrate
pnpm start:dev
```

## Modelo de datos

Ver `prisma/schema.prisma`. La PK principal es `nota_id` sobre el modelo `notaEvolucion`.
