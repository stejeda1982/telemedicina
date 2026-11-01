# WSO2 API Manager 4.x - APIs publicadas

Este directorio contiene las definiciones OpenAPI 3.1 de las 9 APIs
publicadas en WSO2 API Manager. Cada API se importa desde el
Publisher (https://localhost:9444/publisher) o vía REST Admin API.

## Flujo de publicación

1. Importar el archivo YAML desde el Publisher (Add new API → OpenAPI).
2. Configurar el backend endpoint (Micro Integrator o servicio directo).
3. Definir tier de throttling (Bronze/Silver/Gold/Platinum).
4. Publicar (lifecycle → Publish).
5. Suscribir desde el Dev Portal y obtener claves.

## APIs

| API | Contexto | Versión | Audiencia |
|---|---|---|---|
| paciente | /paciente | 1.0.0 | BFF Paciente |
| profesional | /profesional | 1.0.0 | BFF Profesional |
| video | /video | 1.0.0 | BFF (pac+prof) |
| receta | /receta | 1.0.0 | BFF Profesional |
| pago | /pago | 1.0.0 | BFF Paciente |
| mensaje | /mensaje | 1.0.0 | BFF (pac+prof) |
| fhir | /fhir | 1.0.0 | Apps externas SMART |
| admin | /admin | 1.0.0 | BFF Admin |
| webhooks | /webhooks | 1.0.0 | Apps externas |
