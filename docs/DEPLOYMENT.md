# MEJDAR — Deployment Guide

Complete guide for deploying MEJDAR across different environments.

---

## Table of Contents

1. [Docker Compose Production](#1-docker-compose-production)
2. [VPS Deployment (Ubuntu 22.04+)](#2-vps-deployment-ubuntu-2204)
3. [Vercel Deployment (Next.js Website)](#3-vercel-deployment-nextjs-website)
4. [Environment Variables Reference](#4-environment-variables-reference)
5. [SSL/TLS Setup with Certbot](#5-ssltls-setup-with-certbot)
6. [Database Backup and Restore](#6-database-backup-and-restore)
7. [Rollback Procedures](#7-rollback-procedures)
8. [Monitoring Basics](#8-monitoring-basics)

---

## 1. Docker Compose Production

### Quick Start

```bash
# Clone the repository
git clone <REPO_URL> mejdar
cd mejdar

# Create production environment
cp .env.example .env
nano .env  # Configure production values (see section 4)

# Build and start all services
docker compose -f docker-compose.production.yml up -d --build

# Verify all services are healthy
docker compose -f docker-compose.production.yml ps
```

### Production Compose Variants

| File | Use Case | Resources |
|------|----------|-----------|
| `docker-compose.production.yml` | Full VPS deployment | 2GB+ RAM |
| `compose.production-free.yaml` | Oracle Free Tier / small VM | 1GB RAM |

### Build the PHP Image

```bash
# Build the custom PHP image
docker compose -f docker-compose.production.yml build app

# Tag for registry (optional)
docker tag mejdar/php:latest registry.example.com/mejdar/php:latest
docker push registry.example.com/mejdar/php:latest
```

### Service Commands

```bash
# View logs
docker compose -f docker-compose.production.yml logs -f app
docker compose -f docker-compose.production.yml logs -f nginx

# Restart a single service
docker compose -f docker-compose.production.yml restart queue

# Scale queue workers (VPS only)
docker compose -f docker-compose.production.yml up -d --scale queue=2

# Stop all services
docker compose -f docker-compose.production.yml down

# Stop and remove volumes (DESTROYS DATA)
docker compose -f docker-compose.production.yml down -v
```

---

## 2. VPS Deployment (Ubuntu 22.04+)

### Step 1: Server Setup

```bash
# SSH into your server
ssh root@YOUR_SERVER_IP

# Update system
apt update && apt upgrade -y

# Create a deploy user
adduser mejdar
usermod -aG sudo mejdar
usermod -aG docker mejdar

# Switch to deploy user
su - mejdar

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose plugin
sudo apt install docker-compose-plugin -y

# Verify
docker --version
docker compose version
```

### Step 2: Deploy Application

```bash
# Clone the repository
cd /home/mejdar
git clone <REPO_URL> mejdar
cd mejdar

# Set up environment
cp .env.example .env
nano .env
```

### Step 3: Configure Nginx

```bash
# Create nginx config directory
mkdir -p nginx/conf.d nginx/ssl

# Create site configuration
cat > nginx/conf.d/default.conf << 'NGINX'
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/html/public;
    index index.php index.html;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass app:9000;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.ht {
        deny all;
    }

    # Static assets caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Health check
    location /health {
        access_log off;
        return 200 '{"status":"ok"}';
        add_header Content-Type application/json;
    }
}
NGINX
```

### Step 4: Build and Start

```bash
# Build images
docker compose -f docker-compose.production.yml build

# Start all services
docker compose -f docker-compose.production.yml up -d

# Run database migrations
docker compose -f docker-compose.production.yml exec app php artisan migrate --force

# Cache configuration
docker compose -f docker-compose.production.yml exec app php artisan config:cache
docker compose -f docker-compose.production.yml exec app php artisan route:cache
docker compose -f docker-compose.production.yml exec app php artisan view:cache
```

### Step 5: Set Up Backups

```bash
# Make backup script executable
chmod +x infra/scripts/backup.sh

# Test it
./infra/scripts/backup.sh --dry-run

# Add to crontab (daily at 2 AM)
crontab -e
# Add this line:
0 2 * * * /home/mejdar/mejdar/infra/scripts/backup.sh >> /var/log/mejdar-backup.log 2>&1
```

### Step 6: Set Up Firewall

```bash
# Allow SSH, HTTP, HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

---

## 3. Vercel Deployment (Next.js Website)

The `apps/website` Next.js app can be deployed to Vercel independently.

### Option A: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to website directory
cd apps/website

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option B: Git Integration

1. Push code to GitHub/GitLab
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository
4. Configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** `apps/website`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
5. Add environment variables:
   - `NEXT_PUBLIC_SITE_URL` — your production URL
   - `NEXT_PUBLIC_ANALYTICS_ENABLED` — `true` or `false`
   - `SMTP_API_URL` — email service endpoint
   - `SMTP_API_KEY` — email service key
6. Deploy

### Environment Variables (Vercel)

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Public site URL | `https://mejdar.com` |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | Enable analytics | `true` |
| `SMTP_API_URL` | Transactional email API | `https://api.resend.com` |
| `SMTP_API_KEY` | API key for email | `re_...` |

---

## 4. Environment Variables Reference

### Application

| Variable | Description | Default | Production |
|----------|-------------|---------|------------|
| `APP_NAME` | Application name | `MEJDAR` | `MEJDAR` |
| `APP_ENV` | Environment | `local` | `production` |
| `APP_KEY` | Encryption key | — | **Required** |
| `APP_DEBUG` | Debug mode | `true` | `false` |
| `APP_URL` | Application URL | `http://localhost:8080` | `https://your-domain.com` |
| `APP_TIMEZONE` | Default timezone | `Europe/Malta` | `Europe/Malta` |

### Database

| Variable | Description | Default | Production |
|----------|-------------|---------|------------|
| `DB_HOST` | Database host | `mysql` | `mysql` |
| `DB_PORT` | Database port | `3306` | `3306` |
| `DB_DATABASE` | Database name | `mejdar` | `mejdar` |
| `DB_USERNAME` | Database user | `mejdar` | **Required** |
| `DB_PASSWORD` | Database password | `secret` | **Required** |
| `DB_ROOT_PASSWORD` | MySQL root password | `root_secret` | **Required** |

### Cache & Queue

| Variable | Description | Default | Production |
|----------|-------------|---------|------------|
| `CACHE_DRIVER` | Cache backend | `redis` | `redis` |
| `SESSION_DRIVER` | Session backend | `redis` | `redis` |
| `QUEUE_CONNECTION` | Queue driver | `redis` | `redis` |
| `REDIS_HOST` | Redis host | `redis` | `redis` |
| `REDIS_PORT` | Redis port | `6379` | `6379` |
| `REDIS_PASSWORD` | Redis password | `null` | **Required** |

### Mail

| Variable | Description | Default | Production |
|----------|-------------|---------|------------|
| `MAIL_MAILER` | Mail driver | `smtp` | `smtp` |
| `MAIL_HOST` | SMTP host | `mailpit` | Your SMTP provider |
| `MAIL_PORT` | SMTP port | `1025` | `587` |
| `MAIL_USERNAME` | SMTP user | `null` | **Required** |
| `MAIL_PASSWORD` | SMTP password | `null` | **Required** |
| `MAIL_ENCRYPTION` | TLS/SSL | `null` | `tls` |

### Stripe

| Variable | Description | Default | Production |
|----------|-------------|---------|------------|
| `STRIPE_KEY` | Publishable key | — | `pk_live_...` |
| `STRIPE_SECRET` | Secret key | — | `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Webhook secret | — | `whsec_...` |
| `STRIPE_ENABLED` | Enable payments | `false` | `true` |

### Website (Next.js)

| Variable | Description | Default | Production |
|----------|-------------|---------|------------|
| `NEXT_PUBLIC_SITE_URL` | Public URL | `http://localhost:3000` | `https://mejdar.com` |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | Analytics | `false` | `true` |
| `SMTP_API_URL` | Email API endpoint | — | Your provider URL |
| `SMTP_API_KEY` | Email API key | — | **Required** |

---

## 5. SSL/TLS Setup with Certbot

### Prerequisites

- A domain name pointing to your server IP
- Port 80 open (for HTTP challenge)

### Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### Obtain Certificate

```bash
# Stop nginx container temporarily
docker compose -f docker-compose.production.yml stop nginx

# Get certificate using standalone mode
sudo certbot certonly --standalone -d your-domain.com -d www.your-domain.com

# Start nginx again
docker compose -f docker-compose.production.yml start nginx
```

### Configure Nginx for SSL

Update `nginx/conf.d/default.conf`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    root /var/www/html/public;
    index index.php index.html;

    # ... rest of location blocks
}
```

### Copy Certificates

```bash
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem nginx/ssl/
sudo chown mejdar:mejdar nginx/ssl/*.pem
```

### Auto-Renewal

```bash
# Test renewal
sudo certbot renew --dry-run

# Add cron job
sudo crontab -e
# Add:
0 12 * * * /usr/bin/certbot renew --quiet --post-hook "docker compose -f /home/mejdar/mejdar/docker-compose.production.yml restart nginx"
```

---

## 6. Database Backup and Restore

### Automated Backups

The project includes `infra/scripts/backup.sh` which backs up:

1. **MySQL database** — gzipped SQL dump
2. **Application storage** — media, uploads, logs
3. **Checksums** — SHA-256 verification

### Manual Backup

```bash
# Full backup
./infra/scripts/backup.sh

# Dry run (see what would happen)
./infra/scripts/backup.sh --dry-run
```

### Manual Restore

```bash
# Stop services
docker compose -f docker-compose.production.yml down

# Restore database
zcat /var/backups/mejdar/mejdar_db_YYYYMMDD_HHMMSS.sql.gz | \
  docker compose -f docker-compose.production.yml exec -T mysql \
  mysql -u root -p"${DB_ROOT_PASSWORD}" mejdar

# Restore storage
tar xzf /var/backups/mejdar/mejdar_storage_YYYYMMDD_HHMMSS.tar.gz \
  -C /var/www/mejdar/

# Restart services
docker compose -f docker-compose.production.yml up -d
```

### Remote Backup (Offsite)

```bash
# Add to cron for S3/Rclone sync
0 3 * * * /usr/bin/rclone sync /var/backups/mejdar remote:mejdar-backups/ --max-age 168h
```

---

## 7. Rollback Procedures

### Application Rollback (Git)

```bash
# Check current commit
git log --oneline -5

# Rollback to previous commit
git checkout <PREVIOUS_COMMIT_HASH>

# Rebuild and restart
docker compose -f docker-compose.production.yml build app
docker compose -f docker-compose.production.yml up -d

# Run any pending migrations if needed
docker compose -f docker-compose.production.yml exec app php artisan migrate --force
```

### Full Rollback (From Backup)

```bash
# 1. Stop everything
docker compose -f docker-compose.production.yml down

# 2. Restore database from backup
docker compose -f docker-compose.production.yml up -d mysql
sleep 15  # Wait for MySQL to be ready
zcat /var/backups/mejdar/mejdar_db_YYYYMMDD_HHMMSS.sql.gz | \
  docker compose -f docker-compose.production.yml exec -T mysql \
  mysql -u root -p"${DB_ROOT_PASSWORD}" mejdar

# 3. Restore application files
cd /home/mejdar/mejdar
git checkout <KNOWN_GOOD_COMMIT>

# 4. Restore storage
tar xzf /var/backups/mejdar/mejdar_storage_YYYYMMDD_HHMMSS.tar.gz \
  -C /var/www/mejdar/

# 5. Start all services
docker compose -f docker-compose.production.yml up -d --build

# 6. Verify
curl -sf https://your-domain.com/health | jq .
```

### Emergency Rollback

```bash
# If the site is completely broken, restore from the last known-good backup
docker compose -f docker-compose.production.yml down -v
# Then follow the full deployment steps with the backup
```

---

## 8. Monitoring Basics

### Health Checks

All services include health checks. Monitor them:

```bash
# View health status
docker compose -f docker-compose.production.yml ps

# Manual health check
curl -sf https://your-domain.com/health | jq .

# Check individual services
docker inspect --format='{{.State.Health.Status}}' mejdar-app
docker inspect --format='{{.State.Health.Status}}' mejdar-mysql
docker inspect --format='{{.State.Health.Status}}' mejdar-redis
```

### Resource Monitoring

```bash
# Real-time container stats
docker stats --no-stream

# Memory usage by container
docker stats --format "table {{.Name}}\t{{.MemUsage}}\t{{.MemPerc}}" --no-stream

# Disk usage
docker system df

# Check for OOM kills
dmesg | grep -i oom
journalctl -k | grep -i oom
```

### Log Monitoring

```bash
# Follow all logs
docker compose -f docker-compose.production.yml logs -f

# Last 100 lines of app logs
docker compose -f docker-compose.production.yml logs --tail=100 app

# Error logs only
docker compose -f docker-compose.production.yml logs app 2>&1 | grep -i error

# Nginx access logs
docker compose -f docker-compose.production.yml exec nginx tail -f /var/log/nginx/access.log
```

### Simple Uptime Check Script

```bash
#!/bin/bash
# /home/mejdar/scripts/health-check.sh

URL="https://your-domain.com/health"
SLACK_WEBHOOK="https://hooks.slack.com/services/..."

RESPONSE=$(curl -sf -o /dev/null -w "%{http_code}" "$URL" 2>/dev/null)

if [ "$RESPONSE" != "200" ]; then
    curl -sf -X POST -H 'Content-type: application/json' \
        --data "{\"text\":\"⚠️ MEJDAR health check failed! Status: $RESPONSE\"}" \
        "$SLACK_WEBHOOK"
fi
```

Add to cron:

```bash
*/5 * * * * /home/mejdar/scripts/health-check.sh
```

### Log Rotation

Add to `/etc/logrotate.d/mejdar`:

```
/var/log/mejdar/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 mejdar mejdar
    sharedscripts
    postrotate
        docker compose -f /home/mejdar/mejdar/docker-compose.production.yml exec nginx nginx -s reopen
    endscript
}
```
