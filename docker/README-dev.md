# Entorno de Desarrollo — docker-compose.dev.yml

## Arquitectura del entorno

```
┌─────────────────────────────────────────────────────────────┐
│                    Host (localhost)                          │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  PostgreSQL  │  │  NATS JS     │  │   Redis      │      │
│  │   :5432      │  │  :4222/:8222 │  │   :6379      │      │
│  │  12 DBs      │  │  Stream:     │  │  cache +     │      │
│  │  (una/svc)   │  │  TELEMEDICINA│  │  sessions    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                  │                 │               │
│         └──────────┬───────┴─────────────────┘               │
│                    │                                         │
│  ┌─────────────────────────────────────────────────┐        │
│  │           12 microservicios NestJS               │        │
│  │  :3001 identidad    :3007 recetas                │        │
│  │  :3002 pacientes    :3008 pagos                  │        │
│  │  :3003 prof.        :3009 mensajeria             │        │
│  │  :3004 agenda       :3010 notificaciones         │        │
│  │  :3005 video        :3011 integraciones          │        │
│  │  :3006 expediente   :3012 auditoria              │        │
│  └─────────────────────────────────────────────────┘        │
│                                                              │
│  ┌─────────────────────────────────────────────────┐        │
│  │              3 BFFs (API Gateway)                │        │
│  │  :4001 bff-paciente   :4003 bff-admin            │        │
│  │  :4002 bff-profesional                            │        │
│  └─────────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## Requisitos previos

- Docker 24+ y Docker Compose v2
- pnpm 12+ y Node.js 20+ (para desarrollo local fuera de Docker)
- 4 GB de RAM disponibles

## Inicio rápido

### Opción A: Solo infraestructura (recomendado para dev local)

Levanta PostgreSQL, NATS JetStream y Redis. Los microservicios se
ejecutan localmente con `pnpm start:dev` para hot-reload rápido.

```bash
# 1. Copiar variables de entorno
cp .env.dev .env

# 2. Levantar infraestructura
docker compose -f docker-compose.dev.yml up -d

# 3. Verificar que los servicios están saludables
docker compose -f docker-compose.dev.yml ps

# 4. Ejecutar migraciones (crea las tablas en las 12 databases)
./docker/run-migrations.sh

# 5. Configurar JetStream streams y consumers
./docker/nats/setup-jetstream.sh

# 6. Iniciar servicios localmente (en terminales separadas)
cd services/servicio-pacientes && pnpm start:dev
cd services/servicio-agenda && pnpm start:dev
# ... o todos a la vez:
pnpm -r --parallel run start:dev
```

### Opción B: Todo en Docker (para pruebas E2E)

Levanta infraestructura + 12 microservicios + 3 BFFs.

```bash
cp .env.dev .env

# Build y levantar todo
docker compose -f docker-compose.dev.yml --profile full up -d --build

# Ejecutar migraciones
./docker/run-migrations.sh

# Configurar JetStream
./docker/nats/setup-jetstream.sh

# Verificar
docker compose -f docker-compose.dev.yml --profile full ps
```

## Servicios y puertos

| Servicio           | Puerto | Database               | Swagger UI              |
|--------------------|--------|------------------------|-------------------------|
| svc-identidad      | 3001   | telemed_identidad      | http://localhost:3001/docs |
| svc-pacientes      | 3002   | telemed_pacientes      | http://localhost:3002/docs |
| svc-profesionales  | 3003   | telemed_profesionales  | http://localhost:3003/docs |
| svc-agenda         | 3004   | telemed_agenda         | http://localhost:3004/docs |
| svc-video          | 3005   | telemed_video          | http://localhost:3005/docs |
| svc-expediente     | 3006   | telemed_expediente     | http://localhost:3006/docs |
| svc-recetas        | 3007   | telemed_recetas        | http://localhost:3007/docs |
| svc-pagos          | 3008   | telemed_pagos          | http://localhost:3008/docs |
| svc-mensajeria     | 3009   | telemed_mensajeria     | http://localhost:3009/docs |
| svc-notificaciones | 3010   | telemed_notificaciones | http://localhost:3010/docs |
| svc-integraciones  | 3011   | telemed_integraciones  | http://localhost:3011/docs |
| svc-auditoria      | 3012   | telemed_auditoria      | http://localhost:3012/docs |
| bff-paciente       | 4001   | —                      | http://localhost:4001/docs |
| bff-profesional    | 4002   | —                      | http://localhost:4002/docs |
| bff-admin          | 4003   | —                      | http://localhost:4003/docs |

## Infraestructura

### PostgreSQL

- **Imagen**: postgres:16-alpine
- **Usuario**: telemed / telemed
- **12 databases**: una por microservicio (aislamiento de datos)
- **Init script**: `docker/postgres/init.sql` (crea DBs + extensión uuid-ossp)
- **Conexión**: `postgresql://telemed:telemed@localhost:5432/telemed_<svc>`

Conectar con psql:
```bash
docker exec -it telemed-postgres psql -U telemed -d telemed_pacientes
```

### NATS JetStream

- **Imagen**: nats:2.10-alpine
- **JetStream**: habilitado con file storage
- **Stream**: `TELEMEDICINA` (subjects: `telemedicina.>`)
- **Consumers**: `notificaciones-svc`, `auditoria-svc`
- **Puertos**: 4222 (clientes), 8222 (monitoring HTTP)
- **Límites**: 256MB memoria, 1GB disco, retención 72h, 100K mensajes

Monitoring:
```bash
# Dashboard HTTP
curl http://localhost:8222/jsz | jq

# Streams
docker exec telemed-nats nats stream list

# Consumers
docker exec telemed-nats nats consumer list TELEMEDICINA
```

### Redis

- **Imagen**: redis:7-alpine
- **Configuración**: AOF persistence, 128MB maxmemory, política LRU
- **Uso**: cache de sesiones, rate limiting, idempotencia keys
- **Puerto**: 6379

```bash
docker exec -it telemed-redis redis-cli
```

## Operaciones comunes

### Ver logs

```bash
# Infraestructura
docker compose -f docker-compose.dev.yml logs -f postgres
docker compose -f docker-compose.dev.yml logs -f nats

# Un servicio específico (profile full)
docker compose -f docker-compose.dev.yml logs -f svc-pacientes

# Todos
docker compose -f docker-compose.dev.yml --profile full logs -f
```

### Reiniciar un servicio

```bash
docker compose -f docker-compose.dev.yml --profile full restart svc-pacientes
```

### Ejecutar migraciones después de cambiar un schema

```bash
# 1. Crear la migración (solo en dev)
cd services/servicio-pacientes
npx prisma migrate dev --name add_new_field

# 2. Aplicar a todas las databases
cd ../..
./docker/run-migrations.sh
```

### Reset completo (¡borra todos los datos!)

```bash
docker compose -f docker-compose.dev.yml down -v
docker compose -f docker-compose.dev.yml up -d
./docker/run-migrations.sh
./docker/nats/setup-jetstream.sh
```

### Pruebas E2E con curl

```bash
# Health check
curl http://localhost:3002/health

# Crear un paciente (requiere JWT válido de WSO2 IS)
curl -X POST http://localhost:3002/pacientes \
  -H "Authorization: Bearer <jwt>" \
  -H "Content-Type: application/json" \
  -d '{"user_id":"550e8400-e29b-41d4-a716-446655440000","curp":"GOOA850101HDFLRN01","nombres":"Juan","apellido_p":"Pérez","fecha_nac":"1985-01-01","sexo":"M","telefono":"5512345678","email":"juan@test.com"}'

# Swagger UI de cualquier servicio
open http://localhost:3002/docs
```

## WSO2 Identity Server

El entorno dev no incluye WSO2 IS (requiere Java 11+ y 4GB adicionales).
Los endpoints `/health` son públicos (`@Public()` decorator).

Para validar JWTs reales, desplegar WSO2 IS por separado y configurar:
```bash
WSO2_IS_JWKS_URI=https://localhost:9443/oauth2/jwks
WSO2_IS_ISSUER=https://localhost:9443/oauth2/token
```

## Tests

```bash
# Unit tests (83 tests en 12 servicios)
pnpm test:all

# Un servicio específico
cd services/servicio-pacientes && pnpm test

# Type-check
cd services/servicio-pacientes && npx tsc --noEmit
```

## Troubleshooting

### "Cannot connect to PostgreSQL"
```bash
docker compose -f docker-compose.dev.yml ps postgres
docker compose -f docker-compose.dev.yml logs postgres
```

### "NATS connection refused"
```bash
docker compose -f docker-compose.dev.yml ps nats
curl http://localhost:8222/healthz
```

### "Prisma Client not generated"
```bash
cd services/servicio-pacientes
npx prisma generate
```

### "Port already in use"
```bash
lsof -i :3002  # encontrar el proceso
kill -9 <PID>
```
