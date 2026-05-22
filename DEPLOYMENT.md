# 🚀 Deploy Casa del Rey Moro to Vercel

This guide walks you through deploying the website to **Vercel** using **GitHub**, with a cloud PostgreSQL database and Gmail SMTP for emails.

---

## 📋 Prerequisites

- GitHub account
- Vercel account (free at [vercel.com](https://vercel.com))
- Gmail account with App Password (you already have this)

---

## Step 1: Push Code to GitHub

### 1.1 Create a New GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `casa-del-rey-moro` (or any name you prefer)
3. Set it to **Private** (recommended) or Public
4. Click **Create repository**

### 1.2 Push Your Code

In your terminal, run these commands:

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Casa del Rey Moro website"

# Add your GitHub repo as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/casa-del-rey-moro.git

# Push to GitHub
git push -u origin main
```

---

## Step 2: Set Up Cloud PostgreSQL Database

You need a cloud-hosted PostgreSQL database. Here are the best free options:

### Option A: Neon (Recommended - Generous Free Tier)

1. Go to [neon.tech](https://neon.tech) and sign up
2. Click **Create Project**
3. Name it `casa-del-rey-moro`
4. Select a region close to your users (e.g., `eu-central-1` for Europe)
5. Click **Create Project**
6. Copy the **Connection String** — it looks like:
   ```
   postgresql://username:password@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require
   ```

### Option B: Supabase (Also Free)

1. Go to [supabase.com](https://supabase.com) and sign up
2. Click **New Project**
3. Set password and region
4. Go to **Settings → Database → Connection String → URI**
5. Copy the connection string

### Option C: Vercel Postgres

1. In your Vercel dashboard, go to **Storage**
2. Click **Create Database → Postgres**
3. The connection string will be auto-added to your project

---

## Step 3: Deploy to Vercel

### 3.1 Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New → Project**
3. Click **Import Git Repository**
4. Select your `casa-del-rey-moro` repository
5. Click **Import**

### 3.2 Configure Environment Variables

Before deploying, add these environment variables:

| Variable Name | Value |
|---------------|-------|
| `DATABASE_URL` | Your Neon/Supabase connection string (from Step 2) |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `solutionslanguages@gmail.com` |
| `SMTP_PASS` | `htaw ezii ywnf qvuk` |
| `SMTP_FROM` | `Casa del Rey Moro <solutionslanguages@gmail.com>` |

**How to add them:**
1. In the Vercel import screen, expand **Environment Variables**
2. Add each variable name and value
3. Make sure all are set for **Production**, **Preview**, and **Development**

### 3.3 Deploy

1. Click **Deploy**
2. Wait 1-2 minutes for the build to complete
3. Your site is now live at `https://your-project.vercel.app`!

---

## Step 4: Initialize the Database

After the first deployment, you need to create the database tables.

### 4.1 Run Database Migration

1. In Vercel dashboard, go to your project
2. Click **Settings → Functions → Function Region** 
   - Set it to match your database region (e.g., `fra1` for Frankfurt)
3. Open your Neon/Supabase dashboard
4. Go to **SQL Editor** and run this SQL:

```sql
-- Create enums
CREATE TYPE ticket_type AS ENUM ('standard', 'child', 'family', 'guided');
CREATE TYPE booking_status AS ENUM ('confirmed', 'used', 'cancelled');
CREATE TYPE lang AS ENUM ('en', 'es', 'de');

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT false,
  verify_code TEXT,
  language lang NOT NULL DEFAULT 'en',
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  user_id TEXT,
  email TEXT NOT NULL,
  guest_name TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  total NUMERIC(10,2) NOT NULL,
  status booking_status NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Booking lines table
CREATE TABLE booking_lines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  ticket_type ticket_type NOT NULL,
  qty INTEGER NOT NULL,
  unit_price NUMERIC(8,2) NOT NULL
);

-- Audio sessions table
CREATE TABLE audio_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT,
  beacon_id TEXT NOT NULL,
  station INTEGER NOT NULL,
  language lang NOT NULL DEFAULT 'en',
  started_at TIMESTAMP NOT NULL DEFAULT now(),
  completed_at TIMESTAMP
);

-- Contact messages table
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);
```

---

## Step 5: Set Up Custom Domain (Optional)

### 5.1 Add Your Domain

1. In Vercel, go to **Settings → Domains**
2. Enter your domain (e.g., `casadelreymoro.com`)
3. Click **Add**

### 5.2 Configure DNS

Add these DNS records at your domain registrar:

| Type | Name | Value |
|------|------|-------|
| A | @ | `76.76.21.21` |
| CNAME | www | `cname.vercel-dns.com` |

Wait 5-30 minutes for DNS propagation.

---

## 🔧 Troubleshooting

### Emails Not Sending

1. **Check Gmail App Password**: Make sure you're using an App Password, not your regular Gmail password
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Generate a new App Password for "Mail"
   
2. **Check Environment Variables**: In Vercel dashboard, verify all SMTP variables are set correctly

3. **Check Logs**: Go to Vercel → Your Project → **Deployments** → Click latest → **Functions** tab → Check logs

### Database Connection Failed

1. **Check Connection String**: Make sure `DATABASE_URL` includes `?sslmode=require` at the end
2. **IP Allowlist**: Some providers require you to allowlist Vercel's IPs. In Neon, this is usually automatic.

### Build Errors

Check the build logs in Vercel dashboard. Common fixes:
- Make sure all dependencies are in `package.json`
- Check for TypeScript errors locally with `npm run build`

---

## 📊 Environment Variables Summary

```env
# Database (get from Neon/Supabase)
DATABASE_URL=postgresql://user:pass@host/dbname?sslmode=require

# Gmail SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=solutionslanguages@gmail.com
SMTP_PASS=htaw ezii ywnf qvuk
SMTP_FROM=Casa del Rey Moro <solutionslanguages@gmail.com>
```

---

## 🔄 Updating the Website

After making changes:

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```

2. Vercel automatically deploys when you push to GitHub!

---

## 📱 Features Checklist

After deployment, verify these work:

- [ ] Homepage loads with images and video
- [ ] Navigation works (all pages)
- [ ] Sign up → check email for verification code
- [ ] Login works after verification
- [ ] Forgot password → check email for reset code
- [ ] Book tickets → check email for confirmation
- [ ] Audio guide plays audio
- [ ] Contact form submits
- [ ] Dark mode toggle works
- [ ] Language switcher works (EN/ES/DE)
- [ ] Mobile responsive design

---

## 🎉 Done!

Your Casa del Rey Moro website is now live on Vercel with:
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments from GitHub
- ✅ PostgreSQL database
- ✅ Gmail email sending
- ✅ Serverless API routes

**Support**: If you have issues, check [Vercel Docs](https://vercel.com/docs) or [Neon Docs](https://neon.tech/docs).
