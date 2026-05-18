# Setup & Installation Guide

## Complete Step-by-Step Setup Instructions

### Step 1: Prerequisites

Make sure you have the following installed:

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **MongoDB**
   - **Option A**: Local installation - https://docs.mongodb.com/manual/installation/
   - **Option B**: MongoDB Atlas (Cloud) - https://www.mongodb.com/cloud/atlas
   - Verify: `mongod --version`

3. **Git** (optional but recommended)
   - Download from: https://git-scm.com/

### Step 2: Clone or Download Project

```bash
# Clone if using git
git clone <repository-url>
cd skillsync

# Or extract if downloaded as zip
cd skillsync
```

### Step 3: Backend Setup

#### 3.1 Install Backend Dependencies

```bash
cd backend
npm install
```

Expected packages to install:
- express (web framework)
- mongoose (database ORM)
- jsonwebtoken (JWT auth)
- bcrypt (password hashing)
- cors (cross-origin requests)
- dotenv (environment variables)
- express-validator (input validation)

#### 3.2 Configure Environment Variables

```bash
# Copy example file
cp .env.example .env

# Open .env in your text editor and fill in:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skillsync
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**MongoDB Connection String Options:**

**Local MongoDB:**
```
MONGODB_URI=mongodb://localhost:27017/skillsync
```

**MongoDB Atlas (Cloud):**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skillsync?retryWrites=true&w=majority
```

#### 3.3 Start MongoDB

**If using local MongoDB:**
```bash
# On Windows
mongod

# On Mac/Linux
mongod --config /usr/local/etc/mongod.conf
```

**If using MongoDB Atlas:**
- No action needed, it's cloud-hosted

#### 3.4 Start Backend Server

```bash
# From backend directory
npm run dev

# Output should show:
# Server running on http://localhost:5000
# MongoDB Connected: localhost
```

### Step 4: Frontend Setup

#### 4.1 Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

Expected packages:
- react & react-dom
- react-router-dom (routing)
- axios (HTTP client)
- framer-motion (animations)
- react-hot-toast (notifications)
- vite (build tool)

#### 4.2 Configure Environment Variables

```bash
# Copy example file
cp .env.example .env

# Content should be:
VITE_API_URL=http://localhost:5000/api
```

#### 4.3 Start Development Server

```bash
# From frontend directory
npm run dev

# Output should show:
# Local: http://localhost:5173/
```

### Step 5: Verify Setup

1. **Open browser and navigate to**: `http://localhost:5173/`
2. **You should see**: SkillSync landing page
3. **Test registration**: Click "Get Started" and create an account
4. **Test API**: 
   - Check browser console for any errors
   - Go to Settings (⚙️) and verify data is loading

## Troubleshooting

### Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Find and kill process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>

# Or use different port in .env
PORT=5001
```

### MongoDB Connection Error

**Problem**: `MongoError: connect ECONNREFUSED`

**Solution**:
1. Make sure MongoDB is running: `mongod` command
2. Check connection string in .env
3. If using Atlas, verify:
   - Network access is allowed
   - Connection string is correct
   - Username/password are correct

### API Not Responding

**Problem**: Frontend shows "Failed to fetch"

**Solution**:
1. Verify backend is running: `http://localhost:5000/health`
2. Check CORS is enabled in backend
3. Verify API URL in frontend .env
4. Check browser console for actual error message

### Module Not Found Error

**Problem**: `Cannot find module 'express'`

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

## File Structure After Setup

```
skillsync/
├── backend/
│   ├── node_modules/          # Installed packages
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   ├── .env                   # Created from .env.example
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   ├── node_modules/          # Installed packages
│   ├── src/
│   ├── dist/                  # Created after build
│   ├── index.html
│   ├── vite.config.js
│   ├── .env                   # Created from .env.example
│   ├── .gitignore
│   └── package.json
│
└── README.md
```

## Testing the Application

### Test Register Flow
1. Go to `http://localhost:5173/register`
2. Fill in details:
   - Name: John Doe
   - Email: john@example.com
   - Password: password123
   - College: IIIT Delhi
   - Department: CSE
3. Click "Create Account"
4. Should redirect to login page

### Test Login Flow
1. Go to `http://localhost:5173/login`
2. Enter:
   - Email: john@example.com
   - Password: password123
3. Click "Login"
4. Should redirect to dashboard

### Test Profile
1. After login, click "Profile" in sidebar
2. View and edit profile information
3. Add a skill:
   - Skill Name: React
   - Category: Web Development
   - Level: Intermediate
4. Verify skill appears in list

### Test Search
1. Click "Search Users" in sidebar
2. Enter a skill name
3. Click "Search"
4. View results

## Development Tools

### Recommended VS Code Extensions
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- Thunder Client / REST Client (for API testing)
- MongoDB for VS Code

### API Testing Tools
- **Postman**: https://www.postman.com/
- **Thunder Client**: VS Code extension
- **curl**: Command line tool

### Sample curl Commands

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123","college":"IIIT","department":"CSE"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'

# Get all users
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer <token>"
```

## Database Seeding (Optional)

To populate the database with sample data:

```bash
cd backend

# Create a seed script and run it
node seed.js
```

This will create sample users with various skills for testing.

## Next Steps

1. ✅ Setup complete!
2. Explore the application
3. Try all features
4. Check console logs for API calls
5. Review API endpoints in backend
6. Read API_DOCUMENTATION.md for detailed API info

## Production Deployment

For production setup, see DEPLOYMENT_GUIDE.md

---

**Need Help?** Check the README.md or create an issue in the repository.
