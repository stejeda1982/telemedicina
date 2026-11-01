# Telemedicina

Repositorio del proyecto de plataforma de telemedicina.

## Documentación

### 01. Análisis y Requisitos (v1.0 — borrador para revisión)

- `docs/01-analisis-requisitos/Telemedicina_Documento_Analisis_Requisitos_v1.0.docx` — documento Word editable
- `docs/01-analisis-requisitos/Telemedicina_Documento_Analisis_Requisitos_v1.0.pdf` — versión PDF para distribución

**Resumen del contenido:**

1. Resumen ejecutivo
2. Introducción y contexto (referencia: Hospital Virtual de México)
3. Análisis de mercado y benchmark
4. Marco regulatorio (NOM-024-SSA3-2012, HIPAA, RGPD, ISO/IEC)
5. Stakeholders y 15 casos de uso críticos (UC-01 a UC-15)
6. Requisitos funcionales por módulo (11 módulos, ~80 requisitos)
7. Requisitos no funcionales (15 RNF)
8. Arquitectura tecnológica (microservicios NestJS + React + PostgreSQL + WebRTC)
9. Modelo de negocio y estrategia comercial
10. Matriz de riesgos (15 riesgos clasificados)
11. Roadmap por fases (Fase 0 a Fase 4, ~44 semanas)
12. Equipo, metodología y estándares de calidad
13. KPIs e indicadores de éxito
14. Conclusiones y próximos pasos
15. Anexo A: Matriz de trazabilidad de requisitos
16. Anexo B: Glosario y referencias

### 02. Diseño Técnico (v1.0 — borrador para revisión)

- `docs/02-diseno-tecnico/Telemedicina_Documento_Diseno_Tecnico_v1.0.docx` — documento Word editable
- `docs/02-diseno-tecnico/Telemedicina_Documento_Diseno_Tecnico_v1.0.pdf` — versión PDF para distribución (48 páginas)

**Decisiones clave del diseño:**

- **WSO2 Identity Server** como proveedor de identidad centralizado (OIDC, SAML 2.0, SCIM 2.0, MFA TOTP/FIDO2, federación institucional, consentimiento SMART on FHIR).
- **WSO2 API Manager** como gateway único de acceso público (validación JWT, throttling por tiers, threat protection, portal de developers).
- **WSO2 Micro Integrator** como orquestador de integración por servicios (sagas coordinadas, agregadores, conectores externos Stripe/MP/PAC-SAT/WhatsApp/Twilio/FHIR).

**Resumen del contenido (15 secciones + 2 anexos):**

1. Resumen ejecutivo
2. Introducción y propósito del documento
3. Decisiones arquitectónicas (7 ADRs)
4. Visión arquitectónica (C4 niveles 1 y 2, topología de red)
5. WSO2 Identity Server (modelo de identidad, federación, MFA, SCIM, consentimiento)
6. WSO2 API Manager (componentes, catálogo de APIs, throttling, dev portal)
7. WSO2 Micro Integrator (orquestación, patrones, secuencias SEQ-01 a SEQ-08, conectores)
8. Catálogo de 12 microservicios de dominio
9. Modelo de datos por servicio + mapeo FHIR R4
10. Comunicación y eventos (NATS JetStream, CloudEvents, outbox, saga, idempotencia)
11. Diagramas de secuencia de flujos críticos (SEQ-01, SEQ-04, SEQ-05, SEQ-07)
12. Seguridad aplicada (defensa en profundidad, secretos, cifrado, auditoría)
13. Infraestructura y despliegue (Kubernetes, namespaces, GitOps, multi-región)
14. Observabilidad (logs, métricas, trazas, dashboards)
15. Plan de despliegue por fases (Fase 0 a Fase 4)
16. Riesgos técnicos (12 riesgos RT-01 a RT-12)
17. Anexo A: Catálogo de APIs públicas
18. Anexo B: Glosario y referencias técnicas

## Estado

- Repositorio inicializado y conectado a `github.com/stejeda1982/telemedicina`.
- Rama principal: `main`.
- Entregables hasta la fecha:
  - 01. Documento de análisis y requisitos v1.0 (borrador para revisión).
  - 02. Documento de diseño técnico v1.0 (borrador para revisión, arquitectura con WSO2).

## Próximos pasos

- Revisión de los documentos 01 y 02 por el equipo técnico y de producto.
- Definición del patrocinador del proyecto y del equipo de la Fase 0.
- Contratación de BAA con el cloud provider.
- Selección de asesoría legal especializada en salud digital.
- Validación de la licencia WSO2 (open source vs enterprise) y capacición del equipo.

