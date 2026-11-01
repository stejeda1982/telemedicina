# Servicio Pagos y Facturación (`servicio-pagos`)

Microservicio NestJS del dominio **Pagos y Facturación**.

## Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `PORT` | `3008` | Puerto HTTP |
| `DATABASE_URL_PAGOS` | `postgresql://.../pagos_db` | Conexión a PostgreSQL |
| `NATS_URL` | `nats://localhost:4222` | Bus de eventos |
| `WSO2_IS_JWKS_URI` | `https://localhost:9443/oauth2/jwks` | JWKS del IdP |

## Endpoints

- `POST /api/v1/pagos/` — Crea transacción y autoriza en Stripe/MP
- `POST /api/v1/pagos/:id/capturar` — Captura pago autorizado (inicia SEQ-05)
- `POST /api/v1/pagos/:id/reembolsar` — Reembolso total/parcial (inicia SEQ-06)
- `GET /api/v1/pagos/:id` — Detalle de transacción
- `GET /api/v1/pagos/:id/factura` — PDF/CFDI de la transacción

- `GET /api/v1/pagos/health` — health check (público)
- `GET /docs` — Swagger UI

## Desarrollo

```bash
pnpm install
pnpm prisma:generate
pnpm prisma:migrate
pnpm start:dev
```

## Modelo de datos

Ver `prisma/schema.prisma`. La PK principal es `transaccion_id` sobre el modelo `transaccion`.
