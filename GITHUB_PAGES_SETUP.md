# GitHub Pages Configuration Guide

## Current Deployment Status

The SkillSync application has been built and deployed to the `/docs` folder in the `main` branch.

## How to Configure GitHub Pages

To enable GitHub Pages to serve from the `/docs` folder:

### Option 1: Using GitHub Web Interface (Recommended)

1. Go to your repository: https://github.com/ishaanshah21-creator/skills
2. Click on **Settings** (gear icon at the top right)
3. In the left sidebar, scroll down to **Code and automation** section
4. Click on **Pages**
5. Under "Build and deployment":
   - Select **Source**: "Deploy from a branch"
   - Select **Branch**: "main"
   - Select **Folder**: "/(root)" or "/docs" depending on your setup
6. Click **Save**

The site should be published at: https://ishaanshah21-creator.github.io/skills/

### Option 2: Using GitHub CLI

If you have the GitHub CLI installed, run:

```bash
gh repo edit --enable-discussions --web
# Then navigate to Settings > Pages as described above
```

## File Structure

- `/docs/` - Contains the production build of the React application
- `/docs/index.html` - Main HTML file with correct base path `/skills/`
- `/docs/assets/` - JavaScript and CSS bundles
- `/docs/.nojekyll` - Prevents GitHub from processing as Jekyll site

## Testing Locally

To test the application before deploying:

```bash
# Backend
cd backend
npm install
npm run dev  # Starts on http://localhost:5000

# Frontend (in another terminal)
cd frontend
npm install
npm run dev  # Starts on http://localhost:5173
```

## Troubleshooting

### Site Still Shows README

GitHub Pages might be cached. Try:
1. Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
2. Wait 5-10 minutes for GitHub to rebuild
3. Force refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
4. Check repository settings again to ensure `/docs` is selected

### Assets Loading Incorrectly

The Vite config includes `base: '/skills/'` which is correct for the subdirectory. Make sure the URL paths in `/docs/index.html` include `/skills/` prefix.

## Application Features

### New Features Added

1. **Chat System** - Real-time messaging between connected users
   - View conversations list
   - Send/receive messages
   - Profile pictures in messages
   - Last message preview

2. **Logout Button** - Added to Settings page
   - Account section includes logout option
   - Orange styled button for visibility
   - Clears token and redirects home

3. **Fixed Request Acceptance** - Users can now accept/reject connection requests
   - Fixed authorization check in backend
   - Proper user population in responses

4. **Date Updates** - All 2024 references updated to 2026

## Backend Message Endpoints

```
POST   /api/messages/send        - Send message
GET    /api/messages/:userId     - Get messages with user
GET    /api/messages             - Get all conversations
```

## Next Steps

1. Configure GitHub Pages as described above
2. Test all features locally first
3. Verify deployment at https://ishaanshah21-creator.github.io/skills/
4. Report any issues or broken features

---

Last Updated: January 2026
