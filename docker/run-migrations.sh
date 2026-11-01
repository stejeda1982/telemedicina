#!/bin/bash
# ============================================================
# run-migrations.sh — Ejecuta prisma migrate en los 12 servicios
#
# Asume que PostgreSQL ya está corriendo (docker-compose.dev.yml up -d)
# y que las 12 databases ya fueron creadas por docker/postgres/init.sql.
#
# Uso:
#   ./docker/run-migrations.sh
# ============================================================

set -euo pipefail

cd "$(dirname "$0")/.."

SERVICES=(
  identidad pacientes profesionales agenda video expediente
  recetas pagos mensajeria notificaciones integraciones auditoria
)

echo "=== Ejecutando migraciones Prisma en ${#SERVICES[@]} servicios ==="
echo ""

SUCCESS=0
FAILED=0

for svc in "${SERVICES[@]}"; do
  svc_dir="services/servicio-$svc"
  db_url="DATABASE_URL_${svc^^}"

  # Get the DATABASE_URL for this service from .env or environment
  db_connection="${!db_url:-postgresql://telemed:telemed@localhost:5432/telemed_${svc}}"

  echo -n "  $svc... "

  # Run prisma migrate deploy (applies existing migrations without prompting)
  if (cd "$svc_dir" && DATABASE_URL="$db_connection" npx prisma migrate deploy 2>&1 | grep -v "^$\|Prisma schema\|Generated\|Start by\|Tip:" | tail -3); then
    echo "✓"
    SUCCESS=$((SUCCESS + 1))
  else
    echo "✗ (ver migrations en $svc_dir/prisma/migrations)"
    FAILED=$((FAILED + 1))
  fi
done

echo ""
echo "=== Resumen ==="
echo "  Exitosos: $SUCCESS / ${#SERVICES[@]}"
if [ "$FAILED" -gt 0 ]; then
  echo "  Fallidos:  $FAILED"
  echo ""
  echo "  Nota: si los servicios no tienen migrations creadas, genera primero:"
  echo "    cd services/servicio-<svc> && npx prisma migrate dev --name init"
  exit 1
fi

echo ""
echo "=== Migraciones completadas. Las 12 databases están listas. ==="
