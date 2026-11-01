-- WSO2 Micro Integrator saga_state table
-- Persists the state of each saga execution for compensation tracking.
-- Database: wso2mi_saga (datasource jdbc/wso2mi_saga)

CREATE DATABASE IF NOT EXISTS wso2mi_saga;
USE wso2mi_saga;

CREATE TABLE IF NOT EXISTS saga_state (
  saga_id        VARCHAR(64)  NOT NULL,
  sequence_id    VARCHAR(64)  NOT NULL,
  status         ENUM('STARTED','COMPLETED','COMPENSATED','FAILED') NOT NULL DEFAULT 'STARTED',
  started_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed_at   TIMESTAMP    NULL,
  correlation_id VARCHAR(64)  NULL,
  payload        TEXT         NULL,
  error          TEXT         NULL,
  PRIMARY KEY (saga_id, sequence_id),
  INDEX idx_saga_status (status, started_at),
  INDEX idx_saga_correlation (correlation_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Sample queries:
-- SELECT * FROM saga_state WHERE status='STARTED' AND started_at < NOW() - INTERVAL 5 MINUTE;
-- (find stuck sagas for cleanup)
