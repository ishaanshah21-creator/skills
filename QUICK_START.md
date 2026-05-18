# Quick Start Guide

Get SkillSync running in 5 minutes

## Prerequisites Check

```bash
node --version    # Should be v14+
npm --version     # Should be v6+
mongod --version  # Should show version (if using local MongoDB)
```

## Super Quick Start

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Setup Backend Environment
```bash
cp .env.example .env
```

### Step 3: Start Backend
```bash
# Make sure MongoDB is running first!
npm run dev
```
Expected output: `Server running on http://localhost:5000`

### Step 4: Install Frontend Dependencies (New Terminal)
```bash
cd frontend
npm install
```

### Step 5: Setup Frontend Environment
```bash
cp .env.example .env
```

### Step 6: Start Frontend (New Terminal)
```bash
npm run dev
```
Expected output: `Local: http://localhost:5173/`

### Step 7: Open in Browser
```
http://localhost:5173/
```

## Test It Out

### Create Account
1. Click "Get Started"
2. Fill in details:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   - College: Your College
   - Department: CSE
3. Click "Create Account"

### Login
1. Enter email: test@example.com
2. Enter password: password123
3. Click "Login"

### Explore Features
- **Dashboard**: See your profile overview
- **Profile**: Edit profile and add skills
- **Search**: Find other users
- **My Skills**: View your skills
- **Settings**: Manage account

## Common Issues

**Port Already in Use?**
```bash
# Change PORT in backend/.env to 5001
# Or kill existing process
```

**MongoDB Connection Error?**
```bash
# Start MongoDB in a terminal
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env
```

**Module Not Found?**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

## Sample Login Credentials (After Seeding)

After running `node seed.js` in backend:
- Email: priya@example.com
- Password: password123

## Next Steps

1. Read SETUP_GUIDE.md for detailed setup
2. Check API_DOCUMENTATION.md for API details
3. Review DEPLOYMENT_GUIDE.md for production
4. Explore the codebase in src/ folder

## Commands Reference

### Backend
```bash
cd backend
npm install              # Install dependencies
npm run dev            # Start development server
node seed.js           # Seed sample data
```

### Frontend
```bash
cd frontend
npm install              # Install dependencies
npm run dev            # Start development server
npm run build          # Build for production
npm run preview        # Preview production build
```

## Useful Links

- Frontend: http://localhost:5173/
- Backend API: http://localhost:5000/api
- MongoDB Compass: mongodb://localhost:27017/skillsync

## Need Help?

- Check SETUP_GUIDE.md for detailed steps
- Read API_DOCUMENTATION.md for endpoints
- Review browser console for errors (F12)
- Check terminal output for backend logs

---

**You're ready to go!** 🚀 ⚡
