# Plataforma de Telemedicina

Monorepo de la plataforma de telemedicina — 12 microservicios NestJS,
3 BFF, capa WSO2 (Identity Server + API Manager + Micro Integrator),
infraestructura local con Docker Compose y manifiestos Kubernetes.

## Estructura

```
.
├── docs/                          # Documentos de análisis, requisitos y diseño técnico
├── packages/
│   └── contracts/                 # @telemed/contracts: 20 CloudEvents tipados + NATS subjects
├── services/                      # 12 microservicios NestJS
│   ├── servicio-identidad/        # Puente con WSO2 IS (SCIM)
│   ├── servicio-pacientes/        # Perfil demográfico y consentimientos
│   ├── servicio-profesionales/    # Profesionales, cédula, especialidades
│   ├── servicio-agenda/           # Citas y slots
│   ├── servicio-video/            # Sesiones WebRTC con mediasoup
│   ├── servicio-expediente/       # Expediente clínico NOM-024
│   ├── servicio-recetas/          # Recetas con e.firma
│   ├── servicio-pagos/            # Stripe/MP + CFDI 4.0
│   ├── servicio-mensajeria/       # Chat paciente-médico e interconsultas
│   ├── servicio-notificaciones/   # Multi-canal (push/SMS/WhatsApp/email)
│   ├── servicio-integraciones/    # FHIR R4 + HL7 v2 + SMART on FHIR
│   └── servicio-auditoria/        # Bitácora inmutable con hash encadenado
├── bff/                           # 3 Backend-for-Frontend NestJS
│   ├── bff-paciente/              # API para frontend de pacientes
│   ├── bff-profesional/           # API para frontend de profesionales
│   └── bff-admin/                 # API para portal administrativo
├── wso2/
│   ├── identity-server/           # IdP: claims, SPs, IdPs federados, scripts adaptativos
│   ├── api-manager/               # 9 OpenAPI YAMLs + políticas de threat protection
│   └── micro-integrator/          # 8 secuencias SEQ-01 a SEQ-08 + conectores externos
├── infra/
│   ├── docker-compose.yml         # PostgreSQL, Redis, NATS, WSO2 IS/APIM/MI
│   ├── postgres-init/             # Script de creación de las 12 bases
│   └── k8s/                       # Namespaces, NetworkPolicies, deployments
├── .github/workflows/ci.yml       # CI: build, lint, Docker images por servicio
├── package.json                   # Workspace pnpm
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── .env.example                   # Variables de entorno (copia a .env)
```

## Documentación

- `docs/01-analisis-requisitos/` — Análisis y requisitos v1.0 (47 páginas, docx + pdf)
- `docs/02-diseno-tecnico/` — Diseño técnico v1.0 (48 páginas, docx + pdf)

## Requisitos

- Node.js 20+
- pnpm 9+
- Docker y Docker Compose
- (Opcional) kubectl y un clúster Kubernetes para despliegue

## Inicio rápido (desarrollo local)

```bash
# 1. Instalar dependencias del monorepo
pnpm install

# 2. Levantar infraestructura (Postgres, Redis, NATS, WSO2)
cp .env.example .env
docker compose -f infra/docker-compose.yml up -d

# 3. Generar cliente Prisma y aplicar migraciones en cada servicio
pnpm -r --filter './services/*' exec prisma generate
pnpm -r --filter './services/*' exec prisma migrate dev

# 4. Levantar los microservicios (en terminales separadas o con turbo)
pnpm --filter @telemed/servicio-pacientes start:dev
pnpm --filter @telemed/servicio-agenda start:dev
# ... o todos a la vez:
pnpm -r --filter './services/*' run start:dev
```

Cada servicio expone:
- API REST en `http://localhost:<port>/api/v1/<service>`
- Swagger UI en `http://localhost:<port>/docs`
- Health check público en `http://localhost:<port>/api/v1/<service>/health`

## Puertos por servicio

| Servicio | Puerto |
|---|---|
| servicio-identidad | 3001 |
| servicio-pacientes | 3002 |
| servicio-profesionales | 3003 |
| servicio-agenda | 3004 |
| servicio-video | 3005 |
| servicio-expediente | 3006 |
| servicio-recetas | 3007 |
| servicio-pagos | 3008 |
| servicio-mensajeria | 3009 |
| servicio-notificaciones | 3010 |
| servicio-integraciones | 3011 |
| servicio-auditoria | 3012 |
| bff-paciente | 4001 |
| bff-profesional | 4002 |
| bff-admin | 4003 |

## Infraestructura local

| Servicio | Puerto | Descripción |
|---|---|---|
| PostgreSQL 16 | 5432 | 12 bases (una por microservicio) |
| Redis 7 | 6379 | Cache, sesiones, colas |
| NATS JetStream | 4222 / 8222 | Bus de eventos CloudEvents |
| WSO2 Identity Server | 9443 | IdP OIDC/SAML/SCIM |
| WSO2 API Manager | 8243 / 9444 / 8081 | Gateway + Publisher + Dev Portal |
| WSO2 Micro Integrator | 8290 | Orquestador (8 secuencias) |

## Capa WSO2

### Identity Server (IdP)
- 6 claims clínicos locales (CURP, cédula, especialidad, institución, tenant_id, consent_token)
- Service Provider para BFF Paciente (configurable para BFF Profesional/Admin)
- Identity Provider federado SAML 2.0 (ejemplo: Hospital ADFS)
- Scripts adaptativos: step-up MFA para recetas controladas, JIT para profesionales federados
- Federación OIDC y SCIM 2.0 provisioning

### API Manager (Gateway)
- 9 APIs publicadas (paciente, profesional, video, receta, pago, mensaje, fhir, admin, webhooks)
- Tier Bronze/Silver/Gold/Platinum con rate-limiting
- Threat protection: payload 1 MB, profundidad JSON 100, schema validation
- Dev Portal en `developers.telemedicina.mx`

### Micro Integrator (Orquestador)
- 8 secuencias de mediación (SEQ-01 a SEQ-08) con patrón saga coordinada
- Conectores externos: Stripe, Mercado Pago, PAC-SAT, WhatsApp Cloud, FHIR R4
- Endpoints internos apuntando a los 12 microservicios
- Estado de saga persistido en MySQL dedicado del namespace wso2

## Eventos CloudEvents (NATS JetStream)

20 eventos tipados en `packages/contracts/src/events.ts`:

- EVT-01 a EVT-05: identidad y pacientes
- EVT-06 a EVT-10: agenda y citas
- EVT-11 a EVT-12: videoconsulta
- EVT-13 a EVT-15: expediente y recetas
- EVT-16 a EVT-18: pagos y CFDI
- EVT-19 a EVT-20: notificaciones y alertas

Cada evento sigue la especificación CloudEvents 1.0 con los campos
`specversion`, `id`, `source`, `type`, `time`, `data` y la extensión
`correlation_id` para trazabilidad distribuida.

## Seguridad

- Validación de JWT firmados por WSO2 IS vía JWKS en cada microservicio
- Interceptor `CorrelationIdInterceptor` propaga `X-Correlation-Id` de extremo a extremo
- Multi-tenant con `tenant_id` propagado como claim del JWT
- MFA obligatoria para profesionales y administradores
- Cifrado AES-256 en reposo, TLS 1.3 en tránsito
- Auditoría inmutable con hash encadenado en `servicio-auditoria`

## CI/CD

GitHub Actions (`.github/workflows/ci.yml`):
- Build y lint por servicio (matriz de 12 servicios + 3 BFF)
- Build de imágenes Docker y push a GHCR en merges a `main`
- Imágenes taggueadas con el commit SHA para trazabilidad

## Roadmap de implementación

Este monorepo corresponde a la Fase 0/1 del roadmap del TDD:
- ✅ Estructura del monorepo y scaffolding de servicios
- ✅ Modelos de datos Prisma por servicio
- ✅ Capa WSO2 (configs + secuencias skeleton)
- ✅ Infraestructura local con Docker Compose
- ✅ Manifiestos Kubernetes + NetworkPolicies
- 🚧 Implementación completa de cada endpoint (en progreso)
- 🚧 Tests unitarios y de integración
- 🚧 Sequences de mediación WSO2 MI en producción
- 📋 Despliegue productivo multi-región (Fase 3+)

## Licencia

Propietaria. Confidencial.
