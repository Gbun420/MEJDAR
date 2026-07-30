# MEJDAR — Dependencies

**Last verified:** 2026-07-30

---

## PHP Dependencies (Composer)

### Core Platform

| Package | Version | Source | Licence | Purpose |
|---|---|---|---|---|
| `tastyigniter/tastyigniter` | v4.3.4 | [Packagist](https://packagist.org/packages/tastyigniter/tastyigniter) | MIT | TastyIgniter project installer |
| `tastyigniter/core` | v4.3.3 | [Packagist](https://packagist.org/packages/tastyigniter/core) | MIT | Core restaurant platform |
| `laravel/framework` | ^12.0 | [Packagist](https://packagist.org/packages/laravel/framework) | MIT | Laravel framework (pulled by TI) |

### Theme

| Package | Version | Source | Licence | Purpose |
|---|---|---|---|---|
| `tastyigniter/ti-theme-orange` | v4.2.0 | [Packagist](https://packagist.org/packages/tastyigniter/ti-theme-orange) | MIT | Orange base theme |

**Note:** Orange theme auto-installs these extensions as dependencies:

| Extension | Package |
|---|---|
| Cart | `tastyigniter/ti-ext-cart` |
| Coupons | `tastyigniter/ti-ext-coupons` |
| Frontend | `tastyigniter/ti-ext-frontend` |
| Local | `tastyigniter/ti-ext-local` |
| Pages | `tastyigniter/ti-ext-pages` |
| PayRegister | `tastyigniter/ti-ext-payregister` |
| Reservation | `tastyigniter/ti-ext-reservation` |
| Socialite | `tastyigniter/ti-ext-socialite` |
| User | `tastyigniter/ti-ext-user` |

### Additional Extensions (to install manually)

| Package | Source | Licence | Purpose | Status |
|---|---|---|---|---|
| `tastyigniter/ti-ext-api` | Packagist | MIT | RESTful API | To verify |
| `tastyigniter/ti-ext-automation` | Packagist | MIT | Automation rules | To verify |
| `tastyigniter/ti-ext-reports` | Marketplace | TBD | Reporting | To verify free availability |

---

## Node.js Dependencies (npm)

| Package | Version | Source | Licence | Purpose |
|---|---|---|---|---|
| `next` | 16.2.12 | [npmjs.com](https://www.npmjs.com/package/next) | MIT | React framework |
| `react` | 19.x | [npmjs.com](https://www.npmjs.com/package/react) | MIT | UI library |
| `typescript` | 5.x | [npmjs.com](https://www.npmjs.com/package/typescript) | Apache-2.0 | Type checking |
| `tailwindcss` | 4.x | [npmjs.com](https://www.npmjs.com/package/tailwindcss) | MIT | CSS framework |

---

## System Dependencies

| Component | Version | Source | Purpose |
|---|---|---|---|
| PHP | 8.3+ | [dockerhub](https://hub.docker.com/_/php) | Application runtime |
| MySQL | 8.0 | [dockerhub](https://hub.docker.com/_/mysql) | Database |
| Redis | 7 | [dockerhub](https://hub.docker.com/_/redis) | Cache, session, queue |
| Nginx | stable-alpine | [dockerhub](https://hub.docker.com/_/nginx) | Web server |
| Node.js | 20.9+ | [nodejs.org](https://nodejs.org) | Website build |

---

## PHP Extensions Required

- bcmath
- ctype
- curl
- dom
- exif
- gd (with jpeg, webp)
- intl
- json
- mbstring
- openssl
- pdo_mysql
- tokenizer
- xml
- zip
- soap
- opcache
- redis

---

## Audit Notes

- All packages verified against official sources (Packagist, npmjs, Docker Hub)
- No typo-squatted packages identified
- No custom package registries required
- Marketplace extensions (Reports, Webhooks) need free-availability verification before installation
