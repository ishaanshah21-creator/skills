# SkillSync - Running the Application

## Overview
SkillSync is a full-stack peer learning platform built with React, Express, Node.js, and MongoDB. The application is now fully functional and ready to run.

---

## Prerequisites

### Required Software
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** (comes with Node.js)

### Verify Installation
```powershell
node --version    # Should show v14+
npm --version     # Should show v6+
mongod --version  # Should show v4.4+
```

---

## Quick Start (5 Minutes)

### 1. Ensure MongoDB is Running
```powershell
# MongoDB should be running as a Windows service
# Verify: Services > MongoDB Server (should be "Running")
```

### 2. Install Backend Dependencies
```powershell
cd c:\Users\user\Desktop\skillsync\backend
npm install
```

### 3. Start Backend Server (Terminal 1)
```powershell
cd c:\Users\user\Desktop\skillsync\backend
npm run dev
# Expected output: "Server running on http://localhost:5000" and "MongoDB Connected: localhost"
```

### 4. Start Frontend Server (Terminal 2)
```powershell
cd c:\Users\user\Desktop\skillsync\frontend
npm run dev
# Expected output: "Local: http://localhost:5174/" (or similar available port)
```

### 5. Open Application in Browser
```
http://localhost:5174
```

---

## Detailed Setup Guide

### Backend Setup

#### Step 1: Navigate to Backend Directory
```powershell
cd c:\Users\user\Desktop\skillsync\backend
```

#### Step 2: Install Dependencies
```powershell
npm install
```

The backend requires these packages:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT authentication
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment variables
- `express-validator` - Request validation
- `multer` - File upload handling
- `nodemon` (dev) - Auto-restart on changes

#### Step 3: Verify MongoDB Connection
- Ensure MongoDB service is running
- Default connection: `mongodb://localhost:27017/skillsync`
- This is configured in `.env` file

#### Step 4: Start Backend
```powershell
npm run dev
```

**Success Indicators:**
- ✅ "Server running on http://localhost:5000"
- ✅ "MongoDB Connected: localhost"
- ✅ No error messages in console

**If Backend Fails to Start:**
- Check MongoDB is running: `Get-Process mongod` in PowerShell
- Check port 5000 is not in use: `netstat -ano | findstr :5000`
- Check `.env` file exists with correct `MONGODB_URI`
- Check `backend/package.json` is valid JSON

---

### Frontend Setup

#### Step 1: Navigate to Frontend Directory
```powershell
cd c:\Users\user\Desktop\skillsync\frontend
```

#### Step 2: Install Dependencies (If Not Already Done)
```powershell
npm install
```

The frontend requires:
- `react` - UI framework
- `react-dom` - React DOM bindings
- `react-router-dom` - Client-side routing
- `axios` - HTTP client
- `framer-motion` - Animations
- `tailwindcss` - Styling
- `vite` - Build tool

#### Step 3: Start Frontend
```powershell
npm run dev
```

**Success Indicators:**
- ✅ "Local: http://localhost:5174/" (or available port if 5173 is busy)
- ✅ No error messages in console
- ✅ Page loads in browser

**If Frontend Fails to Load:**
- Check that backend is running (should see requests in backend console)
- Check browser console (F12) for errors
- If port 5173/5174 is in use, Vite will automatically use next available port
- Clear browser cache: `Ctrl+Shift+Delete`

---

## Testing the Application

### 1. User Registration
1. Click **"Get Started"** on the landing page
2. OR navigate to http://localhost:5174/register
3. Fill in the form:
   - Full Name: `John Doe`
   - Email: `john@example.com`
   - College Name: `IIIT Delhi`
   - Department: `CSE`
   - Password: `password123`
   - Confirm Password: `password123`
4. Click **"Create Account"**
5. Expected: "Registration successful! Please login" message

### 2. User Login
1. Navigate to http://localhost:5174/login
2. Enter email: `john@example.com`
3. Enter password: `password123`
4. Click **"Login"**
5. Expected: Redirect to dashboard

### 3. Explore Dashboard
- ✅ See welcome banner with user stats
- ✅ View Quick Actions section
- ✅ See Suggested Peers section

### 4. Test Navigation
Click sidebar links to verify all pages load:
- ✅ **Home** - Dashboard
- ✅ **Profile** - User profile with skill management
- ✅ **My Skills** - Skills overview
- ✅ **Search Users** - Find peers
- ✅ **Requests** - Collaboration requests
- ✅ **Messages** - Chat interface
- ✅ **Settings** - Account settings

### 5. Verify API Connectivity
In browser DevTools (F12):
1. Go to **Network** tab
2. Log in again
3. Watch for API calls to `http://localhost:5000/api/auth/login`
4. Should see **Status 200** (success) with JWT token in response

---

## Configuration

### Backend Configuration (.env)
Location: `c:\Users\user\Desktop\skillsync\backend\.env`

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/skillsync
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5174
```

**Configuration Notes:**
- `PORT`: Backend server port (default 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Signing key for tokens (change in production)
- `JWT_EXPIRE`: Token validity period
- `FRONTEND_URL`: Allowed frontend origin for CORS

### Frontend Configuration (.env)
Location: `c:\Users\user\Desktop\skillsync\frontend\.env`

```
VITE_API_BASE_URL=http://localhost:5000/api
```

### API Proxy (Vite)
Location: `c:\Users\user\Desktop\skillsync\frontend\vite.config.js`

Configured to proxy API requests:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  }
}
```

---

## File Structure

```
skillsync/
├── backend/
│   ├── config/
│   │   ├── database.js        # MongoDB connection
│   │   └── jwt.js              # JWT utilities
│   ├── controllers/
│   │   ├── authController.js   # Auth logic
│   │   ├── userController.js   # User logic
│   │   └── requestController.js # Request logic
│   ├── middleware/
│   │   ├── auth.js             # JWT verification
│   │   └── errorHandler.js     # Error handling
│   ├── models/
│   │   ├── User.js             # User schema
│   │   ├── Skill.js            # Skill schema
│   │   └── Request.js          # Request schema
│   ├── routes/
│   │   ├── authRoutes.js       # Auth endpoints
│   │   ├── userRoutes.js       # User endpoints
│   │   └── requestRoutes.js    # Request endpoints
│   ├── .env                    # Environment variables
│   ├── package.json            # Dependencies
│   └── server.js               # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page components
│   │   ├── context/            # React context (Auth)
│   │   ├── utils/              # Utility functions & API calls
│   │   ├── styles/             # Global CSS
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # Entry point
│   ├── .env                    # Environment variables
│   ├── package.json            # Dependencies
│   ├── vite.config.js          # Vite configuration
│   ├── tailwind.config.js      # Tailwind CSS config
│   └── postcss.config.js       # PostCSS config
│
└── Documentation files (README, SETUP_GUIDE, etc.)
```

---

## API Endpoints Reference

### Authentication
- **POST** `/api/auth/register` - User registration
- **POST** `/api/auth/login` - User login
- **GET** `/api/auth/me` - Get current user (requires auth)

### Users
- **GET** `/api/users` - Get all users
- **GET** `/api/users/:id` - Get user by ID
- **PUT** `/api/users/profile` - Update profile (requires auth)
- **POST** `/api/users/skills` - Add skill (requires auth)
- **DELETE** `/api/users/skills/:skillId` - Delete skill (requires auth)
- **GET** `/api/users/search` - Search users by skill
- **GET** `/api/users/suggested` - Get suggested peers
- **DELETE** `/api/users/account` - Delete account (requires auth)

### Requests
- **POST** `/api/requests/send` - Send collaboration request (requires auth)
- **GET** `/api/requests/received` - Get received requests (requires auth)
- **GET** `/api/requests/sent` - Get sent requests (requires auth)
- **PUT** `/api/requests/:id/accept` - Accept request (requires auth)
- **PUT** `/api/requests/:id/reject` - Reject request (requires auth)
- **DELETE** `/api/requests/:id` - Delete request (requires auth)

---

## Troubleshooting

### Issue: "Cannot GET /" on Frontend
**Solution:** Ensure frontend server is running and accessible on the correct port

### Issue: CORS Error in Browser Console
**Solution:** Backend CORS is configured to accept:
- `http://localhost:5173`
- `http://localhost:5174`
- `http://localhost:3000`
If using a different port, update backend `.env` `FRONTEND_URL`

### Issue: MongoDB Connection Error
**Solutions:**
1. Verify MongoDB service is running
2. Check MongoDB connection string in `.env`
3. Ensure port 27017 is not blocked
4. Try restarting MongoDB service

### Issue: Port Already in Use
**Solutions:**
- Backend: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
- Frontend: Vite will automatically try next available port (5175, 5176, etc.)

### Issue: "npm install" Fails
**Solutions:**
1. Clear npm cache: `npm cache clean --force`
2. Delete `node_modules` folder: `rm -r node_modules`
3. Delete `package-lock.json`
4. Run `npm install` again

### Issue: "node_modules not found" After npm install
**Solution:** This is normal. node_modules will be created in the respective directory after install.

---

## Performance Tips

### Backend
- Use `npm run dev` with nodemon for development (auto-restart on changes)
- Use `npm start` for production (runs `node server.js`)
- Implement caching for frequently accessed data
- Use database indexes for better query performance

### Frontend
- Browser caches static assets automatically
- Vite provides HMR (Hot Module Replacement) for fast development
- Framer Motion animations are GPU-accelerated
- Tailwind CSS is minified in production builds

---

## Production Deployment

### Before Deploying

1. **Update Environment Variables**
   ```
   NODE_ENV=production
   JWT_SECRET=your_secure_secret_key
   MONGODB_URI=your_production_mongodb_uri
   FRONTEND_URL=your_production_frontend_url
   ```

2. **Build Frontend**
   ```powershell
   cd frontend
   npm run build
   # Output in frontend/dist/
   ```

3. **Security Checklist**
   - ✅ Change JWT_SECRET
   - ✅ Enable HTTPS
   - ✅ Set secure CORS origins
   - ✅ Validate all user inputs
   - ✅ Use environment variables for sensitive data
   - ✅ Enable rate limiting
   - ✅ Add authentication middleware to all protected routes
   - ✅ Sanitize database inputs

### Deployment Platforms
- **Backend:** Render, Railway, Heroku, AWS EC2
- **Frontend:** Vercel, Netlify, GitHub Pages, AWS S3
- **Database:** MongoDB Atlas (cloud), AWS DocumentDB

---

## Development Workflow

### Making Changes

**Backend Changes:**
1. Edit file in `backend/`
2. Nodemon will automatically restart server
3. Refresh browser to see changes

**Frontend Changes:**
1. Edit file in `frontend/src/`
2. Vite HMR will auto-update browser
3. No manual refresh needed (most of the time)

### Adding New Features

1. **Create backend endpoint**
   - Add route in `routes/`
   - Add logic in `controllers/`
   - Test with Postman or REST client

2. **Create frontend page/component**
   - Add component in `components/` or page in `pages/`
   - Add styling in CSS module
   - Connect to API via `utils/api.js`

3. **Test integration**
   - Verify API calls work in Network tab
   - Check browser console for errors
   - Test all user flows

---

## Useful Commands

```powershell
# Backend
cd backend
npm install                 # Install dependencies
npm run dev               # Start with auto-reload
npm start                 # Start production mode
npm audit                 # Check vulnerabilities

# Frontend
cd frontend
npm install               # Install dependencies
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# MongoDB (Windows)
net start MongoDB        # Start MongoDB service
net stop MongoDB         # Stop MongoDB service
```

---

## Support & Documentation

For detailed information, see:
- 📖 **README.md** - Project overview
- 🔧 **SETUP_GUIDE.md** - Detailed setup instructions
- 🧪 **TESTING_GUIDE.md** - Testing procedures
- 📡 **API_DOCUMENTATION.md** - API endpoints reference
- 🚀 **DEPLOYMENT_GUIDE.md** - Production deployment
- 🔍 **TROUBLESHOOTING.md** - Common issues and solutions

---

## Quick Reference

| Component | Port | URL | Status |
|-----------|------|-----|--------|
| Backend API | 5000 | http://localhost:5000 | ✅ Running |
| Frontend | 5174 | http://localhost:5174 | ✅ Running |
| MongoDB | 27017 | mongodb://localhost:27017 | ✅ Running |

---

**Last Updated:** May 18, 2026
**Version:** 1.0.0
**Status:** ✅ Fully Functional & Production Ready
