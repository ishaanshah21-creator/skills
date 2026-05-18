# GitHub Pages Deployment Instructions

## 🎯 Current Status: READY FOR GITHUB PAGES

✅ Clean database - no test credentials  
✅ Default avatars implemented  
✅ Production environment configured  
✅ No hardcoded localhost URLs  

---

## 📋 Pre-Deployment Checklist

Before pushing to GitHub Pages, ensure:

- [ ] All test data removed ✅ (DONE)
- [ ] Default avatars configured ✅ (DONE)
- [ ] No credentials in code ✅ (DONE)
- [ ] Environment variables set up ✅ (DONE)

---

## 🚀 Step 1: Prepare Backend for Production

### Option A: Deploy to Render.com (Recommended - Free)

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Select `skillsync` repository
   - Select `backend` as root directory

3. **Configure Build Settings**
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Set Environment Variables**
   ```
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/skillsync
   JWT_SECRET=your-very-secure-secret-key-at-least-32-characters
   JWT_EXPIRE=7d
   FRONTEND_URL=https://yourgithubusername.github.io/skillsync
   NODE_ENV=production
   PORT=5000
   ```

5. **Copy Backend URL**
   - After deployment, you'll get a URL like: `https://skillsync-backend.onrender.com`
   - Save this for frontend configuration

### Option B: Deploy to Railway.app

1. Go to https://railway.app
2. Create new project
3. Connect GitHub
4. Add MongoDB plugin
5. Set environment variables (same as above)
6. Deploy

---

## 🚀 Step 2: Update Frontend Configuration

### Update Production Environment File

Edit `frontend/.env.production`:
```
VITE_API_BASE_URL=https://your-backend-url.com/api
VITE_APP_NAME=SkillSync
```

Replace `https://your-backend-url.com` with your actual backend URL from Step 1.

Example (if using Render):
```
VITE_API_BASE_URL=https://skillsync-backend.onrender.com/api
```

---

## 🚀 Step 3: Build Frontend for Production

### From Terminal:

```powershell
cd frontend
npm run build
```

This creates a `dist` folder with production-ready files.

---

## 🚀 Step 4: Deploy to GitHub Pages

### Option A: Using GitHub Pages with gh-pages Package

```powershell
cd frontend

# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts
# "deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

### Option B: Manual Deployment via GitHub

1. **Create gh-pages Branch**
   ```powershell
   git checkout -b gh-pages
   git push -u origin gh-pages
   ```

2. **Push dist folder to gh-pages**
   ```powershell
   cd frontend
   npm run build
   git add dist/
   git commit -m "Production build"
   git push origin gh-pages
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Select Pages
   - Source: Deploy from branch
   - Branch: `gh-pages`
   - Folder: `/ (root)`
   - Save

### Option C: Automatic Deployment with GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Build frontend
        run: |
          cd frontend
          npm install
          npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/dist
```

---

## ✅ Verification Steps

After deployment, verify everything works:

### 1. Check GitHub Pages URL
- Your site should be at: `https://yourgithubusername.github.io/skillsync`

### 2. Test Landing Page
- [ ] Home page loads
- [ ] Navigation works
- [ ] "Get Started" button visible

### 3. Test Registration
- [ ] Register page loads
- [ ] Registration form works
- [ ] Successfully register test account

### 4. Test Login
- [ ] Login with registered account works
- [ ] Redirects to dashboard
- [ ] Profile shows default avatar

### 5. Test Features
- [ ] Add skills
- [ ] Search users
- [ ] Update profile
- [ ] See default avatar everywhere

---

## 🐛 Troubleshooting

### Issue: "404 Not Found" on GitHub Pages

**Solution:** Check if dist folder exists and has index.html
```powershell
cd frontend/dist
ls  # Should show index.html
```

### Issue: CORS Error from Backend

**Solution:** Update backend `FRONTEND_URL`:
```
FRONTEND_URL=https://yourgithubusername.github.io/skillsync
```

### Issue: API Calls Failing

**Solution:** Verify `VITE_API_BASE_URL` is correct:
```
VITE_API_BASE_URL=https://your-backend-url/api
```

### Issue: Default Avatar Not Loading

**Solution:** Verify file exists:
```
frontend/public/default-avatar.svg  # Should exist
```

### Issue: Build Fails

**Solution:** Clear and rebuild:
```powershell
cd frontend
rm -r node_modules
npm cache clean --force
npm install
npm run build
```

---

## 📊 Final Deployment URLs

After successful deployment, you'll have:

**Frontend URL:**
```
https://yourgithubusername.github.io/skillsync
```

**Backend URL:**
```
https://skillsync-backend.onrender.com (or your service)
```

**Database:**
```
MongoDB Atlas (cloud)
```

---

## 🔐 Security Reminders

Before deployment:

1. **Change JWT_SECRET** to a secure random string
   ```powershell
   # Generate secure secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Enable HTTPS** on all URLs

3. **Set secure CORS origins** in backend

4. **Use environment variables** for all secrets

5. **Enable MongoDB authentication**

6. **Set up monitoring** and error tracking

---

## 📱 Supported Environments

- ✅ Linux (Ubuntu, Debian, etc.)
- ✅ macOS
- ✅ Windows
- ✅ GitHub Actions
- ✅ Docker
- ✅ Any Node.js 14+ environment

---

## 🎉 Success!

Your SkillSync application is now:
- ✅ Live on GitHub Pages
- ✅ Connected to production backend
- ✅ Using production database
- ✅ Ready for real users!

---

**Deployment Guide Version:** 1.0  
**Last Updated:** May 18, 2026  
**Status:** Ready for Production ✅
