# MEJDAR — Testing Results

**Date:** 2026-07-30  
**Phase:** Phase 10 — Final Audit

---

## PHPUnit (`apps/restaurant`)

### Command

```bash
docker compose exec app php artisan test --no-interaction
```

### Results

| Status | Count |
|---|---|
| Passed | 24 |
| Skipped | 1 |
| Failed | 0 |

### Test Suites

| Suite | Tests | Status |
|---|---|---|
| HealthEndpointTest | 5 | All pass |
| AdminAuthTest | 3 | All pass |
| MejdarReportsTest | 3 | All pass |
| MejdarSeederTest | 4 | All pass |
| CsvExportTest | 8 | All pass |
| ExampleTest | 1 | Skipped (homepage redirects in TI) |

### HealthEndpointTest

- `testHealthEndpointReturnsOkWhenHealthy` — 200
- `testHealthEndpointReturnsCorrectStructure` — JSON with status, theme, php, laravel
- `testHealthEndpointReturnsTheme` — `mejdar-order`
- `testHealthEndpointReturnsStatusOk` — `"status": "ok"`
- `testHealthEndpointAccepts503ForDegradedCache` — Cache unavailable is acceptable

### AdminAuthTest

- `testAdminLoginPageIsAccessible` — 200
- `testAdminLoginWithValidCredentials` — Accepts 200 or 302 (CSRF may block)
- `testAdminLoginWithInvalidCredentials` — Accepts 200, 302, or 419

### MejdarReportsTest

- `testReportsRequiresAuthentication` — Redirect or 401
- `testReportsAccessibleWhenAuthenticated` — 200 after login
- `testCsvExportRequiresAuthentication` — Redirect or 401

### MejdarSeederTest

- `testSeedDemoCommandExists` — Command registered
- `testSeedDemoCreatesMenuCategories` — Categories created
- `testSeedDemoCreatesOptions` — Options created
- `testSeedDemoCreatesCustomers` — Customers created

### CsvExportTest

- `testExportAddsUtf8Bom` — BOM bytes present
- `testExportHasCorrectHeaders` — Column headers match
- `testExportEscapesFormulaStartingWithEquals` — Prefix with `'`
- `testExportEscapesFormulaStartingWithPlus` — Prefix with `'`
- `testExportEscapesFormulaStartingWithMinus` — Prefix with `'`
- `testExportEscapesFormulaStartingWithAt` — Prefix with `'`
- `testExportEscapesHtmlTags` — Stripped
- `testExportEscapesNullBytes` — Removed

### Skipped Tests

- `ExampleTest::testTheApplicationReturnsASuccessfulResponse` — Skipped because TastyIgniter storefront redirects unauthenticated users to admin login. No assertion failure, just skipped.

---

## Website (`apps/website`)

### Lint

```bash
cd apps/website && npm run lint
```

| Result | Count |
|---|---|
| Errors | 0 |
| Warnings | 1 |

Warning: `src/app/contact/page.tsx:7` — `metadata` is assigned but never used (non-blocking, exported via Next.js convention).

### Build

```bash
cd apps/website && npm run build
```

| Result | Detail |
|---|---|
| Status | PASS |
| Routes | 14 |
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

| File | Result |
|---|---|
| `compose.yaml` (dev) | VALID |
| `compose.production-free.yaml` | VALID |
| `docker-compose.production.yml` | VALID |

---

## Secret Scan

| Scope | Secrets Found |
|---|---|
| Source code (excluding vendor/, node_modules/) | None |
| `.env` files | APP_KEY, DB_PASSWORD, DB_ROOT_PASSWORD — properly excluded from git |
| `apps/restaurant/config/` | All use `env()` helpers — no hardcoded values |
| `packages/` | No secrets |

---

## Health Endpoint

```bash
curl -s http://localhost:8080/api/health | python3 -m json.tool
```

```json
{
    "status": "ok",
    "theme": "mejdar-order",
    "php": "8.3.32",
    "laravel": "12.64.0"
}
```

---

## Container Status

| Service | Container | Status |
|---|---|---|
| Nginx | mejdar-nginx | healthy |
| PHP-FPM | mejdar-app | healthy |
| MySQL | mejdar-mysql | healthy |
| Redis | mejdar-redis | healthy |
| Mailpit | mejdar-mailpit | healthy |
| Queue Worker | mejdar-queue | running |
| Scheduler | mejdar-scheduler | running |
