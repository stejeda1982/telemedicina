#!/bin/bash
# ============================================================
# setup-jetstream.sh — Configura streams y consumers de NATS JetStream
#
# Crea:
#   - Stream TELEMEDICINA (subjects: telemedicina.>)
#   - Consumer notificaciones-svc (filter: telemedicina.*.creado.v1, etc.)
#   - Consumer auditoria-svc (filter: telemedicina.> — registra todo)
#
# Uso:
#   ./docker/nats/setup-jetstream.sh
#
# Requiere: nats CLI (nats-top) instalado o usar el contenedor:
#   docker exec -it telemed-nats nats [comando]
# ============================================================

set -euo pipefail

NATS_SERVER="${NATS_URL:-nats://localhost:4222}"

echo "=== Configurando NATS JetStream en $NATS_SERVER ==="

# Usar el CLI dentro del contenedor si está disponible
NATS_CMD="nats"
if ! command -v nats &>/dev/null; then
  NATS_CMD="docker exec telemed-nats nats"
  echo "  (nats CLI no encontrado localmente, usando contenedor)"
fi

# --- Stream principal ---
echo ""
echo "--- Creando stream TELEMEDICINA ---"
$NATS_CMD stream add TELEMEDICINA \
  --server "$NATS_SERVER" \
  --subjects "telemedicina.>" \
  --storage file \
  --retention limits \
  --max-age 72h \
  --max-msgs 100000 \
  --duplicate-window 5m \
  --replicas 1 \
  --description "Eventos de dominio de la plataforma de telemedicina" \
  --defaults \
  2>/dev/null || echo "  (stream ya existe o error no fatal)"

# --- Consumer: servicio-notificaciones ---
echo ""
echo "--- Creando consumer notificaciones-svc ---"
$NATS_CMD consumer add TELEMEDICINA notificaciones-svc \
  --server "$NATS_SERVER" \
  --filter "telemedicina.>" \
  --ack explicit \
  --max-deliver 5 \
  --max ack-pending 100 \
  --redeliver-in 30s \
  --deliver all \
  --description "Consumer del servicio de notificaciones" \
  --defaults \
  2>/dev/null || echo "  (consumer ya existe o error no fatal)"

# --- Consumer: servicio-auditoria ---
echo ""
echo "--- Creando consumer auditoria-svc ---"
$NATS_CMD consumer add TELEMEDICINA auditoria-svc \
  --server "$NATS_SERVER" \
  --filter "telemedicina.>" \
  --ack explicit \
  --max-deliver 3 \
  --max ack-pending 500 \
  --redeliver-in 10s \
  --deliver all \
  --description "Consumer del servicio de auditoría (append-only log)" \
  --defaults \
  2>/dev/null || echo "  (consumer ya existe o error no fatal)"

# --- Verificar ---
echo ""
echo "=== Streams configurados ==="
$NATS_CMD stream list --server "$NATS_SERVER" 2>/dev/null || true

echo ""
echo "=== Consumers configurados ==="
$NATS_CMD consumer list TELEMEDICINA --server "$NATS_SERVER" 2>/dev/null || true

echo ""
echo "=== JetStream listo ==="
echo "  Stream: TELEMEDICINA (telemedicina.>)"
echo "  Consumers: notificaciones-svc, auditoria-svc"
echo "  Monitoring: http://localhost:8222/jsz"
