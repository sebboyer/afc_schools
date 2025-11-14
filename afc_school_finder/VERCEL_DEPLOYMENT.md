# Vercel Deployment Guide

## ✅ Your App is Ready for Vercel!

Your Flask application has been configured to deploy to Vercel with **zero configuration**. All required changes have been implemented according to [Vercel's Flask documentation](https://vercel.com/docs/frameworks/backend/flask).

## Changes Made

### 1. ✅ Flask App Entrypoint
- Your `app.py` is in the root directory
- Flask `app` instance is properly exported at module level (line 13)
- This meets Vercel's requirement for automatic detection

### 2. ✅ Static Files Structure
- **Changed**: `static/` → `public/`
- All static assets are now in `public/` directory
- Files are served via Vercel's CDN at root paths:
  - `public/style.css` → `/style.css`
  - `public/afc_logo.jpg` → `/afc_logo.jpg`
  - `public/script.js` → `/script.js`
  - `public/data/schools.json` → available to Flask app

### 3. ✅ Template Updates
- All templates updated to use direct paths instead of `url_for('static', ...)`
- Compatible with Vercel's CDN serving

### 4. ✅ Zero Configuration
- No `vercel.json` needed (removed)
- Vercel auto-detects Flask apps

## Deployment Steps

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI (if not already installed):
```bash
npm install -g vercel
```

2. Deploy from your project directory:
```bash
cd /Users/sebboyer/Documents/Zeffy/schools/afc_school_finder
vercel deploy
```

3. Follow the prompts to:
   - Link to your Vercel account
   - Set up the project
   - Deploy to production

### Option 2: Deploy via Git Integration

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your repository
5. Vercel will auto-detect Flask and deploy

## Project Structure

```
afc_school_finder/
├── app.py                    # Flask app (entrypoint) ✅
├── requirements.txt          # Python dependencies ✅
├── public/                   # Static assets (CDN) ✅
│   ├── afc_logo.jpg
│   ├── style.css
│   ├── script.js
│   └── data/
│       └── schools.json
└── templates/                # Jinja2 templates ✅
    ├── index.html
    ├── school_profile.html
    └── 404.html
```

## Vercel Configuration (Automatic)

Vercel automatically:
- Detects `app.py` as Flask entrypoint
- Uses `@vercel/python` builder
- Installs dependencies from `requirements.txt`
- Serves `public/**` files via CDN
- Routes all other requests to Flask app

## Local Testing

Test locally before deploying:

```bash
cd /Users/sebboyer/Documents/Zeffy/schools/afc_school_finder
python3 app.py
```

Visit: http://localhost:5002

## Production URL

After deployment, Vercel will provide:
- **Production URL**: `https://your-project.vercel.app`
- **Preview URLs**: For each git commit/PR

## Environment Variables (if needed)

If you add any environment variables in the future:
1. Go to Project Settings in Vercel Dashboard
2. Navigate to Environment Variables
3. Add your variables (they'll be available to Flask app)

## Limitations

Per Vercel's documentation:
- Max function size: 250MB (your app is well under this)
- Flask app becomes a single Vercel Function
- Uses Fluid Compute (auto-scales based on traffic)

## Troubleshooting

If deployment fails:
1. Check build logs in Vercel Dashboard
2. Ensure `requirements.txt` is valid
3. Verify Flask app loads: `python3 -c "from app import app; print(app)"`

## Documentation

- [Vercel Flask Documentation](https://vercel.com/docs/frameworks/backend/flask)
- [Vercel Functions](https://vercel.com/docs/functions)
- [Python Runtime](https://vercel.com/docs/functions/runtimes/python)

---

## Ready to Deploy! 🚀

Your application is fully configured for Vercel deployment. Simply run:

```bash
vercel deploy
```

Or push to your Git repository and connect it to Vercel.


