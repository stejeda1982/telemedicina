# BFF Admin

Backend for Frontend (BFF) para la audiencia **administradores**.

Consume **exclusivamente** las APIs publicadas en WSO2 API Manager
(nunca los microservicios internos directamente). Compone payloads
optimizados para el frontend y orquesta consultas de lectura paralelas.

## Endpoints expuestos

| Path | Descripción | Downstream |
|---|---|---|
| `GET /usuarios` | Lista usuarios del tenant | downstream: `GET admin/usuarios` |
| `POST /usuarios` | Crea usuario | downstream: `POST admin/usuarios` |
| `GET /profesionales/verificacion` | Profesionales pendientes de validar | downstream: `GET profesionales?estado=pendiente` |
| `POST /profesionales/:id/verificar` | Verifica profesional | downstream: `POST profesionales/:id/verificar` |
| `GET /audit/eventos` | Bitácora de auditoría | downstream: `GET auditoria/eventos` |
| `GET /kpis/operativos` | KPIs operativos consolidados | downstream: `agregado` |
| `GET /bff/administradores/health` | Health check | — |

## Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `PORT` | `4003` | Puerto HTTP |
| `APIM_GATEWAY_URL` | `https://localhost:8243` | URL del WSO2 API Gateway |
| `CORS_ORIGINS` | `http://localhost:3000` | Orígenes permitidos |

## Desarrollo

```bash
pnpm install
pnpm start:dev
```

Swagger UI disponible en `http://localhost:4003/docs`.
