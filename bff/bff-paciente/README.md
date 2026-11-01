# BFF Paciente

Backend for Frontend (BFF) para la audiencia **pacientes**.

Consume **exclusivamente** las APIs publicadas en WSO2 API Manager
(nunca los microservicios internos directamente). Compone payloads
optimizados para el frontend y orquesta consultas de lectura paralelas.

## Endpoints expuestos

| Path | Descripción | Downstream |
|---|---|---|
| `GET /perfil` | Obtiene perfil + preferencias del paciente | downstream: `GET paciente/me` |
| `GET /citas/proximas` | Próximas 5 citas del paciente | downstream: `GET agenda?estado=reservada&limit=5` |
| `GET /citas/:id/detalle` | Detalle completo de cita | downstream: `GET agenda/:id (agregado)` |
| `GET /expediente/notas` | Notas del expediente del paciente | downstream: `GET expediente/paciente/:paciente_id/notas` |
| `GET /recetas/vigentes` | Recetas vigentes | downstream: `GET recetas/paciente/:paciente_id` |
| `POST /citas` | Reserva una cita | downstream: `POST agenda (SEQ-01)` |
| `POST /mensajes` | Envía mensaje | downstream: `POST mensajeria/conversaciones/:id/mensajes` |
| `GET /bff/pacientes/health` | Health check | — |

## Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `PORT` | `4001` | Puerto HTTP |
| `APIM_GATEWAY_URL` | `https://localhost:8243` | URL del WSO2 API Gateway |
| `CORS_ORIGINS` | `http://localhost:3000` | Orígenes permitidos |

## Desarrollo

```bash
pnpm install
pnpm start:dev
```

Swagger UI disponible en `http://localhost:4001/docs`.
