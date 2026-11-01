# Servicio Recetas Electrónicas (`servicio-recetas`)

Microservicio NestJS del dominio **Recetas Electrónicas**.

## Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `PORT` | `3007` | Puerto HTTP |
| `DATABASE_URL_RECETAS` | `postgresql://.../recetas_db` | Conexión a PostgreSQL |
| `NATS_URL` | `nats://localhost:4222` | Bus de eventos |
| `WSO2_IS_JWKS_URI` | `https://localhost:9443/oauth2/jwks` | JWKS del IdP |

## Endpoints

- `POST /api/v1/recetas/` — Crea receta en borrador (inicia SEQ-04)
- `GET /api/v1/recetas/:id` — Detalle de receta (con QR)
- `POST /api/v1/recetas/:id/firmar` — Firma e.firma + timbra (continúa SEQ-04)
- `POST /api/v1/recetas/:id/enviar` — Envía receta al paciente y farmacia
- `GET /api/v1/recetas/:id/qr` — Genera/verifica QR de anti-falsificación
- `GET /api/v1/recetas/paciente/:paciente_id` — Recetas vigentes del paciente

- `GET /api/v1/recetas/health` — health check (público)
- `GET /docs` — Swagger UI

## Desarrollo

```bash
pnpm install
pnpm prisma:generate
pnpm prisma:migrate
pnpm start:dev
```

## Modelo de datos

Ver `prisma/schema.prisma`. La PK principal es `receta_id` sobre el modelo `receta`.
