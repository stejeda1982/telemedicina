# BFF Profesional

Backend for Frontend (BFF) para la audiencia **profesionales**.

Consume **exclusivamente** las APIs publicadas en WSO2 API Manager
(nunca los microservicios internos directamente). Compone payloads
optimizados para el frontend y orquesta consultas de lectura paralelas.

## Endpoints expuestos

| Path | Descripción | Downstream |
|---|---|---|
| `GET /perfil` | Perfil público del profesional | downstream: `GET profesionales/:id` |
| `GET /agenda/hoy` | Citas de hoy | downstream: `GET agenda?fecha=hoy&profesional_id=me` |
| `GET /pacientes/asignados` | Pacientes bajo cuidado | downstream: `GET pacientes?profesional_id=me` |
| `POST /notas` | Crea nota de evolución | downstream: `POST expediente/notas` |
| `POST /recetas` | Emite receta firmada | downstream: `POST recetas (SEQ-04)` |
| `POST /video/sesiones` | Crea sesión WebRTC | downstream: `POST video/sesiones` |
| `GET /bff/profesionales/health` | Health check | — |

## Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `PORT` | `4002` | Puerto HTTP |
| `APIM_GATEWAY_URL` | `https://localhost:8243` | URL del WSO2 API Gateway |
| `CORS_ORIGINS` | `http://localhost:3000` | Orígenes permitidos |

## Desarrollo

```bash
pnpm install
pnpm start:dev
```

Swagger UI disponible en `http://localhost:4002/docs`.
