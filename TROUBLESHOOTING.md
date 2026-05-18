# Troubleshooting Guide

Common issues and solutions

## Installation Issues

### npm install fails

**Problem**: `npm ERR! ERESOLVE unable to resolve dependency tree`

**Solution**:
```bash
# Use legacy dependency resolution
npm install --legacy-peer-deps

# Or upgrade npm
npm install -g npm@latest
npm install
```

### Node version compatibility

**Problem**: `engines.node: wanted {"node":">=14.0.0"}`

**Solution**:
```bash
# Check your Node version
node --version

# Download appropriate version from nodejs.org
# Or use nvm (Node Version Manager)
nvm install 18
nvm use 18
```

---

## Backend Issues

### MongoDB Connection Error

**Error**: `MongoError: connect ECONNREFUSED 127.0.0.1:27017`

**Solution**:
```bash
# Start MongoDB
mongod

# On Mac:
brew services start mongodb-community

# On Windows:
# Start MongoDB from Services or as application

# Or use MongoDB Atlas (cloud)
# Update .env: MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/skillsync
```

### JWT_SECRET not set

**Error**: `TypeError: jwt.sign called with secret but undefined is used`

**Solution**:
```bash
# Add to backend/.env
JWT_SECRET=your_secret_key_here_at_least_32_characters
```

### Port Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Windows - Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>

# Or change port in .env
PORT=5001
```

### CORS Errors

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
```bash
# Check backend/.env has correct FRONTEND_URL
FRONTEND_URL=http://localhost:5173

# Restart backend server
npm run dev
```

### Cannot find module

**Error**: `Cannot find module 'express'`

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Server crashes on startup

**Error**: `Error: connect ECONNREFUSED` or server exits

**Solution**:
```bash
# Check all environment variables are set
cat .env

# Make sure MongoDB is running
# Check for syntax errors in server.js
node -c server.js

# Run with verbose output
npm run dev

# Check logs for actual error
```

---

## Frontend Issues

### Module not found

**Error**: `[vite] failed to resolve import`

**Solution**:
```bash
# Check file path is correct
# Reinstall dependencies
rm -rf node_modules
npm install
```

### API URL Configuration

**Error**: `404 Not Found` when making API calls

**Solution**:
```bash
# Check frontend/.env
cat .env

# Should have:
VITE_API_URL=http://localhost:5000/api

# Restart frontend
npm run dev
```

### Blank Page or Spinner

**Error**: Page shows loading spinner indefinitely

**Solution**:
1. Open browser DevTools (F12)
2. Check Network tab for API errors
3. Check Console tab for JavaScript errors
4. Verify backend is running: `curl http://localhost:5000/api/users`
5. Check CORS settings

### Login Not Working

**Error**: Login button doesn't work or shows error

**Solution**:
```bash
# Check user exists in database
# Register new user first

# Or seed sample data
cd backend
node seed.js

# Try login with: priya@example.com / password123
```

### Styles Not Loading

**Error**: Page looks unstyled/ugly

**Solution**:
```bash
# CSS Modules issue - check import
import styles from './ComponentName.module.css'

# Clear browser cache
# Ctrl+Shift+R (hard refresh)
# Or clear browser cache manually
```

### Hot Module Reload Not Working

**Error**: Changes don't reflect when saving files

**Solution**:
```bash
# Stop frontend server
# Delete .vite cache
rm -rf node_modules/.vite

# Restart
npm run dev
```

---

## Database Issues

### MongoDB Atlas Connection

**Error**: `MongoError: connect ECONNREFUSED` or timeout

**Solution**:
1. Check connection string in .env
2. Verify IP whitelist in MongoDB Atlas
3. Go to Security → Network Access
4. Add your IP: `Add Current IP Address`
5. Or allow all: `0.0.0.0/0` (development only)

### Database is Empty

**Error**: Queries return no results

**Solution**:
```bash
# Seed sample data
cd backend
node seed.js

# Or manually add user via API
POST /api/auth/register
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "college": "Test College",
  "department": "CSE"
}
```

### Cannot Drop Database

**Error**: `DropError: authorization error` or similar

**Solution**:
```bash
# In MongoDB shell
use skillsync
db.dropDatabase()

# Or just insert new data (will auto-create)
```

---

## API Issues

### 401 Unauthorized

**Error**: API returns 401 for protected routes

**Solution**:
```bash
# Login first to get token
# Token should be automatically set in localStorage
# Check browser localStorage (DevTools → Application → LocalStorage)

# Or manually set Authorization header:
Authorization: Bearer <token>
```

### 400 Bad Request

**Error**: API returns validation error

**Solution**:
1. Check request body matches expected format
2. Verify all required fields are present
3. Check data types (string, number, etc.)
4. Review API documentation

### 500 Server Error

**Error**: Backend returns internal server error

**Solution**:
1. Check backend logs in terminal
2. Look for actual error message
3. Verify MongoDB connection
4. Check for syntax errors in code

---

## Performance Issues

### Frontend Slow

**Error**: UI feels sluggish, animations stutter

**Solution**:
```bash
# Check DevTools Performance tab
# Reduce Framer Motion animation complexity
# Build for production and test
npm run build
npm run preview
```

### Backend Slow

**Error**: API calls take long time

**Solution**:
1. Check network tab for actual response time
2. Monitor MongoDB query performance
3. Add database indexes
4. Check for large data responses
5. Implement pagination for lists

### High Memory Usage

**Solution**:
```bash
# Check for memory leaks
# Restart services

# Monitor usage
# Windows Task Manager
# Mac Activity Monitor
# Linux: top or htop
```

---

## Network Issues

### Cannot Reach Backend

**Error**: Frontend can't connect to backend

**Solution**:
```bash
# Test backend is running
curl http://localhost:5000/api/users

# Check firewall
# Windows: Check Windows Defender Firewall
# Mac: System Preferences → Security & Privacy

# Check if port is open
netstat -an | grep 5000
```

### CORS Error Despite Configuration

**Error**: Still getting CORS errors

**Solution**:
```bash
# Backend .env should have:
FRONTEND_URL=http://localhost:5173

# Make sure to restart backend after changing .env
# Don't just refresh - kill and restart

npm run dev
```

---

## Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| `Cannot find module` | Missing dependency | `npm install` |
| `MongoError connect ECONNREFUSED` | MongoDB not running | Start `mongod` |
| `Port already in use` | Service running on port | Kill process or change port |
| `CORS policy blocked` | CORS not configured | Check CORS settings |
| `404 Not Found` | Wrong URL or endpoint | Check URL spelling |
| `401 Unauthorized` | Missing/invalid token | Login first |
| `500 Server Error` | Backend error | Check server logs |
| `ENOTFOUND localhost` | DNS issue | Use 127.0.0.1 instead |
| `Cannot set headers after sent` | Middleware issue | Check middleware order |
| `jwt malformed` | Invalid token format | Clear localStorage and login |

---

## Debug Commands

### Check if Services Running

```bash
# Backend
curl http://localhost:5000

# Frontend  
curl http://localhost:5173

# MongoDB
netstat -an | grep 27017
```

### View Logs

```bash
# Backend logs (in terminal running npm run dev)
# Frontend logs (in browser console - F12)

# MongoDB logs
# Mac: /usr/local/var/log/mongodb/mongo.log
# Linux: /var/log/mongodb/mongod.log
```

### Database Inspection

```bash
# Connect to MongoDB
mongosh

# Show databases
show databases

# Use skillsync database
use skillsync

# Show collections
show collections

# View all users
db.users.find()

# Count documents
db.users.countDocuments()
```

### Network Debugging

```bash
# Check port is listening
netstat -an | grep LISTEN

# Check specific port
lsof -i :5000

# Monitor network traffic
# Use DevTools Network tab (F12)
# Or use: tcpdump (advanced)
```

---

## Still Having Issues?

1. **Check All Documentation**
   - README.md
   - SETUP_GUIDE.md
   - API_DOCUMENTATION.md
   - PROJECT_SUMMARY.md

2. **Review Browser Console**
   - Open DevTools (F12)
   - Check Console tab for JavaScript errors
   - Check Network tab for API failures

3. **Check Terminal Output**
   - Backend terminal should show request logs
   - Look for error stack traces
   - Check middleware logs

4. **Restart Everything**
   - Kill both frontend and backend
   - Restart MongoDB
   - Clear browser cache
   - Restart development servers

5. **Verify Configuration**
   - Check .env files
   - Verify connection strings
   - Verify ports are correct
   - Verify API URLs

6. **Clean Reinstall**
   ```bash
   # Backend
   rm -rf node_modules package-lock.json
   npm install
   npm run dev

   # Frontend
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

---

## Getting Help

When reporting issues, include:
1. Error message (exact text)
2. What you were doing when error occurred
3. Terminal/console output
4. Operating system and Node version
5. Steps to reproduce

---

**Last Updated**: January 2026

**Still stuck?** - Restart your services and try again! 🚀
