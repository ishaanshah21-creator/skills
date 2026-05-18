# 🚀 START HERE - SkillSync Setup Guide

**Welcome to SkillSync!** This is the complete peer learning platform for students.

> **Total Setup Time**: ~10 minutes | **Difficulty**: Easy | **Requirements**: Node.js, MongoDB

---

## 📋 Quick Choose Your Path

### ⚡ Super Quick (5 min) - Just Show Me Working!
→ Go to [QUICK_START.md](./QUICK_START.md)

### 📖 Detailed Setup (10 min) - Step by Step
→ Go to [INSTALLATION_CHECKLIST.md](./INSTALLATION_CHECKLIST.md)

### 🔍 Comprehensive Setup (20 min) - Everything Explained
→ Go to [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)

### 🐛 Troubleshooting - Something Went Wrong?
→ Go to [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## ✅ Pre-Setup Checklist

**Before starting, ensure you have:**

- [ ] **Node.js v14+** installed
  ```bash
  node --version
  ```
  👉 [Download Node.js](https://nodejs.org/)

- [ ] **MongoDB running locally**
  ```bash
  mongosh  # Should connect
  exit
  ```
  👉 [Setup MongoDB](./SETUP_INSTRUCTIONS.md#mongodb-setup-instructions)

- [ ] **Git installed**
  ```bash
  git --version
  ```
  👉 [Download Git](https://git-scm.com/)

- [ ] **This folder**: `c:\Users\user\Desktop\skillsync`

**Not ready?** → Complete the above first, then come back.

---

## 🎯 The 3-Minute Version

```bash
# Terminal 1: Start Backend
cd backend
npm install
npm run dev
# Wait for: "Server running on http://localhost:5000"

# Terminal 2: Seed Data (Optional)
cd backend
node seed.js

# Terminal 3: Start Frontend
cd frontend
npm install  
npm run dev
# Wait for: "Local: http://localhost:5173/"

# Browser: Open http://localhost:5173
```

**Done!** You're running SkillSync. Now:
1. Click "Get Started"
2. Register with test account
3. Try all features!

---

## 📂 What You're Getting

### Frontend (React + Tailwind)
- Beautiful, modern UI
- Works on Mobile/Tablet/Desktop
- 11 fully functional pages
- Smooth animations

### Backend (Express + MongoDB)
- Production-ready REST API
- 15+ endpoints
- JWT authentication
- Complete database

### Documentation
- Setup guides ✅
- API reference ✅
- Deployment guide ✅
- Troubleshooting ✅

---

## 🎓 What's Included

### Pages
- Landing (Home with features)
- Register/Login (Authentication)
- Dashboard (Main hub)
- Search (Find peers by skills)
- Profile (Edit your info)
- My Skills (Manage skills)
- Requests (Manage connections)
- Settings (Account settings)
- Chat (Messaging interface)
- Error pages (404, 401)

### Features
- User authentication with JWT
- Skill management
- User search and filtering
- Collaboration requests
- Connection tracking
- Responsive design
- Toast notifications
- Error handling

---

## 🚦 Getting Started (Choose One)

### Option A: Just Want It Running?
**Time: 5 minutes**
```
1. Read: QUICK_START.md
2. Follow: 6 simple steps
3. Open: http://localhost:5173
4. Done!
```

### Option B: Want Understanding?
**Time: 10-15 minutes**
```
1. Read: INSTALLATION_CHECKLIST.md
2. Follow: Each phase with explanations
3. Test: All features
4. Understand: How it works
```

### Option C: Want Everything?
**Time: 30-45 minutes**
```
1. Read: SETUP_INSTRUCTIONS.md (comprehensive)
2. Review: API_DOCUMENTATION.md
3. Study: PROJECT_SUMMARY.md
4. Explore: All code files
```

---

## 🔧 Troubleshooting Quick Links

| Problem | Solution |
|---------|----------|
| "MongoDB not connecting" | [Setup MongoDB](./SETUP_INSTRUCTIONS.md#mongodb-setup-instructions) |
| "Port 5000 in use" | [Kill process](./TROUBLESHOOTING.md#port-already-in-use) |
| "npm install fails" | [Fix dependencies](./TROUBLESHOOTING.md#npm-install-fails) |
| "CORS errors" | [Fix CORS](./TROUBLESHOOTING.md#cors-errors) |
| "Can't login" | [Auth issues](./TROUBLESHOOTING.md#backend-issues) |
| "Pages not loading" | [Frontend issues](./TROUBLESHOOTING.md#frontend-issues) |

👉 Full troubleshooting guide: [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## 📚 Documentation Map

```
START.md (you are here)
  ↓
Choose your path:
  ├→ QUICK_START.md (5 min)
  ├→ INSTALLATION_CHECKLIST.md (10 min, detailed)
  ├→ SETUP_INSTRUCTIONS.md (20 min, comprehensive)
  │
After setup, explore:
  ├→ README.md (Project overview)
  ├→ API_DOCUMENTATION.md (API reference)
  ├→ PROJECT_SUMMARY.md (Architecture)
  ├→ DEPLOYMENT_GUIDE.md (Production)
  ├→ TESTING_GUIDE.md (Test procedures)
  └→ TROUBLESHOOTING.md (Problems?)
```

---

## ⭐ Key Points

1. **Backend and Frontend run separately** on ports 5000 and 5173
2. **Keep both terminals open** while developing
3. **Use seeded data** for immediate testing
4. **Check browser console** (F12) if issues occur
5. **Restart servers** if changes don't reflect

---

## 🎯 Next Steps

After getting it running:

1. **Explore**: Test all pages and features
2. **Understand**: Read PROJECT_SUMMARY.md for architecture
3. **Customize**: Change colors, add features
4. **Deploy**: Follow DEPLOYMENT_GUIDE.md
5. **Learn**: Review code to understand patterns

---

## 🎓 This Project Teaches You

✅ Full-stack web development  
✅ React hooks and Context API  
✅ Express.js REST APIs  
✅ MongoDB database design  
✅ JWT authentication  
✅ Responsive design with Tailwind  
✅ Component architecture  
✅ Error handling & validation  

Perfect for explaining in interviews and viva! 🎤

---

## 🚀 Quick Summary

| What | When |
|------|------|
| Prerequisites (Node, MongoDB) | 5 min (first time) |
| Backend setup | 3 min |
| Frontend setup | 3 min |
| Testing features | 2 min |
| **Total** | **~10 min** |

---

## ❓ Still Deciding?

**Pick based on your style:**

- 🏃 Impatient? → [QUICK_START.md](./QUICK_START.md)
- 👨‍🏫 Learner? → [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)  
- ✅ Detail-oriented? → [INSTALLATION_CHECKLIST.md](./INSTALLATION_CHECKLIST.md)
- 🐛 Troubleshooting? → [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## 🎉 Ready?

**Let's go!** Choose your path above and follow the steps.

Your fully functional peer learning platform awaits! 🚀

---

## 📞 Quick Reference

**Ports**
- Backend: http://localhost:5000
- Frontend: http://localhost:5173
- MongoDB: localhost:27017

**Commands**
- Backend: `cd backend && npm run dev`
- Frontend: `cd frontend && npm run dev`
- Seed DB: `cd backend && node seed.js`

**Files**
- Backend .env: `backend/.env`
- Frontend .env: `frontend/.env`

---

**Happy Coding! 💻**

👉 **Start with**: [QUICK_START.md](./QUICK_START.md) or [INSTALLATION_CHECKLIST.md](./INSTALLATION_CHECKLIST.md)
