# MEJDAR — Free Hosting Strategy

**Last updated:** 2026-07-30  
**Status:** Preparation targets — deployment will happen after accounts are created

---

## Overview

The MEJDAR MVP demonstration runs on free-tier infrastructure:

| Component | Target | Plan |
|---|---|---|
| MEJDAR website | Vercel | Hobby (free) |
| Restaurant demo | Oracle Cloud | Always Free Compute |
| Local development | Docker Compose | Local machine |
| CI/CD | GitHub Actions | Free for public repos |

---

## Why Free Tier for MVP

- **Cost:** Zero hosting costs during development and demonstration
- **Speed:** Fast provisioning for a single-VM demonstration
- **Trade-offs:** Acceptable for MVP — limited resources, no SLA, no paid support
- **Upgrade path:** Documented for when paying restaurant deployments require reliable paid infrastructure

---

## Architecture Decision: Single VM

The TastyIgniter restaurant demo runs all services on one Oracle Cloud Always Free VM:

```
┌─────────────────────────────────────────┐
│           Oracle Free VM                │
│                                         │
│  ┌─────────┐  ┌─────────┐              │
│  │  Nginx  │  │  MySQL  │              │
│  │  :80    │  │  :3306  │              │
│  │  :443   │  │         │              │
│  └────┬────┘  └────┬────┘              │
│       │            │                    │
│  ┌────┴────┐  ┌────┴────┐              │
│  │PHP-FPM  │  │  Redis  │              │
│  │         │  │  :6379  │              │
│  └────┬────┘  └─────────┘              │
│       │                                │
│  ┌────┴────┐  ┌─────────┐              │
│  │  Queue  │  │Scheduler│              │
│  └─────────┘  └─────────┘              │
│                                         │
└─────────────────────────────────────────┘
```

**Memory budget (Oracle Free VM: ~1GB RAM):**

| Service | Memory Limit |
|---|---|
| Nginx | 128 MB |
| PHP-FPM | 256 MB |
| MySQL | 256 MB |
| Redis | 80 MB |
| Queue worker | 192 MB |
| Scheduler | 128 MB |
| **Total** | **~1 GB** |

**Redis decision:** Run Redis only if the VM has sufficient free memory. If not, use database-backed cache, session and queue drivers instead. The `compose.production-free.yaml` includes Redis but it can be disabled by setting `CACHE_DRIVER=database`, `SESSION_DRIVER=database`, `QUEUE_CONNECTION=database`.

---

## MEJDAR Website (Vercel Free)

### Constraints

- Vercel Hobby plan: 100GB bandwidth/month, serverless functions limited to 10s execution
- No persistent filesystem
- No cron jobs on free tier
- No background workers

### Adaptation

- Static/SSG pages where possible (marketing content rarely changes)
- Serverless API routes for lead form (no background processing)
- Lead form uses external SMTP API (no local mail queue)
- No database — form data sent via email or external service
- Analytics loaded only after consent

### Deployment

- Git push to `main` triggers automatic deployment
- Preview deployments for pull requests
- Environment variables configured in Vercel dashboard

---

## Restaurant Demo (Oracle Free)

### Constraints

- Always Free VM: ARM Ampere A1, 4 OCPUs, 24GB RAM (or AMD, 1 OCPU, 1GB RAM)
- 200GB boot volume
- Always free — no time limit
- Public IP required for HTTPS

### Adaptation

- Docker Compose with conservative memory limits
- Single PHP-FPM instance
- Single queue worker
- Scheduler runs every 60 seconds via loop
- MySQL with InnoDB buffer pool limited to 64MB
- Redis with 64MB max memory (or database fallback)
- No paid managed services

### HTTPS

Two options documented:

1. **Caddy** (recommended) — automatic HTTPS with Let's Encrypt, reverse proxy to Nginx
2. **Nginx + Certbot** — manual certificate management

Both documented in `docs/DEPLOY_ORACLE_FREE.md`.

### Backups

Automated scripts for:
- Database dump (daily)
- Media backup (daily)
- Encrypted off-server copy (manual, documented)

---

## Limitations of Free Hosting

| Limitation | Impact | Mitigation |
|---|---|---|
| No SLA | May be unavailable | Document downtime expectations |
| Limited RAM | May cause OOM kills | Conservative memory limits |
| No paid support | Slow issue resolution | Community forums |
| No custom domains (Vercel) | `.vercel.app` URL | Domain upgrade path documented |
| No Redis guarantee | May need DB fallback | Fallback drivers configured |
| Single VM | Single point of failure | Backup + restore documented |

---

## Upgrade Path

When paying restaurant deployments are required:

1. **VM upgrade:** Move to paid Oracle Cloud, Hetzner, or DigitalOcean
2. **Managed database:** Use managed MySQL for reliability
3. **Managed Redis:** Use Upstash, Redis Cloud, or similar
4. **CDN:** Add Cloudflare or similar for static assets
5. **Monitoring:** Add uptime monitoring (UptimeRobot, Better Stack)
6. **Backups:** Automated off-server backups with retention

This strategy is documented for reference. Do not implement paid infrastructure until explicitly requested.

---

## Deployment Checklist

- [ ] Oracle Cloud account created
- [ ] VM provisioned with SSH key access
- [ ] Docker installed on VM
- [ ] Domain pointed to VM IP (or use IP directly)
- [ ] `.env` file created on VM with production values
- [ ] `compose.production-free.yaml` deployed
- [ ] Application installed and seeded
- [ ] HTTPS configured (Caddy or Certbot)
- [ ] Backup cron configured
- [ ] Vercel account created
- [ ] Next.js website deployed to Vercel
- [ ] Lead form SMTP configured
- [ ] All services verified working
