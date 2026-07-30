# MEJDAR — Deploy to Vercel Hobby

**Status:** Preparation guide — deployment will happen after Vercel account creation  
**Target:** Vercel Hobby (free tier)

---

## Prerequisites

1. Vercel account (free tier)
2. GitHub repository connected to Vercel
3. Node.js 20.9+ for local builds

---

## Step 1: Connect Repository

1. Log in to [vercel.com](https://vercel.com)
2. Click **Add New Project**
3. Import the MEJDAR GitHub repository
4. Select the `apps/website` directory as the root
5. Framework: **Next.js** (auto-detected)

---

## Step 2: Configure Build Settings

```text
Root Directory: apps/website
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Node.js Version: 20.x
```

---

## Step 3: Environment Variables

Set these in the Vercel dashboard under **Settings > Environment Variables**:

### Required

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_ANALYTICS_ENABLED=false
```

### Optional (Lead Form Email)

Choose one provider and configure accordingly:

#### Option A: Resend (Recommended for Vercel)

```env
SMTP_API_URL=https://api.resend.com/emails
SMTP_API_KEY=re_your_key
SMTP_FROM=MEJDAR <noreply@your-domain.com>
```

#### Option B: SendGrid

```env
SMTP_API_URL=https://api.sendgrid.com/v3/mail/send
SMTP_API_KEY=SG.your_key
SMTP_FROM=noreply@your-domain.com
```

#### Option C: Mailgun

```env
SMTP_API_URL=https://api.mailgun.net/v3/your-domain.com/messages
SMTP_API_KEY=your_key
SMTP_FROM=MEJDAR <noreply@your-domain.com>
```

#### Option D: No Email (Development)

Leave `SMTP_API_URL` and `SMTP_API_KEY` empty. The form will log submissions to the server console.

### Optional (Analytics)

```env
NEXT_PUBLIC_ANALYTICS_ENABLED=false
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
```

---

## Step 4: Deploy

1. Click **Deploy** in the Vercel dashboard
2. Wait for build to complete (~1-2 minutes)
3. Visit the preview URL to verify

---

## Step 5: Custom Domain (Optional)

1. Go to **Settings > Domains**
2. Add your domain
3. Configure DNS as instructed by Vercel
4. SSL is automatic

---

## Vercel Free Tier Limitations

| Limit | Value |
|---|---|
| Bandwidth | 100 GB/month |
| Serverless function execution | 10s per request |
| Build minutes | 6000 minutes/month |
| Concurrent builds | 1 |
| Team members | 1 (personal) |
| Custom domains | 50 |

### Adaptations Made

- **No cron jobs:** Marketing content changes infrequently; manual redeploy is fine
- **No persistent filesystem:** Lead form uses API-based email, no file storage
- **No background workers:** Lead form processes synchronously (fast enough for email API)
- **Serverless functions:** Lead form API route runs as a serverless function (within 10s limit)

---

## Lead Form Architecture

```
User submits form
    │
    ▼
Client-side validation (React)
    │
    ▼
Honeypot check (hidden field)
    │
    ▼
POST /api/contact (Vercel Serverless Function)
    │
    ├─ Rate limiting (in-memory, per-IP)
    ├─ Server-side validation
    ├─ Sanitize input
    │
    ▼
Email provider API (Resend/SendGrid/Mailgun)
    │
    ├─ Send lead notification to MEJDAR
    ├─ Send acknowledgement to submitter
    │
    ▼
Return success/error response
```

**No database required.** Form data is sent via email. If persistence is needed later, add a database adapter.

---

## Local Development

```bash
cd apps/website
npm install
npm run dev
# Visit http://localhost:3000
```

The lead form in development mode logs submissions to the console if no SMTP provider is configured.

---

## Production Build Verification

```bash
cd apps/website
npm run build
npm run start
# Visit http://localhost:3000
```

---

## Troubleshooting

### Build Fails

```bash
# Check Node.js version
node --version  # Must be 20.9+

# Clean install
rm -rf node_modules .next
npm install
npm run build
```

### Lead Form Not Sending Email

1. Check Vercel function logs in dashboard
2. Verify SMTP_API_URL and SMTP_API_KEY are set
3. Check API provider rate limits
4. Fall back to console logging by leaving API vars empty

### Analytics Not Loading

1. Verify NEXT_PUBLIC_ANALYTICS_ENABLED=true
2. Verify NEXT_PUBLIC_POSTHOG_KEY is set
3. Check browser console for errors
4. Analytics only loads after user consent (cookie banner)

---

## Rollback

1. Go to Vercel dashboard > Deployments
2. Find the last working deployment
3. Click **Promote to Production**
4. Or: `git revert` the breaking commit and push
