# MEJDAR — Testing Results

**Date:** 2026-07-30  
**Phase:** Pre-push verification

---

## Website (`apps/website`)

### Lint

```bash
npm run lint
```

| Result | Count |
|---|---|
| Errors | 0 |
| Warnings | 1 |

Warning detail:
- `src/app/contact/page.tsx:7` — `metadata` is assigned but never used (`@typescript-eslint/no-unused-vars`). Non-blocking; metadata is exported via Next.js metadata convention but the linter flags the local const.

### Build

```bash
npm run build
```

| Result | Detail |
|---|---|
| Status | PASS — all 14 routes built |
| Output | Static (prerendered) |

Routes compiled:
- `/` (Home)
- `/about`
- `/analytics`
- `/contact`
- `/cookies`
- `/data-processing`
- `/demo`
- `/hospitality`
- `/ordering`
- `/pricing`
- `/reservations`
- `/terms`
- `/privacy`
- `/not-found` (404)

---

## Docker Compose Validation

### Dev (`compose.yaml`)

```bash
docker compose config --quiet
```

**Result:** VALID

### Production-Free (`compose.production-free.yaml`)

```bash
docker compose -f compose.production-free.yaml config --quiet
```

**Result:** VALID

---

## Secret Scan

### Tools used

- `rg` (ripgrep) with pattern matching for `api_key`, `secret`, `password`, `token`, `stripe`, `base64:`, `sk_live`, `sk_test`, `ghp_`, `gho_`, `xoxb-`, `AKIA`
- Manual inspection of `.env` files and config files

### Results

| Scope | Secrets Found |
|---|---|
| Source code (excluding vendor/, node_modules/) | None |
| `.env` files | APP_KEY, DB_PASSWORD, DB_ROOT_PASSWORD — properly excluded from git |
| `apps/restaurant/config/` | All use `env()` helpers — no hardcoded values |
| `packages/` | No secrets |

### Exclusions verified

| File | Excluded from git |
|---|---|
| `.env` | Yes |
| `apps/restaurant/.env` | Yes |
| `apps/restaurant/.env.example` | No (safe placeholders only) |
| `apps/website/.env.local` | Yes |
| `apps/website/.env.production` | Yes |

---

## Container Status (verified earlier)

| Service | Container | Status |
|---|---|---|
| Nginx | mejdar-nginx | healthy |
| PHP-FPM | mejdar-app | healthy |
| MySQL | mejdar-mysql | healthy |
| Redis | mejdar-redis | healthy |
| Mailpit | mejdar-mailpit | healthy |
| Queue Worker | mejdar-queue | running |
| Scheduler | mejdar-scheduler | running |

---

## Outstanding Items

- Website SMTP adapter (form submission persistence) — deferred to post-Phase 5
- PostHog analytics adapter — deferred to post-Phase 5
- Website tests — Phase 8
- E2E Playwright tests — Phase 8
- PHP unit/integration tests — Phase 8
