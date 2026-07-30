# MEJDAR — OpenCode Master Build Specification

**Project:** MEJDAR Hospitality Systems  
**Initial product:** MEJDAR Order  
**Core restaurant engine:** TastyIgniter v4.x  
**Business model:** Individually branded, managed ordering and reservation systems for restaurants and takeaways  
**Future scope:** Restaurants, cafés, takeaways, guesthouses, boutique hotels and holiday accommodation  
**Primary market:** Malta, designed to expand internationally  
**Tagline:** Own every order. Welcome every guest.

---

## 1. Your role

You are the lead engineer, product designer, DevOps engineer, QA engineer and technical writer for this project.

Build the complete MEJDAR MVP from an empty or existing repository, taking it from local development to a production-ready handover. Work systematically, verify assumptions against primary documentation, test every important workflow and keep a clear implementation log.

Do not merely produce a plan. Implement the plan, run the tests, fix failures and finish the documented acceptance criteria.

When an external secret, paid account, domain, SMTP credential, Stripe key or production server is unavailable:

1. Build the complete integration behind environment variables.
2. use sandbox/test mode or a local fake service;
3. add validation and a clear setup guide;
4. continue with all work that does not require the secret;
5. record the exact remaining manual step in `docs/HANDOVER.md`.

Do not claim that an untested feature works.

---

## 2. Non-negotiable engineering rules

### 2.1 Protect upstream software

- Use the current stable TastyIgniter v4.x release.
- Do not edit files under `vendor/`.
- Do not patch TastyIgniter core directly.
- Do not modify the Orange theme in place.
- Implement MEJDAR changes through:
  - a dedicated MEJDAR child/derived theme;
  - MEJDAR extensions;
  - configuration;
  - events, components and supported overrides.
- Keep the platform upgradeable.
- Pin dependencies to compatible, reproducible versions.
- Record all third-party software and licences in `THIRD_PARTY_NOTICES.md`.

### 2.2 Verify package provenance

Before installing any Composer, npm or system package:

- confirm its exact package name from the official project documentation, official GitHub organisation or official package registry;
- reject typo-squatted or unofficial lookalike packages;
- do not add custom package registries without documenting and justifying them;
- record the package name, source URL, version and licence in `docs/DEPENDENCIES.md`;
- run appropriate dependency audits after installation.

### 2.3 Protect data and infrastructure

- Never commit `.env`, API keys, passwords, private keys, database dumps or customer data.
- Provide `.env.example` files containing safe placeholders.
- Do not use real customer data in development or tests.
- Do not run destructive commands against an unknown database or server.
- Do not run `git push`, production deployment, DNS changes, billing actions or real payments without explicit human approval.
- Keep CSRF protection enabled.
- Use prepared queries/ORMs rather than raw unparameterised SQL.
- Validate and authorise every administrative action.
- Escape output and sanitise user-provided rich content.
- Add rate limiting to public forms and sensitive endpoints.
- Use secure cookies in production.
- Keep debug mode disabled in production.

### 2.4 Work discipline

- Inspect the repository before changing it.
- If it is non-empty, preserve useful existing work and document conflicts.
- Maintain `docs/IMPLEMENTATION_LOG.md`.
- Maintain a task checklist in `docs/BUILD_STATUS.md`.
- Complete one phase at a time.
- Run targeted tests after each meaningful change.
- Run the complete verification suite before every milestone commit.
- Use small, descriptive Git commits.
- Do not commit broken builds.
- Do not suppress failing tests merely to pass CI.
- Do not delete tests that expose a bug.
- Prefer simple, maintainable code over unnecessary custom frameworks.

---

## 3. Product architecture

Create a monorepo with the following target structure. Adapt only when the installed framework requires a different internal layout.

```text
mejdar/
├── AGENTS.md
├── README.md
├── THIRD_PARTY_NOTICES.md
├── .editorconfig
├── .gitignore
├── .env.example
├── Makefile
├── composer.json                  # only if required at monorepo level
├── package.json                   # workspace scripts if useful
├── apps/
│   ├── restaurant/                # TastyIgniter v4 application template
│   └── website/                   # MEJDAR public marketing website
├── packages/
│   ├── brand/                     # shared logos, tokens and usage guide
│   └── demo-data/                 # safe fictional restaurant seed content
├── infra/
│   ├── docker/
│   ├── nginx/
│   ├── scripts/
│   └── production/
├── tests/
│   └── e2e/
└── docs/
    ├── ARCHITECTURE.md
    ├── BUILD_STATUS.md
    ├── DEPENDENCIES.md
    ├── DEPLOYMENT.md
    ├── DEVELOPMENT.md
    ├── HANDOVER.md
    ├── IMPLEMENTATION_LOG.md
    ├── ONBOARDING_A_RESTAURANT.md
    ├── OPERATIONS_RUNBOOK.md
    ├── SECURITY.md
    ├── TESTING.md
    └── TROUBLESHOOTING.md
```

### 3.1 Deployment topology

Use two independent deployable applications:

#### MEJDAR website

- Modern TypeScript web application.
- Use the current stable Next.js release available from the official Next.js source at implementation time.
- Deployable to Vercel or any Node-compatible host.
- Does not contain TastyIgniter.
- Primary purpose: explain the service, capture leads and link to the demo.

#### Restaurant platform

- TastyIgniter v4 standalone application.
- PHP 8.3 or newer.
- MySQL 8 or a verified compatible database.
- Nginx with document root set to `public/`.
- Composer 2.
- Redis for production cache, queue and sessions when compatible.
- Separate scheduler and queue processes.
- One logically isolated deployment and database per paying restaurant during the MVP.
- No multi-vendor marketplace in the MVP.

### 3.2 Local development topology

Use Docker Compose for local development with:

- Nginx;
- PHP-FPM;
- MySQL 8;
- Redis;
- queue worker;
- scheduler;
- Mailpit or another local mail catcher;
- Node tooling where required;
- optional object-storage emulator only if needed.

Expose only necessary local ports. Add health checks. Persist database and media data in named volumes.

---

## 4. Brand system

### 4.1 Master brand

- Name: `MEJDAR`
- Descriptor: `Hospitality Systems`
- Tagline: `Own every order. Welcome every guest.`
- Positioning statement: `Independent hospitality technology, built in Malta.`
- Initial product: `MEJDAR Order`
- Reporting module: `MEJDAR Insights`
- Reservation module label: `MEJDAR Reserve`
- Future accommodation product label: `MEJDAR Stay`

### 4.2 Brand colours

Use accessible colour combinations and confirm WCAG contrast.

```text
Deep teal:       #006D6D
Harbour navy:    #102F35
Limestone:       #F3EFE6
Terracotta:      #C96546
Olive:           #6C7D47
White:           #FFFFFF
Near black:      #172126
Muted grey:      #657377
```

### 4.3 Typography

- Primary UI: Inter, with a robust system-font fallback.
- Marketing display option: Manrope or DM Sans.
- Self-host fonts where licensing and performance make sense.
- Do not ship font files without verifying redistribution rights.
- Avoid ornamental restaurant-style typography in the application UI.

### 4.4 Logo requirements

Create an original SVG logo, not copied from another brand.

The mark should:

- form a geometric `M`;
- suggest a table, doorway or welcome;
- remain recognisable at 16×16 pixels;
- work in one colour;
- have horizontal, stacked and icon-only variants;
- include light and dark variants;
- include an accessible text alternative;
- be documented in `packages/brand/BRAND_GUIDE.md`.

Do not use the TastyIgniter logo as the MEJDAR logo. Do not imply that MEJDAR is the official Maltese TastyIgniter distributor.

### 4.5 White-label model

Every restaurant deployment must support:

- restaurant logo;
- restaurant colours;
- restaurant typography;
- restaurant favicon;
- restaurant domain;
- restaurant email sender;
- restaurant legal pages;
- restaurant contact details;
- restaurant social links;
- restaurant payment account;
- optional discreet `Powered by MEJDAR` footer.

The customer-facing restaurant identity must dominate. MEJDAR appears as the technology/support provider only.

---

## 5. Initial customer and demo scenario

Create a fictional demonstration restaurant named:

**Harbour Table**

Use fictional contact details and clearly mark all data as demonstration data.

Suggested positioning:

- Mediterranean casual dining;
- delivery and collection;
- table reservations;
- English and Maltese;
- menu priced in euro;
- a realistic but fictional address labelled as a demo;
- no copied menu descriptions or food photography.

Create at least:

- 6 menu categories;
- 30 menu items;
- modifiers/extras;
- vegetarian and vegan indicators;
- common allergen fields;
- availability schedules;
- one sold-out example;
- one promotional bundle;
- 2 delivery zones;
- collection;
- cash payment;
- Stripe test-mode payment;
- 2 coupon codes;
- opening hours;
- reservation time slots;
- tables/capacity;
- 10 synthetic customers;
- 25 synthetic historical orders;
- 8 synthetic reservations.

All seeders must be idempotent or safely resettable in development.

---

## 6. Required TastyIgniter foundation

### 6.1 Installation

Install TastyIgniter using its official Composer project package and current official v4 documentation.

Expected baseline command:

```bash
composer create-project tastyigniter/tastyigniter apps/restaurant
```

Before executing it, confirm the command against current official documentation.

Configure installation non-interactively for Docker/CI when supported:

```bash
php artisan igniter:install --no-interaction
```

Do not run installation against a database containing unknown data.

### 6.2 Core extensions

Install only verified current v4-compatible versions of the following capabilities:

- Orange theme as the upstream base;
- FrontEnd;
- Local;
- Cart;
- User;
- Pay Register;
- Reservation;
- Static Pages;
- Coupons;
- Automation;
- Reports;
- API;
- Webhooks.

Optional extensions must be disabled unless needed.

For every extension:

1. verify its exact Composer package name;
2. verify current TastyIgniter compatibility;
3. verify licence;
4. install from an official source;
5. run migrations;
6. clear required caches;
7. test that the administration page loads;
8. record it in `docs/DEPENDENCIES.md`.

Do not purchase or depend on premium extensions in the MVP.

### 6.3 TastyIgniter services

Configure:

- scheduler to run every minute;
- production queue worker;
- failed-job handling;
- application mail;
- cache;
- sessions;
- logging;
- filesystem/media;
- secure production URL;
- trusted proxy settings when behind a reverse proxy;
- application timezone `Europe/Malta`;
- currency `EUR`;
- locale defaults;
- English and Maltese translation structure.

---

## 7. MEJDAR theme

Create a dedicated TastyIgniter theme package:

```text
packages/mejdar/ti-theme-mejdar-order
```

or the framework-required equivalent.

The Composer package must:

- use a unique MEJDAR vendor namespace;
- use type `tastyigniter-package`;
- depend on the official Orange theme;
- declare appropriate TastyIgniter theme metadata;
- publish only its own assets;
- preserve upstream licence notices;
- never copy unnecessary upstream files.

### 7.1 Theme strategy

Use inheritance/overrides rather than copying the entire Orange theme.

Override only files required for:

- layout;
- navigation;
- homepage;
- menu cards;
- item modal/detail;
- cart;
- checkout;
- location selector;
- reservation pages;
- customer account;
- order confirmation;
- legal pages;
- footer;
- error states;
- empty states.

### 7.2 Theme settings

Expose safe administrator settings for:

- logo;
- favicon;
- primary, secondary and accent colours;
- heading and body font stacks;
- hero title and subtitle;
- hero image;
- ordering CTA;
- reservation CTA;
- restaurant story;
- social links;
- footer attribution;
- support link;
- analytics toggle;
- cookie-consent settings;
- contact details;
- delivery/collection labels.

Validate all theme fields.

### 7.3 Storefront UX

The storefront must be mobile-first.

Implement:

- sticky order CTA on mobile;
- clear open/closed status;
- next available ordering time;
- delivery/collection selector;
- address/location eligibility before checkout where supported;
- searchable menu;
- category navigation;
- clear item prices;
- modifiers with validation;
- quantity controls;
- allergen and dietary labels;
- basket persistence;
- accessible cart drawer/page;
- guest checkout;
- optional account creation;
- clear fees and totals;
- order notes;
- payment choice;
- order confirmation and status information;
- reservation booking;
- cancellation/contact instructions;
- graceful empty, closed, sold-out and error states.

### 7.4 Accessibility

Target WCAG 2.2 AA where applicable.

Verify:

- keyboard-only navigation;
- visible focus states;
- proper landmarks;
- semantic headings;
- labelled form controls;
- error summaries;
- colour contrast;
- reduced-motion support;
- alt text;
- touch target sizes;
- no essential information conveyed only through colour;
- accessible modals and menus;
- checkout errors announced to assistive technology.

### 7.5 Performance

Target on a production-like build:

- no avoidable render-blocking assets;
- optimised responsive images;
- lazy loading below the fold;
- minimal custom JavaScript;
- cached static assets;
- compressed responses;
- no oversized third-party scripts;
- Lighthouse performance target of at least 85 on representative mobile pages, without compromising functionality or accessibility.

Document measured results rather than inventing them.

---

## 8. MEJDAR Core extension

Create a custom extension named using the official TastyIgniter package conventions, for example:

```text
mejdar/ti-ext-core
```

The exact directory and namespace must follow current v4 extension documentation.

### 8.1 Responsibilities

The extension should provide:

- MEJDAR support/settings page;
- installation identifier;
- deployment/environment display without exposing secrets;
- version display;
- safe health summary;
- restaurant onboarding checklist;
- role/permission additions;
- links to documentation;
- support contact configuration;
- optional `Powered by MEJDAR` attribution control;
- safe brand defaults;
- health endpoint;
- provisioning and demo-data Artisan commands;
- data export/delete helpers where appropriate;
- audit log for MEJDAR-specific administrative changes.

### 8.2 Health endpoint

Provide a non-sensitive endpoint such as:

```text
/health
```

It may report:

- application status;
- database connectivity;
- cache connectivity;
- queue configuration presence;
- scheduler heartbeat recency;
- application version;
- MEJDAR package version.

It must not expose:

- secrets;
- database credentials;
- internal paths;
- stack traces;
- customer details;
- detailed environment variables.

Return an appropriate non-200 status when a critical dependency is unavailable.

### 8.3 Artisan commands

Create tested commands such as:

```bash
php artisan mejdar:doctor
php artisan mejdar:seed-demo
php artisan mejdar:provision
php artisan mejdar:backup-check
```

`mejdar:provision` must:

- refuse production use unless explicitly enabled;
- validate required environment variables;
- configure safe defaults;
- seed the fictional demo only when requested;
- be idempotent where practical;
- print a clear summary;
- never print secret values.

### 8.4 Roles and permissions

Define least-privilege roles:

- Owner;
- Manager;
- Order Staff;
- Reservation Staff;
- Analyst;
- Support Technician.

Ensure each role can access only required functions. Add tests around high-risk permissions.

---

## 9. MEJDAR Insights

Use the official TastyIgniter Reports extension as the reporting foundation. Create a thin MEJDAR layer only where it adds clear value.

### 9.1 Dashboard KPIs

Expose date-filtered metrics:

- gross online sales;
- net order value where reliably calculable;
- order count;
- average order value;
- delivery versus collection;
- cash versus online payment;
- completed, rejected and cancelled orders;
- top menu items;
- top categories;
- sales by day;
- sales by hour;
- new versus returning customers where data permits;
- coupon usage;
- reservations;
- reservation cancellations/no-shows where status data permits;
- delivery-zone performance.

Do not display misleading metrics. Clearly label gross, net, taxes, discounts and fees.

### 9.2 Filters and export

Support:

- date range;
- location;
- order type;
- status;
- payment method;
- category/menu item where available.

Provide CSV export with:

- UTF-8;
- predictable headers;
- authorisation checks;
- protection against spreadsheet formula injection;
- no excessive personal data.

### 9.3 Privacy

- Prefer aggregated operational reporting.
- Do not expose unnecessary personal data.
- Add configurable retention guidance.
- Make customer export/deletion workflows possible where underlying data permits.
- Document what data Stripe, SMTP, analytics and hosting providers process.

---

## 10. Ordering, reservations and payments

### 10.1 Order types

Support:

- delivery;
- collection.

Dine-in POS, waiter ordering and driver-fleet management are outside the MVP unless already available without risky custom work.

### 10.2 Delivery configuration

Support:

- at least two zones;
- zone-specific fee;
- minimum order;
- estimated time;
- closed/unavailable state;
- postcode/address validation where supported;
- clear fallback if map/geocoding services are not configured.

Do not hard-code Malta-only address assumptions into reusable platform logic.

### 10.3 Payments

Configure:

- cash;
- Stripe test mode.

Requirements:

- each restaurant uses its own Stripe account in production;
- no shared MEJDAR collection of restaurant funds in the MVP;
- never commit Stripe keys;
- validate webhook signatures where used;
- make webhook handlers idempotent;
- protect against duplicate order/payment processing;
- store only payment identifiers and safe metadata;
- never store card details.

Add documented placeholders for production webhook URL and secret.

### 10.4 Reservations

Support:

- party size;
- date and time;
- capacity/table assignment;
- lead time;
- booking interval;
- special requests;
- confirmation email;
- manager status workflow;
- privacy notice;
- clear contact/cancellation route.

Prevent obviously invalid or past reservations.

---

## 11. Email, notifications and automation

Use generic SMTP environment variables so the platform can work with Zoho, ZeptoMail, Mailgun, Postmark or another compliant provider.

Local development must use Mailpit.

Create branded templates for:

- customer order received;
- order accepted;
- order delayed;
- order rejected/cancelled;
- order ready;
- order completed;
- reservation received;
- reservation confirmed;
- reservation declined/cancelled;
- password reset;
- contact/lead acknowledgement where used.

Requirements:

- plain-text fallbacks;
- restaurant identity;
- accessible markup;
- no secrets;
- no sensitive details in email subject lines;
- test coverage for rendered content;
- queue delivery where supported;
- retry/failure visibility.

Use the Automation extension for supported event-driven flows instead of duplicating core behaviour.

---

## 12. Public MEJDAR website

Create `apps/website` as a polished, responsive marketing website.

### 12.1 Pages

Build:

- Home;
- Restaurant Ordering;
- Reservations;
- Analytics;
- Pricing;
- Demo;
- Hospitality/Future Products;
- About;
- Contact;
- Privacy;
- Cookies;
- Terms;
- Data Processing information;
- 404 and error pages.

### 12.2 Core message

Primary headline:

```text
Your restaurant. Your customers. Your ordering channel.
```

Supporting statement:

```text
MEJDAR gives restaurants their own branded ordering, reservation and analytics system with local support and predictable monthly pricing.
```

Primary CTA:

```text
Book a demo
```

Secondary CTA:

```text
View the live demo
```

### 12.3 Packages

Use editable indicative packages, clearly labelled and configurable:

#### Starter

- direct ordering;
- collection;
- menu setup;
- cash and online payment configuration;
- branded website;
- basic reporting.

#### Growth

- delivery zones;
- reservations;
- coupons;
- bilingual content;
- enhanced reporting;
- priority support.

Do not hard-code prices as legally binding offers. Put pricing in a structured content/config file.

Suggested initial figures:

- Starter setup: €650–€850;
- Growth setup: €1,000–€1,500;
- monthly management: €69–€149.

Add a statement that payment-provider and optional third-party fees are separate.

### 12.4 Lead capture

Create a secure contact/demo form with:

- name;
- business;
- work email;
- phone optional;
- location count;
- current ordering method;
- message;
- consent checkbox.

Requirements:

- server-side validation;
- honeypot;
- rate limiting;
- CAPTCHA adapter optional through environment configuration;
- SMTP notification;
- acknowledgement email;
- no secret in client bundle;
- privacy notice;
- success/error states;
- accessible errors;
- test coverage.

Do not persist leads unless a database/storage adapter is deliberately configured. If persistence is added, document retention and deletion.

### 12.5 Analytics and consent

Provide optional analytics integration through environment flags.

- No non-essential analytics before consent where consent is required.
- Support PostHog or a privacy-conscious alternative through a small adapter.
- Disable analytics by default in development.
- Do not send form content or personal data to analytics.
- Document all events.
- Suggested anonymous events:
  - page viewed;
  - pricing viewed;
  - demo CTA clicked;
  - lead form started;
  - lead form submitted successfully.

---

## 13. SEO and structured data

For the MEJDAR website:

- unique titles and descriptions;
- canonical URLs;
- Open Graph metadata;
- sitemap;
- robots configuration;
- organisation structured data;
- service/product structured data where appropriate;
- no fake reviews or ratings.

For restaurant deployments:

- Restaurant/LocalBusiness structured data where accurate;
- opening hours;
- location;
- menu URL;
- reservation URL;
- social profiles;
- canonical URLs;
- descriptive item/category metadata;
- XML sitemap if supported;
- robots configuration;
- no indexation of admin, cart, checkout, account or test pages.

Validate structured data before handover.

---

## 14. Malta, GDPR and legal-readiness requirements

This is a technical implementation, not legal advice.

Build the controls needed for counsel/accountant review:

- configurable company and restaurant legal details;
- privacy page;
- cookie page;
- terms page;
- refund/cancellation content;
- delivery terms;
- allergen disclaimer;
- data-controller and processor fields;
- consent records where required;
- data export;
- deletion/anonymisation workflow;
- configurable retention guidance;
- audit logs for sensitive administrative activity;
- secure backups;
- incident-response runbook;
- subprocessor list template;
- DPA template placeholder.

Do not claim Maltese VAT, consumer, food, allergen or GDPR compliance without professional validation.

Prices shown to consumers should be configurable for VAT-inclusive presentation. Document that a Maltese accountant must validate taxes and invoice requirements.

---

## 15. Infrastructure and deployment

### 15.1 Docker

Create production-capable Dockerfiles and Compose definitions.

Restaurant services:

- `nginx`;
- `php-fpm`;
- `app-init` or safe migration job;
- `queue`;
- `scheduler`;
- `mysql`;
- `redis`.

Local-only service:

- `mailpit`.

Requirements:

- non-root runtime where practical;
- health checks;
- pinned base-image versions;
- minimal images;
- no secrets baked into layers;
- writable directories limited to what is required;
- correct ownership;
- application document root at `public/`;
- production `APP_DEBUG=false`;
- restart policy;
- log rotation guidance;
- backup volumes identified.

### 15.2 Scheduler

Configure the TastyIgniter/Laravel scheduler to execute every minute.

Use a dedicated scheduler container or cron process. Add a scheduler heartbeat checked by `mejdar:doctor`.

### 15.3 Queue

Use a dedicated queue worker.

- define retry and timeout values;
- handle graceful shutdown;
- expose failed jobs;
- document restart procedures;
- ensure email/automation jobs are processed;
- add a health check or operational check.

### 15.4 Backups

Provide scripts and documentation for:

- database backup;
- media/storage backup;
- encrypted off-server copy;
- retention;
- restoration test;
- pre-upgrade snapshot.

The backup script must:

- fail loudly;
- avoid exposing passwords in process output where possible;
- timestamp files;
- checksum outputs;
- support dry-run;
- never delete all backups because of a variable error.

Add a documented monthly restore test.

### 15.5 Production server guide

Write a guide for a clean Ubuntu LTS-class VPS or equivalent.

Include:

- DNS prerequisites;
- firewall;
- SSH-key-only recommendation;
- Docker installation through trusted sources;
- environment/secrets;
- TLS;
- deployment;
- migrations;
- queue/scheduler;
- backups;
- monitoring;
- rollback;
- upgrade procedure.

Do not automatically alter a real VPS.

### 15.6 MEJDAR website deployment

Make the marketing website deployable to Vercel.

Include:

- build command;
- required environment variables;
- preview deployment guidance;
- production domain setup checklist;
- SMTP/API route compatibility notes;
- analytics consent configuration.

Do not deploy or connect a domain without human approval.

---

## 16. Observability

Implement:

- structured application logs;
- request correlation ID where practical;
- error tracking adapter disabled until configured;
- `/health` endpoint;
- uptime-monitoring instructions;
- queue-failure visibility;
- scheduler heartbeat;
- backup status check;
- disk-space alert guidance;
- database health check;
- log redaction for secrets and personal data.

Do not log:

- passwords;
- full payment data;
- session tokens;
- API keys;
- reset tokens;
- unnecessary customer addresses or messages.

---

## 17. Testing strategy

### 17.1 Determine real commands

Inspect installed `composer.json`, `package.json` and project configuration before choosing commands. Document the actual commands in `docs/TESTING.md`.

Likely categories:

- PHP unit tests;
- TastyIgniter extension tests;
- static analysis if supported;
- code style;
- JavaScript/TypeScript linting;
- component tests;
- Playwright end-to-end tests;
- dependency audits;
- production builds.

### 17.2 Required automated tests

#### Restaurant platform

Test:

- application boots;
- admin login;
- role permissions;
- homepage;
- menu/category display;
- item modifiers;
- add/remove/update cart;
- delivery/collection;
- invalid delivery zone;
- guest checkout;
- cash order;
- Stripe test path with mocked/sandbox response;
- duplicate payment callback handling;
- coupon valid/invalid/expired;
- order confirmation;
- order status notifications;
- reservation valid/invalid;
- closed restaurant;
- sold-out item;
- health endpoint;
- demo seeder idempotency;
- export CSV injection protection;
- unauthorised reporting access;
- CSRF;
- public-form rate limits.

#### MEJDAR website

Test:

- all routes load;
- navigation;
- responsive menu;
- pricing content;
- CTA links;
- demo link;
- form validation;
- honeypot;
- rate limiting;
- SMTP adapter mock;
- consent-controlled analytics;
- metadata;
- sitemap;
- 404;
- accessibility smoke tests.

#### End-to-end

Use Playwright or an equivalent maintained tool.

Include at least:

1. Customer places a collection order with cash.
2. Customer places a delivery order using Stripe test mode/mocked adapter.
3. Customer makes a reservation.
4. Manager logs in and updates an order.
5. Analyst can see reports but cannot manage sensitive settings.
6. Visitor submits the MEJDAR demo form.

### 17.3 Manual QA matrix

Document manual tests across:

- current Chrome;
- current Firefox;
- current Safari/WebKit;
- common mobile viewport;
- keyboard;
- reduced motion;
- slow network;
- invalid payment;
- SMTP failure;
- queue stopped;
- restaurant closed;
- item sold out.

### 17.4 Quality gates

Before declaring complete:

- all automated tests pass;
- production builds pass;
- dependency audits reviewed;
- no committed secrets;
- no debug mode;
- no broken links;
- no placeholder lorem ipsum;
- no fake testimonials;
- no console errors on core flows;
- accessibility critical issues resolved;
- backup and restore documented;
- installation from a clean checkout proven.

---

## 18. CI workflow

Create GitHub Actions or equivalent workflows for pull requests and main-branch commits.

Jobs should include:

- secret scan;
- Composer validation;
- Composer install with locked dependencies;
- PHP tests;
- PHP code style/static analysis where configured;
- npm clean install;
- lint;
- TypeScript checks;
- unit/component tests;
- production builds;
- end-to-end tests using service containers;
- dependency audit reports.

Deployment workflows must be manual or environment-protected. Do not automatically deploy unreviewed code to production.

Cache dependencies safely. Do not cache secrets or generated `.env` files.

---

## 19. Documentation deliverables

### 19.1 Root README

Include:

- product description;
- architecture;
- local prerequisites;
- fast start;
- test commands;
- repository map;
- screenshots;
- links to detailed docs;
- licence summary.

### 19.2 Development guide

Include exact commands for:

- clone;
- environment setup;
- Docker start;
- installation;
- demo seeding;
- frontend development;
- tests;
- logs;
- reset;
- shutdown.

### 19.3 Restaurant onboarding guide

Create a repeatable checklist covering:

- contract/approval;
- restaurant legal/contact details;
- domain;
- branding;
- menu;
- modifiers;
- allergens;
- opening hours;
- delivery zones;
- collection;
- tables/reservations;
- Stripe;
- SMTP;
- policies;
- analytics;
- training;
- go-live checks.

### 19.4 Operations runbook

Cover:

- order-notification failure;
- queue stopped;
- email failure;
- payment webhook failure;
- database outage;
- disk full;
- certificate renewal;
- backup failure;
- restore;
- rollback;
- extension upgrade;
- TastyIgniter upgrade;
- compromised credential;
- customer data request.

### 19.5 Handover

`docs/HANDOVER.md` must state:

- what is complete;
- what was tested;
- exact test results;
- local URLs;
- demo credentials sourced from local environment only;
- required production secrets;
- unresolved risks;
- manual legal/accounting checks;
- deployment steps;
- next recommended backlog.

Never put a real password in the file.

---

## 20. Phased execution plan

### Phase 0 — Preflight and research

1. Inspect repository.
2. Confirm operating system and available tools.
3. Read `AGENTS.md`.
4. Read current official TastyIgniter v4 installation, theme, extension, API, scheduler and testing documentation.
5. Confirm current OpenCode project instructions.
6. Create `docs/BUILD_STATUS.md`.
7. Create `docs/DEPENDENCIES.md`.
8. Record architectural decisions.
9. Do not install anything until package provenance is verified.

**Exit criteria:** documented plan, verified package list, no unresolved architecture blocker.

### Phase 1 — Monorepo and local infrastructure

1. Create repository structure.
2. Add editor, Git and environment templates.
3. Add Docker Compose.
4. Add Nginx/PHP configuration.
5. Add MySQL, Redis, Mailpit, queue and scheduler services.
6. Add health checks.
7. Add Makefile or equivalent task runner.
8. Prove containers start.

**Exit criteria:** clean local infrastructure starts and stops reliably.

### Phase 2 — TastyIgniter foundation

1. Install current TastyIgniter v4.
2. Configure environment.
3. Complete non-interactive setup.
4. Install verified free extensions.
5. Run migrations.
6. activate required theme/extensions.
7. configure queue/scheduler/mail.
8. prove storefront and admin boot.
9. commit lock files.

**Exit criteria:** unbranded functional ordering platform running locally.

### Phase 3 — MEJDAR packages

1. Build MEJDAR theme.
2. Build MEJDAR Core extension.
3. Add brand package/assets.
4. add theme settings.
5. add health endpoint.
6. add commands.
7. add roles/permissions.
8. write tests.

**Exit criteria:** upgrade-safe MEJDAR branding and core management features.

### Phase 4 — Demo restaurant

1. Build demo seeders.
2. configure restaurant.
3. configure menu, modifiers and allergens.
4. configure delivery/collection.
5. configure reservations.
6. configure cash and Stripe test mode.
7. configure coupons.
8. configure mail templates.
9. verify customer workflows.

**Exit criteria:** polished Harbour Table demo can complete core workflows.

### Phase 5 — MEJDAR Insights

1. Install/configure Reports.
2. add MEJDAR dashboard presentation.
3. implement filters.
4. implement safe export.
5. enforce permissions.
6. add tests.

**Exit criteria:** useful, accurate and authorised operational dashboard.

### Phase 6 — MEJDAR public website

1. initialise current stable Next.js TypeScript app.
2. implement brand.
3. build pages.
4. add pricing content.
5. add demo and contact flows.
6. add SMTP adapter.
7. add consent-aware analytics.
8. add SEO.
9. add tests.

**Exit criteria:** production-buildable marketing and lead-generation site.

### Phase 7 — Compliance and hardening

1. legal-page templates.
2. privacy controls.
3. security headers.
4. rate limits.
5. dependency audits.
6. log redaction.
7. accessibility remediation.
8. performance optimisation.
9. backup/restore scripts.
10. incident runbook.

**Exit criteria:** no known critical security/accessibility issue and compliance controls documented.

### Phase 8 — Complete automated testing

1. add missing unit/integration tests.
2. build Playwright suite.
3. run all browsers where practical.
4. fix failures.
5. prove clean database install.
6. prove seed/reseed.
7. prove production builds.

**Exit criteria:** complete quality gates pass.

### Phase 9 — CI and deployment documentation

1. add CI.
2. validate CI locally where possible.
3. production Docker/Compose.
4. VPS guide.
5. Vercel guide.
6. rollback.
7. monitoring.
8. backup.
9. onboarding guide.

**Exit criteria:** another competent engineer can deploy from documentation.

### Phase 10 — Final audit and handover

1. inspect Git diff.
2. search for secrets.
3. search for placeholders/TODOs.
4. run every test.
5. run every build.
6. inspect logs.
7. document actual results.
8. create screenshots.
9. finish handover.
10. create final milestone commit.

**Exit criteria:** all Definition of Done items satisfied or explicitly documented as external/manual blockers.

---

## 21. Definition of Done

The project is complete only when all of the following are true:

### Repository

- [ ] Clean monorepo structure.
- [ ] Reproducible dependency locks.
- [ ] No secrets committed.
- [ ] No direct core/vendor modifications.
- [ ] Licence notices complete.

### Restaurant platform

- [ ] TastyIgniter v4 boots.
- [ ] Admin works.
- [ ] MEJDAR theme active.
- [ ] Mobile menu works.
- [ ] Delivery works.
- [ ] Collection works.
- [ ] Cash checkout works.
- [ ] Stripe test path works.
- [ ] Customer emails work through local mail catcher.
- [ ] Reservations work.
- [ ] Coupons work.
- [ ] Roles and permissions work.
- [ ] Reports work.
- [ ] CSV export is safe.
- [ ] Demo data works.
- [ ] Health checks work.
- [ ] Queue works.
- [ ] Scheduler works.

### MEJDAR website

- [ ] Complete responsive pages.
- [ ] Correct brand.
- [ ] Lead form works.
- [ ] Spam controls work.
- [ ] Email adapter works.
- [ ] Analytics honours consent.
- [ ] SEO metadata works.
- [ ] Sitemap works.
- [ ] Production build works.

### Quality

- [ ] Automated tests pass.
- [ ] E2E tests pass.
- [ ] No critical accessibility failures.
- [ ] No critical dependency vulnerabilities left unexplained.
- [ ] Core pages have no console errors.
- [ ] Clean install tested.
- [ ] Backup/restore procedure documented.
- [ ] Deployment and rollback documented.
- [ ] Handover complete.

---

## 22. Out of scope for this MVP

Do not expand the project into these areas before the required MVP is complete:

- multi-vendor restaurant marketplace;
- shared MEJDAR payment collection;
- mobile native applications;
- driver fleet management;
- full POS;
- kitchen display system;
- waiter ordering;
- payroll;
- full accounting;
- inventory/recipe ERP;
- hotel property-management system;
- AI demand forecasting;
- loyalty points;
- paid premium TastyIgniter extensions;
- production DNS or payment activation.

After the MVP passes all gates, record these as a prioritised backlog rather than implementing them automatically.

---

## 23. Required final response from OpenCode

When complete, report:

1. concise product summary;
2. architecture implemented;
3. files and packages added;
4. local start commands;
5. local URLs;
6. tests run and exact results;
7. production build results;
8. security/audit results;
9. screenshots created;
10. manual external steps remaining;
11. deployment readiness;
12. final Git status and commit list.

Do not say “done” while tests are failing or required work is merely planned.
