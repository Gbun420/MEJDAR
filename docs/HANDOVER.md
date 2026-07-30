# MEJDAR — Handover Document

**Date:** 2026-07-30  
**Phase:** MVP Complete (Phases 0-10)  
**Status:** Ready for deployment

---

## 1. Project Summary

MEJDAR is a white-label hospitality management platform built on TastyIgniter v4. It provides restaurant ordering, reservations, analytics, and a marketing website. The MVP is complete and ready for production deployment.

### What's Included

- **TastyIgniter v4.3.4** — Restaurant ordering and reservation system
- **MEJDAR Theme** — Custom branded theme inheriting from Orange
- **MEJDAR Core Extension** — Health endpoint, reports, settings, demo seeding
- **Next.js Website** — 14-page marketing site with lead capture
- **Docker Infrastructure** — Dev and production Docker Compose configs
- **Demo Data** — Harbour Table restaurant with 53 menu items, 25 orders, 8 reservations
- **CI Pipeline** — GitHub Actions with linting, testing, and building
- **Testing** — 24 PHPUnit tests, website lint and build verification
- **Documentation** — Deployment guide, testing results, implementation log

---

## 2. Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Nginx     │────▶│  PHP-FPM    │────▶│   MySQL     │
│   :8080     │     │   :9000     │     │   :3306     │
└─────────────┘     └──────┬──────┘     └─────────────┘
                           │
                    ┌──────┴──────┐
                    │    Redis    │
                    │   :6379     │
                    └─────────────┘

┌─────────────┐     ┌─────────────┐
│   Mailpit   │     │   Queue     │
│  :8025      │     │  Worker     │
└─────────────┘     └─────────────┘

┌─────────────┐
│  Scheduler  │
│  (cron)     │
└─────────────┘
```

### Services (7 total)

| Service | Container | Port | Purpose |
|---|---|---|---|
| Nginx | mejdar-nginx | 8080 | Web server, reverse proxy |
| PHP-FPM | mejdar-app | 9000 | Application server |
| MySQL | mejdar-mysql | 3306 | Database |
| Redis | mejdar-redis | 6379 | Cache, queue, sessions |
| Mailpit | mejdar-mailpit | 8025 | Email capture (dev) |
| Queue Worker | mejdar-queue | — | Background jobs |
| Scheduler | mejdar-scheduler | — | Cron tasks |

---

## 3. Credentials

### Local Development

| Service | URL | Credentials |
|---|---|---|
| Admin Panel | http://localhost:8080/admin | admin@mejdar.local / password |
| Storefront | http://localhost:8080 | — |
| Mailpit UI | http://localhost:8025 | — |
| MySQL | localhost:3306 | mejdar / secret |
| Redis | localhost:6379 | (no password) |

### Production Environment Variables

Required in `.env`:

```bash
APP_KEY=                    # php artisan key:generate
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_HOST=                    # Database host
DB_PORT=3306
DB_DATABASE=mejdar
DB_USERNAME=mejdar
DB_PASSWORD=                # Strong password
DB_ROOT_PASSWORD=           # Strong password

REDIS_HOST=                 # Redis host
REDIS_PORT=6379
REDIS_PASSWORD=             # Redis password (if auth enabled)

STRIPE_KEY=                 # Stripe publishable key
STRIPE_SECRET=              # Stripe secret key
STRIPE_WEBHOOK_SECRET=      # Stripe webhook secret
STRIPE_ENABLED=false        # Enable when ready

MAIL_MAILER=smtp
MAIL_HOST=                  # SMTP host
MAIL_PORT=587
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=tls
```

---

## 4. Deployment

### Quick Start (Docker)

```bash
# Clone
git clone https://github.com/Gbun420/MEJDAR.git
cd MEJDAR

# Configure
cp .env.example .env
# Edit .env with production values

# Build and start
docker compose -f docker-compose.production.yml up -d

# Install TastyIgniter
docker compose -f docker-compose.production.yml exec app php artisan igniter:install --force --no-interaction

# Seed demo data
docker compose -f docker-compose.production.yml exec app php artisan tinker
```

### Deployment Guides

- **Docker/VPS:** `docs/DEPLOYMENT.md` (comprehensive)
- **Netlify (website):** Deployed at https://shiny-crisp-0a25e3.netlify.app — auto-deploys from `main`
- **Oracle Free Tier:** `compose.production-free.yaml`

---

## 5. Development Workflow

### Making Changes

```bash
# Start dev environment
make up

# Run tests
docker compose exec app php artisan test --no-interaction

# Lint website
cd apps/website && npm run lint

# Build website
cd apps/website && npm run build

# Format PHP
docker compose exec app ./vendor/bin/pint
```

### Commit Convention

```
feat:     New feature
fix:      Bug fix
docs:     Documentation only
chore:    Maintenance, dependencies
refactor: Code restructuring
test:     Adding/updating tests
```

### CI/CD

**Active CI provider:** CircleCI (free plan, no credit card required for public repos)

CircleCI runs on every push to any branch:

1. **php-lint** — Composer validate, PHP Pint, composer audit
2. **website-lint** — ESLint for Next.js
3. **restaurant-tests** — PHPUnit with MySQL 8 + Redis 7 (24 tests)
4. **website-build** — Next.js production build

**Config:** `.circleci/config.yml`

**GitHub Actions (inactive):** `.github/workflows/ci.yml` is valid but blocked by an account-level billing lock. Kept for future use.

---

## 6. Known Issues

### By Design

- Contact form submission is simulated (no SMTP persistence)
- No E2E Playwright tests
- Privacy controls are template-only (no consent management)
- Security headers beyond Laravel defaults not configured

### Schema Gotchas

- `reservations.reserve_datetime` is a generated column — never include in INSERT statements
- `menu_categories` is a join table — items link via `category_id`, not the other way
- Fresh install `locations` table has limited columns (no `offer_delivery`, `delivery_time`)
- Admin user must have `status=1`, `super_user=1` to log in

### Docker Gotchas

- PHP-FPM image does not have `php-fpm-healthcheck` — use `php -r 'echo "ok";'` for healthchecks
- App volumes must NOT be `:ro` — storage and cache need write access
- Queue and scheduler need `./packages:/var/www/packages` volume mount
- `igniter:install` resets theme to default — must re-activate `mejdar-order` in DB after install

---

## 7. Testing

### PHPUnit

```bash
docker compose exec app php artisan test --no-interaction
```

**Result:** 24 passed, 1 skipped, 0 failed

### Website

```bash
cd apps/website && npm run lint   # 0 errors, 1 warning
cd apps/website && npm run build  # 14 routes, all static
```

### Health Endpoint

```bash
curl http://localhost:8080/api/health
```

Returns: `{"status":"ok","theme":"mejdar-order","php":"8.3.32","laravel":"12.64.0"}`

---

## 8. File Reference

### Key Files

| File | Purpose |
|---|---|
| `compose.yaml` | Dev Docker Compose |
| `docker-compose.production.yml` | Production Docker Compose |
| `compose.production-free.yaml` | Oracle free tier compose |
| `Makefile` | Dev commands |
| `netlify.toml` | Netlify deployment config |
| `.github/workflows/ci.yml` | CI pipeline |
| `apps/restaurant/composer.json` | TastyIgniter dependencies |
| `apps/website/package.json` | Next.js dependencies |
| `packages/mejdar/ti-ext-core/` | MEJDAR core extension |
| `packages/mejdar/ti-theme-mejdar-order/` | MEJDAR theme |
| `docs/DEPLOYMENT.md` | Deployment guide |
| `docs/BUILD_STATUS.md` | Current build status |
| `docs/TESTING.md` | Test results |
| `docs/IMPLEMENTATION_LOG.md` | Development log |

### Package Structure

```
packages/mejdar/
├── ti-ext-core/
│   ├── src/
│   │   ├── Console/         # Artisan commands
│   │   ├── Http/Controllers/  # Reports, Settings, Health
│   │   ├── Models/          # Setting model
│   │   └── ServiceProvider.php
│   └── composer.json
└── ti-theme-mejdar-order/
    ├── resources/
    │   ├── assets/          # CSS, JS
    │   └── views/           # Blade templates
    └── theme.json
```

---

## 9. Next Steps

### Immediate

1. **Configure Stripe** — Add API keys to `.env`, enable in settings
2. **Set up SMTP** — Configure mail credentials for transactional emails
3. **Custom domain** — Connect a domain to Netlify (or point DNS to the app server)
4. **Deploy TastyIgniter** — Follow `docs/DEPLOYMENT.md` for the restaurant backend

### Short-term

1. **Contact form persistence** — Add SMTP adapter for form submissions
2. **PostHog analytics** — Integrate analytics tracking
3. **E2E tests** — Add Playwright tests for critical flows
4. **Security headers** — Configure CSP, HSTS, X-Frame-Options

### Medium-term

1. **Multi-location** — Extend demo data for multiple restaurants
2. **Payment integration** — Stripe checkout for online orders
3. **Email templates** — Order confirmation, reservation reminders
4. **Mobile app** — React Native or Flutter companion

---

## 10. Support

- **Repository:** https://github.com/Gbun420/MEJDAR.git
- **Issues:** https://github.com/Gbun420/MEJDAR/issues
- **Spec:** `MEJDAR_OpenCode_Master_Build_Spec.md`
- **Agent Guide:** `AGENTS.md`

---

**Handover completed:** 2026-07-30  
**Build status:** MVP Complete — All 10 phases verified  
**Ready for:** Production deployment
