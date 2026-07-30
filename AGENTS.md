# MEJDAR — Agent Guide

**Project:** MEJDAR Hospitality Systems  
**Repo:** https://github.com/Gbun420/MEJDAR.git  
**Stack:** TastyIgniter v4 (Laravel 12, PHP 8.3) + Next.js (TypeScript, Tailwind)

---

## Project Structure

```
MEJDAR/
├── apps/
│   ├── restaurant/          # TastyIgniter app (Laravel)
│   │   ├── app/             # Controllers, Models, Providers
│   │   ├── config/          # Laravel/TI config
│   │   ├── database/        # Migrations, seeds
│   │   ├── routes/          # web.php, api.php
│   │   ├── tests/           # PHPUnit tests
│   │   └── composer.json    # Composer deps (run from here)
│   └── website/             # Next.js marketing site
│       ├── src/             # App Router, components, config
│       └── package.json     # Node deps
├── packages/
│   ├── mejdar/
│   │   ├── ti-ext-core/     # MEJDAR core extension
│   │   └── ti-theme-mejdar-order/  # MEJDAR theme
│   └── brand/               # Brand assets
├── infra/                   # Docker configs, Nginx, PHP Dockerfiles
├── docs/                    # Documentation
├── compose.yaml             # Dev Docker Compose
├── compose.production-free.yaml  # Oracle free tier
├── docker-compose.production.yml # General VPS
├── Makefile                 # Dev commands
└── .github/workflows/ci.yml  # GitHub Actions CI
```

---

## Development Commands

### Start/Stop

```bash
make up          # Start all containers
make down        # Stop all containers
make restart     # Restart all containers
make shell       # Open shell in PHP-FPM container
make logs        # Tail all logs
```

### TastyIgniter (from `apps/restaurant/`)

```bash
docker compose exec app php artisan test --no-interaction   # Run tests
docker compose exec app php artisan list                    # List commands
docker compose exec app php artisan tinker                  # REPL
```

**Important:** There is no root `composer.json`. All Composer commands must run from `apps/restaurant/`.

### Next.js (from `apps/website/`)

```bash
cd apps/website && npm run dev    # Start dev server
cd apps/website && npm run build  # Build for production
cd apps/website && npm run lint   # Run ESLint
```

---

## Key Conventions

### TastyIgniter Extensions

- Extension package names use the regex `^[A-Za-z]+(\.?)+[A-Za-z]+$` (e.g., `igniter.mejdarcore`)
- Middleware group: `['web', 'igniter', 'igniter:admin']` (colon notation, not dot)
- Theme settings accessed via `settings()->get('theme://...')`
- Routes in extensions use `Route::prefix('admin/mejdar')` with `Route::middleware(['igniter:admin'])`

### Database

- Generated columns (e.g., `reservations.reserve_datetime`) must not appear in INSERT statements
- `menu_categories` is a join table — menu items link via `category_id`
- Fresh install `locations` table has limited columns (no `offer_delivery`, `delivery_time`)
- Admin user must have `status=1`, `super_user=1` to log in

### Testing

- PHPUnit tests in `apps/restaurant/tests/`
- Do NOT use `RefreshDatabase` — TastyIgniter schema not in test DB
- Tests use existing DB state (admin user, theme, tables)
- CSRF protection may block direct login POST — tests accept 200, 302, or 419
- Health endpoint accepts 503 for degraded cache (not a failure)

### Docker

- PHP-FPM image does not have `php-fpm-healthcheck` — use `php -r 'echo "ok";'` for healthchecks
- App volumes must NOT be `:ro` — storage/cache need write access
- Queue and scheduler need `./packages:/var/www/packages` volume mount
- Mailpit UI at `http://localhost:8025`

### Git

- Branch: `main`
- Remote: `origin`
- Commits: Conventional format (`feat:`, `fix:`, `docs:`, `chore:`)
- Pre-commit: Run `npm run lint` (website) and `docker compose exec app php artisan test`

---

## Known Limitations

- Contact form submission is simulated (no SMTP persistence)
- No Playwright E2E tests
- Privacy controls are template-only (no consent management)
- Security headers not explicitly configured beyond Laravel defaults
- Performance not formally measured
- No CI caching (Composer, npm)

---

## Credentials (Local Dev Only)

| Service | URL | Credentials |
|---|---|---|
| Admin | http://localhost:8080/admin | admin@mejdar.local / password |
| Storefront | http://localhost:8080 | — |
| Mailpit | http://localhost:8025 | — |
| MySQL | localhost:3306 | mejdar / secret |
| Redis | localhost:6379 | (no password) |
