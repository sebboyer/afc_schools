# Vercel Deployment Fix - Database Not Accessible

## Problem Identified

When deploying to Vercel, the schools database wasn't accessible because:

1. **File Location**: `schools.json` was in `public/data/` folder
2. **Vercel Architecture**: 
   - Files in `public/` are uploaded to Vercel's CDN (static hosting)
   - Flask serverless function runs in a separate isolated environment
   - **Flask function CANNOT access files in `public/`** - they're on the CDN!

3. **Result**: Flask app couldn't load the schools data, so searches returned no results

## Solution Applied

### 1. Moved Database File
```
OLD: public/data/schools.json  ❌ (Only accessible via CDN)
NEW: data/schools.json          ✅ (Accessible to Flask function)
```

### 2. Updated Code

#### `app.py` (Line 19)
```python
# OLD
SCHOOLS_DATA_PATH = Path(__file__).parent / 'public' / 'data' / 'schools.json'

# NEW
SCHOOLS_DATA_PATH = Path(__file__).parent / 'data' / 'schools.json'
```

#### `process_schools.py` (Line 226)
Now saves to both locations:
- `data/schools.json` - **Primary** (for Flask on Vercel)
- `public/data/schools.json` - Backup copy (for backward compatibility)

### 3. Created `.vercelignore`
Excludes unnecessary files from deployment (scripts, docs, cache files)

## File Structure

```
afc_school_finder/
├── app.py                      # Flask app ✅
├── requirements.txt            # Dependencies ✅
├── .vercelignore              # Deployment exclusions ✅
├── data/                       # 🆕 Backend data (Flask accessible)
│   └── schools.json           # 11MB - Loaded by Flask function ✅
├── public/                     # Static assets (CDN)
│   ├── afc_logo.jpg           # Images ✅
│   ├── afc_image.jpg          # Images ✅
│   ├── style.css              # CSS ✅
│   ├── script.js              # JavaScript ✅
│   └── data/                  # Backup copy (not used by Flask)
│       └── schools.json       # 11MB - Kept for compatibility
└── templates/                  # Jinja2 templates ✅
    ├── index.html
    ├── school_profile.html
    └── 404.html
```

## How It Works on Vercel

### Before (Broken ❌)
```
1. Upload → public/data/schools.json → Vercel CDN
2. Flask function starts → Tries to read public/data/schools.json
3. ❌ File not found! (It's on the CDN, not in function filesystem)
4. schools_data = [] (empty)
5. API returns no results
```

### After (Fixed ✅)
```
1. Upload → data/schools.json → Included in Flask function bundle
2. Flask function starts → Reads data/schools.json
3. ✅ File found! (It's in the function filesystem)
4. schools_data = [15,467 schools loaded]
5. API returns search results
```

## Verification

### Local Testing
```bash
cd /Users/sebboyer/Documents/Zeffy/schools/afc_school_finder
python3 -c "from app import app, schools_data; print(f'Schools loaded: {len(schools_data)}')"
```

Expected output:
```
✓ Loaded 15467 schools
✓ Flask app loaded successfully
✓ Schools loaded: 15,467
```

### Production Testing (After Deployment)
1. Visit your Vercel URL
2. Try searching for a school (e.g., "Academy")
3. Filter by state (e.g., "CA")
4. Should see results immediately ✅

## Deployment Instructions

### Deploy via Vercel CLI
```bash
cd /Users/sebboyer/Documents/Zeffy/schools/afc_school_finder
vercel deploy --prod
```

### Or via Git
```bash
git add .
git commit -m "Fix: Move schools.json to data/ folder for Vercel compatibility"
git push
```

Vercel will auto-deploy from your Git repository.

## Technical Details

### Vercel Function Limits
- ✅ Max function size: 250MB (our app: ~11MB data + <1MB code = ~12MB total)
- ✅ Max JSON file: No specific limit (11MB is fine)
- ✅ Execution time: 10s default (our app loads in <1s)

### Why This Works
- Vercel includes ALL files in the function bundle EXCEPT files in `public/`
- The `data/` folder at root level is included in the function filesystem
- Flask can read files from the function filesystem
- Static files (CSS, JS, images) still served from CDN via `public/`

## Rollback (If Needed)

If you need to rollback:
```bash
# Restore old path in app.py
sed -i '' 's|data/schools.json|public/data/schools.json|g' app.py

# Or manually change line 19 in app.py back to:
SCHOOLS_DATA_PATH = Path(__file__).parent / 'public' / 'data' / 'schools.json'
```

## Key Takeaway

**On Vercel:**
- ✅ `data/` folder → Flask function can access
- ❌ `public/` folder → Only accessible via CDN (static URLs)

This is different from traditional Flask apps where static files and data files can be in the same directory.

---

## Status: ✅ FIXED

The database is now accessible on Vercel. Search functionality should work in production.

Deploy and test! 🚀

