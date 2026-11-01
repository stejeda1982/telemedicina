# Infraestructura local

## Servicios

| Servicio | Puerto | Descripción |
|---|---|---|
| PostgreSQL 16 | 5432 | 12 bases de datos, una por microservicio |
| Redis 7 | 6379 | Cache, sesiones y colas BullMQ |
| NATS JetStream 2.10 | 4222 / 8222 | Bus de eventos asíncronos |
| WSO2 Identity Server 7 | 9443 | Proveedor de identidad OIDC/SAML/SCIM |
| WSO2 API Manager 4.4 | 8243 / 9444 / 8081 | Gateway, Publisher, Dev Portal |
| WSO2 Micro Integrator 4.3 | 8290 | Orquestador de servicios |

## Uso

```bash
# Levantar infraestructura
docker compose -f infra/docker-compose.yml up -d

# Verificar
docker compose -f infra/docker-compose.yml ps

# Logs
docker compose -f infra/docker-compose.yml logs -f wso2-is

# Detener
docker compose -f infra/docker-compose.yml down
```

## Volúmenes

Los datos persistentes (`postgres_data`, `redis_data`, `nats_data`) se conservan
entre reinicios. Para reset completo:

```bash
docker compose -f infra/docker-compose.yml down -v
```
