# WSO2 Micro Integrator 4.x - Orquestación

Este directorio contiene las secuencias de mediación (SEQ-01 a SEQ-08)
y los conectores externos que el Micro Integrator expone al API Gateway.

## Estructura

- `sequences/` — secuencias de mediación XML (proxy services / APIs)
- `connectors/` — conectores externos (Stripe, MP, PAC-SAT, WhatsApp, FHIR)
- `endpoints/` — endpoints internos de los microservicios

## Despliegue

Los archivos `.xml` se montan en el volumen
`/home/wso2carbon/wso2mi-4.3.0/repository/deployment/server/synapse-configs/default`
del contenedor WSO2 MI.

## Diagramas de secuencia

Ver `docs/02-diseno-tecnico/Telemedicina_Documento_Diseno_Tecnico_v1.0.pdf`
sección 11 (Diagramas de Secuencia de Flujos Críticos).
