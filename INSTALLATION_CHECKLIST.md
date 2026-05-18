# SkillSync - Installation & Launch Checklist

## ✅ Complete Installation Guide

Follow these steps in order. This will get SkillSync running in ~10 minutes.

---

## Phase 1: Prerequisites Check (2 minutes)

### Step 1.1: Verify Node.js Installation
```bash
node --version
npm --version
```
**Expected**: Node v14+ and npm v6+  
**Not installed?** → Download from https://nodejs.org/

### Step 1.2: Verify MongoDB
```bash
mongosh
# You should see MongoDB shell prompt
exit
```
**Expected**: MongoDB shell connects  
**Not installed?** → See [MongoDB Setup](#mongodb-setup-instructions) below

### Step 1.3: Verify Git
```bash
git --version
```
**Expected**: Git version shows  
**Not installed?** → Download from https://git-scm.com/

---

## Phase 2: Backend Setup (3 minutes)

### Step 2.1: Open Terminal 1 - Navigate to Backend
```bash
cd c:\Users\user\Desktop\skillsync\backend
```

### Step 2.2: Install Backend Dependencies
```bash
npm install
```
**What it does**: Installs Express, MongoDB, JWT, bcrypt, etc.  
**Time**: 2-3 minutes  
**Success**: No errors, node_modules folder created

### Step 2.3: Verify .env File
```bash
# File should exist at: backend/.env
# Check it contains:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skillsync
JWT_SECRET=your_jwt_secret_key
```

### Step 2.4: Start Backend Server
```bash
npm run dev
```
**Expected Output**:
```
✓ MongoDB Connected: localhost
Server running on http://localhost:5000
```
**Keep this terminal open!** ← Important

---

## Phase 3: Database Setup (2 minutes)

### Step 3.1: Seed Sample Data (Optional but Recommended)

**Open Terminal 2** (keep Terminal 1 running):
```bash
cd c:\Users\user\Desktop\skillsync\backend
node seed.js
```

**Expected Output**:
```
✓ Database connected
✓ Sample users created: 5
✓ Sample requests created: 3
Seeding complete!
```

This creates sample users you can use for testing immediately.

---

## Phase 4: Frontend Setup (3 minutes)

### Step 4.1: Open Terminal 3 - Navigate to Frontend
```bash
cd c:\Users\user\Desktop\skillsync\frontend
```

### Step 4.2: Install Frontend Dependencies
```bash
npm install
```
**What it does**: Installs React, Vite, Tailwind, etc.  
**Time**: 2-3 minutes  
**Success**: No errors

### Step 4.3: Verify .env File
```bash
# File should exist at: frontend/.env
# Check it contains:
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=SkillSync
```

### Step 4.4: Start Frontend Server
```bash
npm run dev
```

**Expected Output**:
```
VITE v5.0.0  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

---

## Phase 5: Access the Application (1 minute)

### Step 5.1: Open Browser
```
URL: http://localhost:5173
```

**You should see**: SkillSync Landing Page with hero section, features, testimonials

---

## Phase 6: Quick Functional Test (2 minutes)

### Step 6.1: Create Test Account
1. Click **"Get Started"** button
2. Fill registration form:
   - **Name**: Test User
   - **Email**: test@example.com
   - **Password**: password123
   - **Confirm Password**: password123
   - **College**: Your College Name
   - **Department**: CSE
3. Click **"Register"**
4. You'll be redirected to **Dashboard**

### Step 6.2: Add a Skill
1. Click **"My Skills"** in sidebar
2. Click **"Add Skill"** button
3. Fill in:
   - **Skill Name**: React
   - **Category**: Web Development
   - **Level**: Intermediate
4. Click **"Add Skill"**
5. Skill appears in your profile

### Step 6.3: Search Users
1. Click **"Explore"** in navbar
2. You can see other users (from seeded data)
3. Click **"Connect"** on any user
4. Toast notification shows "Connection request sent!"

### Step 6.4: Check Requests
1. Click **"Requests"** in navbar
2. View "Received Requests" and "Sent Requests" tabs
3. Test Accept/Reject functionality

---

## ✅ Success Indicators

If you see ALL of these, your installation is successful:

- [x] Backend running on http://localhost:5000
- [x] Frontend running on http://localhost:5173
- [x] Landing page loads with features
- [x] Can register new account
- [x] Dashboard loads after login
- [x] Can add skills
- [x] Can search users
- [x] Can send connection requests
- [x] Can accept/reject requests
- [x] Navbar shows user name when logged in

---

## Common Issues During Setup

### Issue: "MongoDB Connection Error"
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**:
```bash
# Make sure MongoDB is running
mongosh  # Should connect without error

# If not installed, see MongoDB Setup section below
```

### Issue: "Port 5000 Already in Use"
```
Error: listen EADDRINUSE :::5000
```
**Solution**:
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: "npm install fails"
```
npm ERR! ERESOLVE unable to resolve dependency tree
```
**Solution**:
```bash
npm install --legacy-peer-deps
```

### Issue: "Cannot find .env file"
**Solution**:
```bash
# Backend
cd backend
cp .env.example .env

# Frontend  
cd frontend
cp .env.example .env
```

---

## MongoDB Setup Instructions

### If MongoDB is NOT installed:

#### Windows
1. Download: https://www.mongodb.com/try/download/community
2. Run installer
3. Choose "Install MongoD as a Service"
4. Complete installation
5. MongoDB runs automatically on startup

#### macOS
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu)
```bash
sudo apt-get update
sudo apt-get install -y mongodb
sudo service mongod start
```

### Verify Installation
```bash
mongosh
# Should open MongoDB shell
db.version()
exit
```

---

## Subsequent Startups (Next Time)

Once installed, to start the application again:

**Terminal 1** (Backend):
```bash
cd backend
npm run dev
```

**Terminal 2** (Frontend):
```bash
cd frontend
npm run dev
```

**Browser**: Navigate to http://localhost:5173

---

## File Checklist

Verify these files exist:

### Backend Files
- ✅ `/backend/.env`
- ✅ `/backend/package.json`
- ✅ `/backend/server.js`
- ✅ `/backend/models/User.js`
- ✅ `/backend/controllers/authController.js`
- ✅ `/backend/routes/authRoutes.js`

### Frontend Files
- ✅ `/frontend/.env`
- ✅ `/frontend/package.json`
- ✅ `/frontend/vite.config.js`
- ✅ `/frontend/tailwind.config.js`
- ✅ `/frontend/src/App.jsx`
- ✅ `/frontend/src/context/AuthContext.js`
- ✅ `/frontend/src/pages/Landing.jsx`

---

## Features to Test

Once running, test these key features:

- [x] **Authentication**: Register → Login → Logout
- [x] **Profile**: View/Edit profile information
- [x] **Skills**: Add → Edit → Delete skills
- [x] **Search**: Search users by skill and department
- [x] **Requests**: Send → Accept → Reject requests
- [x] **Dashboard**: View overview, stats, suggestions
- [x] **Responsive**: Resize browser to test mobile view
- [x] **Notifications**: Toast messages appear on actions

---

## Performance Tips

- Keep browser DevTools closed for better performance
- Use Chrome/Edge for best performance
- Clear browser cache if issues occur
- Restart servers if they become unresponsive

---

## Next Steps After Setup

1. **Explore the Code**: Review the implementation
2. **Customize**: Change colors, add features
3. **Deploy**: Follow [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
4. **Scale**: Add more features from [Project roadmap](./PROJECT_SUMMARY.md#future-enhancement-ideas)

---

## Documentation References

- **Setup Issues?** → [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Want to Deploy?** → [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **API Reference?** → [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Quick 5-min setup?** → [QUICK_START.md](./QUICK_START.md)
- **Detailed guide?** → [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)

---

## Terminal Summary

**You should have 3 terminals running:**

| Terminal | Command | Port | Status |
|----------|---------|------|--------|
| Terminal 1 | `cd backend && npm run dev` | 5000 | ✅ Running |
| Terminal 2 | `node seed.js` | N/A | ✅ Completed |
| Terminal 3 | `cd frontend && npm run dev` | 5173 | ✅ Running |
| Browser | http://localhost:5173 | N/A | ✅ Open |

---

## Success Screenshot Checklist

- [ ] Terminal 1: "Server running on http://localhost:5000"
- [ ] Terminal 3: "Local: http://localhost:5173/"
- [ ] Browser: SkillSync Landing page visible
- [ ] Can register and login
- [ ] Dashboard loads with user info
- [ ] All pages accessible from navbar/sidebar

---

## Support

If you encounter issues:

1. Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
2. Verify all prerequisites are installed
3. Restart all servers
4. Clear browser cache (Ctrl+Shift+Delete)
5. Check console errors (F12 in browser)

---

**🎉 Congratulations!** 

Your SkillSync application is now running!

Next: Explore the features and review the code structure.

For deployment and production setup, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

**Need Help?**
- Documentation: See README.md
- API Errors?: See API_DOCUMENTATION.md
- Deployment?: See DEPLOYMENT_GUIDE.md
- Still Stuck?: See TROUBLESHOOTING.md
