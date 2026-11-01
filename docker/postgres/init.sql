-- ============================================================
-- PostgreSQL init script — creates 12 databases (one per microservice)
-- Executed automatically by postgres:16-alpine on first container start.
-- ============================================================

-- Each microservice has its own database for isolation.
-- User 'telemed' is created by POSTGRES_USER env var; here we grant
-- ownership of each database to that user.

CREATE DATABASE telemed_identidad;
CREATE DATABASE telemed_pacientes;
CREATE DATABASE telemed_profesionales;
CREATE DATABASE telemed_agenda;
CREATE DATABASE telemed_video;
CREATE DATABASE telemed_expediente;
CREATE DATABASE telemed_recetas;
CREATE DATABASE telemed_pagos;
CREATE DATABASE telemed_mensajeria;
CREATE DATABASE telemed_notificaciones;
CREATE DATABASE telemed_integraciones;
CREATE DATABASE telemed_auditoria;

-- Grant privileges to the telemed user (created by POSTGRES_USER)
GRANT ALL PRIVILEGES ON DATABASE telemed_identidad TO telemed;
GRANT ALL PRIVILEGES ON DATABASE telemed_pacientes TO telemed;
GRANT ALL PRIVILEGES ON DATABASE telemed_profesionales TO telemed;
GRANT ALL PRIVILEGES ON DATABASE telemed_agenda TO telemed;
GRANT ALL PRIVILEGES ON DATABASE telemed_video TO telemed;
GRANT ALL PRIVILEGES ON DATABASE telemed_expediente TO telemed;
GRANT ALL PRIVILEGES ON DATABASE telemed_recetas TO telemed;
GRANT ALL PRIVILEGES ON DATABASE telemed_pagos TO telemed;
GRANT ALL PRIVILEGES ON DATABASE telemed_mensajeria TO telemed;
GRANT ALL PRIVILEGES ON DATABASE telemed_notificaciones TO telemed;
GRANT ALL PRIVILEGES ON DATABASE telemed_integraciones TO telemed;
GRANT ALL PRIVILEGES ON DATABASE telemed_auditoria TO telemed;

-- Enable UUID extension in each database (Prisma schemas use @db.Uuid)
-- \c is a psql meta-command: must be on its own line, followed by SQL.
\c telemed_identidad
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\c telemed_pacientes
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\c telemed_profesionales
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\c telemed_agenda
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\c telemed_video
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\c telemed_expediente
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\c telemed_recetas
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\c telemed_pagos
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\c telemed_mensajeria
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\c telemed_notificaciones
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\c telemed_integraciones
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\c telemed_auditoria
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
