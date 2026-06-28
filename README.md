# Heath School — Maths Hub

A staff portal for sharing maths resources, with a built-in interactive whiteboard.

## Tech stack
- React (frontend)
- Supabase (authentication + database + file storage)
- Vercel (hosting)
- All completely free

---

## Setup guide

### Step 1 — Supabase

1. Go to supabase.com and create a new project
2. Go to SQL Editor and paste + run the contents of `supabase-setup.sql`
3. Go to Storage → New bucket → name it `resources` → tick "Public bucket"
4. Go to Settings → API and copy:
   - Project URL
   - anon/public key

### Step 2 — Environment variables

Copy `.env.example` to `.env.local`:
```
cp .env.example .env.local
```

Fill in your Supabase values:
```
REACT_APP_SUPABASE_URL=https://xxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

### Step 3 — Run locally

```bash
npm install
npm start
```

Visit http://localhost:3000 — you should see the login page.

Create an account with your school email. It will ask you to confirm via email.

### Step 4 — Deploy to Vercel

1. Push this folder to a GitHub repository
2. Go to vercel.com → New Project → Import your GitHub repo
3. Add your environment variables in Vercel (Settings → Environment Variables)
4. Deploy — Vercel gives you a free URL like `heath-maths.vercel.app`

---

## Pages

| Page | URL | What it does |
|------|-----|--------------|
| Login | /login | Teacher login and sign-up |
| Dashboard | / | Overview and quick links |
| Resources | /resources | Upload and browse files |
| Whiteboard | /whiteboard | Interactive drawing canvas |

## Adding more teachers

Teachers sign up themselves using the Create account tab on the login page.
You can also invite them directly from: Supabase → Authentication → Users → Invite user

## Folder structure

```
src/
  lib/
    supabase.js       ← Supabase client
  styles/
    global.css        ← School colour theme
  components/
    Layout.js         ← Top bar + sidebar nav
  pages/
    Login.js          ← Login/signup page
    Dashboard.js      ← Home page
    Resources.js      ← Upload + resource library
    Whiteboard.js     ← Drawing canvas
  App.js              ← Routing
```
