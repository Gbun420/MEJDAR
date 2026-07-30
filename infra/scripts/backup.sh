#!/bin/bash
# MEJDAR — Backup Script
# Usage: ./backup.sh [--dry-run]
#
# Backs up:
# 1. MySQL database
# 2. Application storage (media, uploads)
# 3. Creates checksummed archives
#
# Retention: keeps last 7 daily backups

set -euo pipefail

# ─── Configuration ───────────────────────────────────────────────────
BACKUP_DIR="/var/backups/mejdar"
COMPOSE_FILE="compose.production-free.yaml"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=7
DRY_RUN=false

# Parse arguments
if [[ "${1:-}" == "--dry-run" ]]; then
    DRY_RUN=true
    echo "[DRY RUN] No files will be created."
fi

# ─── Helpers ─────────────────────────────────────────────────────────
log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"; }
fail() { echo "[ERROR] $1" >&2; exit 1; }

# ─── Pre-flight checks ──────────────────────────────────────────────
log "Starting MEJDAR backup..."

if ! command -v docker &>/dev/null; then
    fail "Docker is not installed or not in PATH."
fi

if ! docker compose -f "$COMPOSE_FILE" ps mysql --status running | grep -q running; then
    fail "MySQL container is not running."
fi

# ─── Create backup directory ────────────────────────────────────────
if [[ "$DRY_RUN" == false ]]; then
    mkdir -p "$BACKUP_DIR"
fi

# ─── Backup MySQL ────────────────────────────────────────────────────
log "Backing up MySQL database..."
DB_BACKUP_FILE="$BACKUP_DIR/mejdar_db_${TIMESTAMP}.sql.gz"

if [[ "$DRY_RUN" == true ]]; then
    log "[DRY RUN] Would create: $DB_BACKUP_FILE"
else
    docker compose -f "$COMPOSE_FILE" exec -T mysql \
        mysqldump -u root -p"${DB_ROOT_PASSWORD}" \
        --single-transaction --routines --triggers \
        --all-databases 2>/dev/null \
        | gzip > "$DB_BACKUP_FILE" \
        || fail "MySQL backup failed."

    if [[ -s "$DB_BACKUP_FILE" ]]; then
        log "Database backup created: $DB_BACKUP_FILE ($(du -h "$DB_BACKUP_FILE" | cut -f1))"
    else
        fail "Database backup file is empty."
    fi
fi

# ─── Backup storage ─────────────────────────────────────────────────
log "Backing up application storage..."
STORAGE_BACKUP_FILE="$BACKUP_DIR/mejdar_storage_${TIMESTAMP}.tar.gz"

if [[ "$DRY_RUN" == true ]]; then
    log "[DRY RUN] Would create: $STORAGE_BACKUP_FILE"
else
    # Find the storage volume
    STORAGE_PATH=$(docker compose -f "$COMPOSE_FILE" exec -T app \
        php -r "echo config('app.storage_path') ?: storage_path();" 2>/dev/null || echo "/var/www/html/storage")

    docker compose -f "$COMPOSE_FILE" exec -T app \
        tar czf - -C "$(dirname "$STORAGE_PATH")" "$(basename "$STORAGE_PATH")" \
        > "$STORAGE_BACKUP_FILE" 2>/dev/null \
        || fail "Storage backup failed."

    if [[ -s "$STORAGE_BACKUP_FILE" ]]; then
        log "Storage backup created: $STORAGE_BACKUP_FILE ($(du -h "$STORAGE_BACKUP_FILE" | cut -f1))"
    else
        log "Warning: Storage backup is empty (no uploads yet)."
    fi
fi

# ─── Generate checksums ────────────────────────────────────────────
if [[ "$DRY_RUN" == false ]]; then
    log "Generating checksums..."
    cd "$BACKUP_DIR"
    sha256sum "mejdar_db_${TIMESTAMP}.sql.gz" > "mejdar_db_${TIMESTAMP}.sql.gz.sha256"
    sha256sum "mejdar_storage_${TIMESTAMP}.tar.gz" > "mejdar_storage_${TIMESTAMP}.tar.gz.sha256"
    cd - > /dev/null
fi

# ─── Retention cleanup ──────────────────────────────────────────────
if [[ "$DRY_RUN" == false ]]; then
    log "Cleaning up backups older than $RETENTION_DAYS days..."
    DELETED_DB=$(find "$BACKUP_DIR" -name "mejdar_db_*.sql.gz" -mtime +${RETENTION_DAYS} -print -delete | wc -l)
    DELETED_STORAGE=$(find "$BACKUP_DIR" -name "mejdar_storage_*.tar.gz" -mtime +${RETENTION_DAYS} -print -delete | wc -l)
    DELETED_SHA=$(find "$BACKUP_DIR" -name "*.sha256" -mtime +${RETENTION_DAYS} -print -delete | wc -l)
    log "Removed $DELETED_DB database backups, $DELETED_STORAGE storage backups, $DELETED_SHA checksums."
fi

# ─── Summary ────────────────────────────────────────────────────────
log "Backup complete."
if [[ "$DRY_RUN" == false ]]; then
    log "Contents of $BACKUP_DIR:"
    ls -lh "$BACKUP_DIR"/mejdar_*_${TIMESTAMP}.* 2>/dev/null || true
fi
