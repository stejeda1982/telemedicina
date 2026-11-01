# WSO2 Identity Server 7.x - Configuración

Este directorio contiene los artifacts de configuración del IdP de la
plataforma de telemedicina. Los archivos se montan en el volumen
`/home/wso2carbon/wso2is-7.0.0/repository/deployment/server` del
contenedor WSO2 IS en el `docker-compose.yml`.

## Estructura

- `claim-dialects/local-claims.xml` — claims clínicos personalizados
- `service-providers/` — Service Providers (RP) para los BFF y apps SMART
- `identity-providers/` — Identity Providers federados (IdPs institucionales)
- `scripts/` — scripts de autenticación adaptativa (MFA, step-up, JIT)

## Configuración inicial

1. Iniciar WSO2 IS: `docker compose -f infra/docker-compose.yml up -d wso2-is`
2. Acceder a la consola: `https://localhost:9443/carbon`
3. Usuario/clave por defecto: `admin/admin` (cambiar en producción)
4. Importar los artifacts de este directorio desde la consola
