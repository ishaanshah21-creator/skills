# SkillSync - Complete Setup & Installation Guide

## Prerequisites

Before starting, ensure you have the following installed on your system:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (Running locally or Atlas) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)
- **VS Code** (Recommended) - [Download](https://code.visualstudio.com/)

### Verify Installations
```bash
node --version
npm --version
mongod --version
git --version
```

---

## Step 1: MongoDB Setup (Local Development)

### Option A: MongoDB Local Server

#### Windows
1. Download MongoDB Community from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Run the installer
3. Choose "Install MongoD as a Service"
4. Complete installation
5. MongoDB will start automatically on `mongodb://localhost:27017`

#### macOS
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install -y mongodb
sudo service mongod start
```

### Verify MongoDB is Running
```bash
mongosh  # Opens MongoDB shell
db.version()  # Should show version
exit
```

---

## Step 2: Backend Setup

### 2.1 Navigate to Backend Directory
```bash
cd backend
```

### 2.2 Install Dependencies
```bash
npm install
```

This will install:
- express (Web framework)
- mongoose (MongoDB ORM)
- bcryptjs (Password hashing)
- jsonwebtoken (JWT auth)
- cors (Cross-origin requests)
- dotenv (Environment variables)
- express-validator (Input validation)
- multer (File uploads)
- nodemon (Dev auto-reload)

### 2.3 Verify .env File
Check if `.env` file exists in the backend folder with:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/skillsync
JWT_SECRET=your_jwt_secret_key_change_in_production_
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### 2.4 Seed Database (Optional - Adds Sample Data)
```bash
node seed.js
```

This creates sample users with different skills and departments for testing.

### 2.5 Start Backend Server
```bash
npm run dev
```

**Expected Output:**
```
✓ MongoDB Connected: localhost
Server running on http://localhost:5000
```

The backend is now running on `http://localhost:5000`

**Keep this terminal open** - the backend needs to run for the frontend to work.

---

## Step 3: Frontend Setup

### 3.1 Open a New Terminal and Navigate to Frontend
```bash
cd frontend
```

### 3.2 Install Dependencies
```bash
npm install
```

This will install:
- React 18
- Vite (Build tool)
- React Router DOM (Routing)
- Axios (HTTP client)
- Framer Motion (Animations)
- React Hot Toast (Notifications)
- Tailwind CSS (Styling)

### 3.3 Verify .env File
Check if `.env` file exists in the frontend folder with:
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=SkillSync
```

### 3.4 Start Frontend Development Server
```bash
npm run dev
```

**Expected Output:**
```
VITE v5.0.0  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

---

## Step 4: Access the Application

1. Open your browser
2. Navigate to **http://localhost:5173**
3. You should see the SkillSync landing page

---

## Step 5: Test the Application

### 5.1 Create an Account

1. Click **"Get Started"** button
2. Fill in the registration form:
   - **Full Name**: Your name
   - **Email**: test@example.com
   - **Password**: password123
   - **Confirm Password**: password123
   - **College**: Your College Name
   - **Department**: CSE (or your department)
3. Click **"Register"**
4. You'll be redirected to the **Dashboard**

### 5.2 Add Skills

1. Navigate to **"My Skills"** from sidebar
2. Click **"Add Skill"**
3. Fill in:
   - **Skill Name**: React (or any skill)
   - **Category**: Web Development
   - **Experience Level**: Intermediate
4. Click **"Add"**
5. Add 2-3 more skills for better testing

### 5.3 Search Users

1. Click **"Explore"** in sidebar or navbar
2. Use filters to search by:
   - **Skill**: Search by skill name
   - **Department**: Filter by department
3. Click **"Connect"** on user cards to send collaboration requests

### 5.4 Manage Requests

1. Click **"Requests"** in navbar/sidebar
2. View **"Received Requests"** tab
3. Accept or Reject requests from other users
4. View **"Sent Requests"** tab to see requests you've sent

### 5.5 View Profile

1. Click **"Profile"** in navbar/sidebar
2. Edit your profile information
3. Upload a profile picture (URL)
4. Add social links (LinkedIn, GitHub, Twitter)
5. Save changes

---

## Project Structure

```
skillsync/
│
├── backend/                    # Express.js + MongoDB
│   ├── config/
│   │   ├── database.js        # MongoDB connection
│   │   └── jwt.js             # JWT token generation
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   ├── userController.js  # User operations
│   │   └── requestController.js # Request handling
│   ├── middleware/
│   │   ├── auth.js            # JWT verification
│   │   └── errorHandler.js    # Error handling
│   ├── models/
│   │   ├── User.js            # User schema
│   │   ├── Request.js         # Request schema
│   │   └── Skill.js           # Skill schema
│   ├── routes/
│   │   ├── authRoutes.js      # Auth endpoints
│   │   ├── userRoutes.js      # User endpoints
│   │   └── requestRoutes.js   # Request endpoints
│   ├── .env                   # Environment variables
│   ├── server.js              # Express app setup
│   ├── seed.js                # Sample data
│   └── package.json
│
├── frontend/                   # React + Vite
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── UserCard.jsx
│   │   │   ├── RequestCard.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Loader.jsx
│   │   ├── context/
│   │   │   └── AuthContext.js # Authentication state
│   │   ├── pages/
│   │   │   ├── Landing.jsx    # Home page
│   │   │   ├── Login.jsx      # Login page
│   │   │   ├── Register.jsx   # Registration
│   │   │   ├── Dashboard.jsx  # Main dashboard
│   │   │   ├── Search.jsx     # User search
│   │   │   ├── Profile.jsx    # User profile
│   │   │   ├── MySkills.jsx   # Manage skills
│   │   │   ├── Requests.jsx   # Collaboration requests
│   │   │   ├── Settings.jsx   # User settings
│   │   │   ├── Chat.jsx       # Messaging
│   │   │   └── Error.jsx      # Error pages
│   │   ├── styles/
│   │   │   └── global.css     # Global styles
│   │   ├── utils/
│   │   │   └── api.js         # API configuration
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   ├── .env                   # Environment variables
│   ├── index.html             # HTML template
│   ├── vite.config.js         # Vite configuration
│   ├── tailwind.config.js     # Tailwind CSS config
│   ├── postcss.config.js      # PostCSS config
│   └── package.json
│
├── README.md                  # Project overview
├── SETUP_GUIDE.md            # This file
└── .gitignore
```

---

## Available API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login to account
- `GET /api/auth/me` - Get current user (protected)

### Users
- `GET /api/users` - Get all users (paginated)
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/search` - Search users by skill
- `GET /api/users/suggested` - Get suggested users
- `PUT /api/users/profile/update` - Update profile (protected)
- `POST /api/users/skills/add` - Add skill (protected)
- `DELETE /api/users/skills/:skillId` - Delete skill (protected)
- `DELETE /api/users/account` - Delete account (protected)

### Requests
- `POST /api/requests/send` - Send collaboration request (protected)
- `GET /api/requests` - Get received requests (protected)
- `GET /api/requests/sent` - Get sent requests (protected)
- `PUT /api/requests/:requestId/accept` - Accept request (protected)
- `PUT /api/requests/:requestId/reject` - Reject request (protected)
- `DELETE /api/requests/:requestId` - Delete request (protected)

---

## Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin support

---

## Common Issues & Solutions

### Issue: MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB is running
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo service mongod start
```

### Issue: Port 5000 Already in Use
```bash
# Kill process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### Issue: Port 5173 Already in Use
```bash
# Kill process on port 5173
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5173 | xargs kill -9
```

### Issue: CORS Error
**Solution**: Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL
```
FRONTEND_URL=http://localhost:5173
```

### Issue: npm install failures
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

## Building for Production

### Frontend Build
```bash
cd frontend
npm run build
```

This creates an optimized `dist` folder ready for deployment.

### Backend Deployment
- Deploy to platforms like Heroku, Railway, or AWS
- Update environment variables for production
- Use MongoDB Atlas for cloud database
- Ensure JWT_SECRET is a strong, random value

---

## Performance Tips

1. **Use MongoDB Indexing**: Index frequently searched fields
2. **Implement Caching**: Cache user searches and profiles
3. **Optimize Images**: Compress profile pictures
4. **Code Splitting**: React Router enables route-based splitting
5. **Database Queries**: Use lean() in Mongoose for read-only operations

---

## Security Considerations

1. **Never commit .env files**
2. **Use strong JWT_SECRET** in production
3. **Validate all inputs** on backend
4. **Use HTTPS** in production
5. **Implement rate limiting** for API endpoints
6. **Sanitize user inputs** to prevent XSS attacks
7. **Use CORS** carefully - whitelist only trusted domains

---

## Troubleshooting Checklist

- [ ] Node.js and npm are installed
- [ ] MongoDB is running locally or connected via Atlas
- [ ] Backend .env file is configured correctly
- [ ] Frontend .env file is configured correctly
- [ ] Backend dependencies are installed (`npm install` in backend/)
- [ ] Frontend dependencies are installed (`npm install` in frontend/)
- [ ] No ports are in use (5000 and 5173)
- [ ] Backend is running (`npm run dev` in backend/)
- [ ] Frontend is running (`npm run dev` in frontend/)
- [ ] Browser is open to `http://localhost:5173`

---

## Next Steps

After successful setup:

1. **Explore the Application**: Test all features (register, search, requests)
2. **Review Code**: Understand the architecture and patterns used
3. **Customize**: Update colors, fonts, and branding
4. **Add Features**: Implement messaging, notifications, or recommendations
5. **Deploy**: Host on Vercel (frontend) and Heroku (backend)

---

## Support & Resources

- **MongoDB Docs**: https://docs.mongodb.com/
- **Express.js Docs**: https://expressjs.com/
- **React Docs**: https://react.dev/
- **Vite Docs**: https://vitejs.dev/
- **Tailwind CSS**: https://tailwindcss.com/

---

## License

This project is open source and available under the ISC License.

---

**Happy Coding! 🚀**
