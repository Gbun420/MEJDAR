# MEJDAR — Deploy to Oracle Cloud Free Tier

**Status:** Preparation guide — deployment will happen after account creation  
**Target:** Oracle Cloud Always Free Compute (ARM Ampere A1 or AMD)

---

## Prerequisites

1. Oracle Cloud account (free tier)
2. SSH key pair generated
3. Domain name (optional — can use IP directly)

---

## Step 1: Provision VM

### Via Oracle Cloud Console

1. Navigate to **Compute > Instances > Create Instance**
2. Select **Image:** Ubuntu 22.04 or 24.04 (or Oracle Linux)
3. Select **Shape:** VM.Standard.A1.Flex (ARM) or VM.Standard.E2.1.Micro (AMD)
   - ARM: 4 OCPUs, 24GB RAM (always free)
   - AMD: 1 OCPU, 1GB RAM (always free — tighter memory)
4. Upload SSH public key
5. Configure networking:
   - Public IP: Assigned
   - Security list: Allow ports 22 (SSH), 80 (HTTP), 443 (HTTPS)
6. Create instance and note public IP

### SSH Access

```bash
ssh -i ~/.ssh/mejdar_key ubuntu@<PUBLIC_IP>
```

---

## Step 2: Install Docker

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

# Install Docker Compose plugin
sudo apt install docker-compose-plugin -y

# Verify
docker --version
docker compose version

# Log out and back in for group membership
exit
```

---

## Step 3: Deploy Application

```bash
# Clone or upload the MEJDAR project
cd /home/ubuntu
git clone <REPO_URL> mejdar
cd mejdar

# Create .env from template
cp .env.example .env
nano .env  # Fill in production values
```

### Required .env Values

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com
APP_KEY=  # Generate with: php artisan key:generate

DB_ROOT_PASSWORD=<STRONG_PASSWORD>
DB_DATABASE=mejdar
DB_USERNAME=mejdar
DB_PASSWORD=<STRONG_PASSWORD>

REDIS_PASSWORD=<STRONG_PASSWORD>

STRIPE_KEY=
STRIPE_SECRET=
STRIPE_WEBHOOK_SECRET=
STRIPE_ENABLED=false

MAIL_MAILER=smtp
MAIL_HOST=smtp.your-provider.com
MAIL_PORT=587
MAIL_USERNAME=your@email.com
MAIL_PASSWORD=<SMTP_PASSWORD>
MAIL_ENCRYPTION=tls
```

---

## Step 4: Build and Start

```bash
# Build images
docker compose -f compose.production-free.yaml build

# Start services
docker compose -f compose.production-free.yaml up -d

# Check status
docker compose -f compose.production-free.yaml ps
```

---

## Step 5: Install TastyIgniter

```bash
# Enter app container
docker compose -f compose.production-free.yaml exec app sh

# Inside container:
composer create-project tastyigniter/tastyigniter /var/www/html --no-interaction
php artisan igniter:install --no-interaction

# Exit container
exit
```

---

## Step 6: Configure HTTPS

### Option A: Caddy (Recommended)

Caddy provides automatic HTTPS with Let's Encrypt.

```bash
# Add Caddy to compose or install standalone
# Create Caddyfile:
cat > Caddyfile << 'EOF'
your-domain.com {
    reverse_proxy nginx:80
}
EOF
```

### Option B: Nginx + Certbot

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get certificate
sudo certbot --nginx -d your-domain.com

# Auto-renew
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

---

## Step 7: Configure Backups

```bash
# Make backup script executable
chmod +x infra/scripts/backup.sh

# Add to crontab
crontab -e
# Add: 0 2 * * * /home/ubuntu/mejdar/infra/scripts/backup.sh >> /var/log/mejdar-backup.log 2>&1
```

---

## Step 8: Verify

```bash
# Check all services
docker compose -f compose.production-free.yaml ps

# Check health endpoint
curl -s http://localhost/health | jq .

# Check storefront
curl -s -o /dev/null -w "%{http_code}" http://localhost/

# Check admin
curl -s -o /dev/null -w "%{http_code}" http://localhost/admin
```

---

## Memory Monitoring

```bash
# Check memory usage
docker stats --no-stream

# If MySQL is too heavy, switch to database cache:
# Edit .env:
# CACHE_DRIVER=database
# SESSION_DRIVER=database
# QUEUE_CONNECTION=database

# Then disable Redis in compose:
# Comment out the redis service
```

---

## Troubleshooting

### Out of Memory

```bash
# Check dmesg for OOM kills
dmesg | grep -i oom

# Reduce MySQL memory
# Edit compose.production-free.yaml:
# command: --innodb-buffer-pool-size=32M --max-connections=30

# Or switch to database cache/session/queue
```

### MySQL Won't Start

```bash
# Check logs
docker compose -f compose.production-free.yaml logs mysql

# Common fix: increase start_period in healthcheck
```

### Queue Not Processing

```bash
# Check queue worker logs
docker compose -f compose.production-free.yaml logs queue

# Restart queue worker
docker compose -f compose.production-free.yaml restart queue
```

---

## Rollback

```bash
# Stop current deployment
docker compose -f compose.production-free.yaml down

# Restore from backup
# 1. Restore database
docker compose -f compose.production-free.yaml exec mysql mysql -u root -p mejdar < backup.sql

# 2. Restore storage
tar xzf storage-backup.tar.gz -C /var/www/mejdar/storage/

# 3. Restart
docker compose -f compose.production-free.yaml up -d
```
