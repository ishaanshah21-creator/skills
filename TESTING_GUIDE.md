# SkillSync Testing Guide

Complete testing procedures for SkillSync application

## Test Environment Setup

### Prerequisites
- Both backend and frontend servers running
- MongoDB with sample data (run `node seed.js`)
- Browser with DevTools (F12)

### Sample Login Credentials (After Seeding)
```
Email: priya@example.com
Password: password123
```

---

## 1. Authentication Testing

### 1.1 User Registration

**Test Case**: Register new user

**Steps**:
1. Navigate to `http://localhost:5173/register`
2. Fill form:
   - Name: John Doe
   - Email: john.doe@example.com
   - Password: password123
   - Confirm Password: password123
   - College: IIIT Delhi
   - Department: CSE
3. Click "Create Account"

**Expected Result**:
- ✓ Success toast notification
- ✓ Redirect to login page
- ✓ User created in database

**Verification**:
```bash
# In MongoDB shell
db.users.findOne({ email: "john.doe@example.com" })
```

### 1.2 User Login

**Test Case**: Login with valid credentials

**Steps**:
1. Navigate to `http://localhost:5173/login`
2. Enter credentials:
   - Email: priya@example.com
   - Password: password123
3. Click "Login"

**Expected Result**:
- ✓ Success toast: "Login successful"
- ✓ Redirect to dashboard
- ✓ User name displayed in navbar
- ✓ Token stored in localStorage

**Verification**:
```javascript
// In browser console
localStorage.getItem('token')
localStorage.getItem('user')
```

### 1.3 Login with Invalid Credentials

**Test Case**: Attempt login with wrong password

**Steps**:
1. Navigate to login page
2. Enter:
   - Email: priya@example.com
   - Password: wrongpassword
3. Click "Login"

**Expected Result**:
- ✓ Error toast: "Invalid email or password"
- ✓ Remain on login page
- ✓ No token stored

### 1.4 Protected Route Access

**Test Case**: Access protected route without login

**Steps**:
1. Clear localStorage (DevTools → Application → LocalStorage)
2. Navigate to `http://localhost:5173/dashboard`

**Expected Result**:
- ✓ Redirect to login page
- ✓ Cannot access protected routes

### 1.5 Logout

**Test Case**: User logout

**Steps**:
1. Login to application
2. Navigate to Settings
3. Click "Logout" button (or click profile avatar → Logout)

**Expected Result**:
- ✓ Token cleared from localStorage
- ✓ Redirect to landing page
- ✓ Cannot access dashboard

---

## 2. User Profile Testing

### 2.1 View Profile

**Test Case**: View user profile

**Steps**:
1. Login as priya@example.com
2. Click "Profile" in sidebar or navbar

**Expected Result**:
- ✓ Profile page loads
- ✓ User information displayed correctly
- ✓ Skills listed with category and level

### 2.2 Edit Profile

**Test Case**: Update user profile

**Steps**:
1. Go to Profile page
2. Click "Edit" button
3. Update fields:
   - Name: New Name
   - Bio: Updated bio
   - College: New College
4. Click "Save Changes"

**Expected Result**:
- ✓ Success toast: "Profile updated successfully"
- ✓ Changes reflected immediately
- ✓ Data persisted in database

### 2.3 Add Skill

**Test Case**: Add new skill

**Steps**:
1. On Profile page, click "Add Skill" button
2. Fill modal form:
   - Skill Name: React
   - Category: Web Development
   - Experience Level: Intermediate
3. Click "Add"

**Expected Result**:
- ✓ Modal closes
- ✓ Skill added to list
- ✓ Success notification shown
- ✓ Skill visible in MySkills page

### 2.4 Delete Skill

**Test Case**: Remove skill

**Steps**:
1. On Profile page, hover over skill
2. Click delete/trash icon

**Expected Result**:
- ✓ Skill removed from list
- ✓ Success notification
- ✓ Removed from database

### 2.5 Update Social Links

**Test Case**: Add social media links

**Steps**:
1. Click Edit on profile
2. Update social links:
   - LinkedIn: https://linkedin.com/in/username
   - GitHub: https://github.com/username
   - Twitter: https://twitter.com/username
3. Save

**Expected Result**:
- ✓ Links saved and displayed with icons
- ✓ Links are clickable in view mode

---

## 3. Search & Discovery Testing

### 3.1 Search Users by Skill

**Test Case**: Search for users with specific skill

**Steps**:
1. Go to "Search Users" page
2. Enter skill: "React"
3. Click "Search"

**Expected Result**:
- ✓ Results display users with React skill
- ✓ Relevant users appear in grid
- ✓ Result count shown

### 3.2 Filter by Department

**Test Case**: Filter search results by department

**Steps**:
1. On Search page
2. Select Department: CSE
3. Enter Skill: Python
4. Click Search

**Expected Result**:
- ✓ Results filtered by department AND skill
- ✓ Only CSE students with Python appear

### 3.3 Suggested Users

**Test Case**: View suggested users on dashboard

**Steps**:
1. Go to Dashboard
2. Scroll to "Suggested Peers" section

**Expected Result**:
- ✓ Shows 5-6 random users
- ✓ Different users on page refresh
- ✓ User cards show profile info and skills

---

## 4. Request Management Testing

### 4.1 Send Connection Request

**Test Case**: Send request to another user

**Steps**:
1. Go to Search Users or Dashboard
2. Click "Connect" button on user card
3. Fill request form:
   - Skill: React
   - Message: I'd like to learn React from you
4. Click "Send"

**Expected Result**:
- ✓ Success toast: "Request sent successfully"
- ✓ Button changes to "✓ Connected"
- ✓ Request appears in "Sent Requests"

**Verification**:
- Receiver sees it in "Received Requests"

### 4.2 View Received Requests

**Test Case**: View and manage incoming requests

**Steps**:
1. Go to "Requests" page
2. Click "📥 Received" tab

**Expected Result**:
- ✓ Shows all pending requests
- ✓ Shows count of pending requests
- ✓ Displays request details:
  - Sender info
  - Skill requested
  - Message
  - Date/time

### 4.3 Accept Request

**Test Case**: Accept connection request

**Steps**:
1. On Requests page (Received tab)
2. Click "✓ Accept" on request card

**Expected Result**:
- ✓ Request status changes to "accepted"
- ✓ Both users added as connections
- ✓ Button disabled or request disappears

### 4.4 Reject Request

**Test Case**: Reject connection request

**Steps**:
1. On Requests page (Received tab)
2. Click "✗ Reject" on request card

**Expected Result**:
- ✓ Request status changes to "rejected"
- ✓ Request removed from pending list
- ✓ Can still view in history

### 4.5 View Sent Requests

**Test Case**: Track outgoing requests

**Steps**:
1. Go to Requests page
2. Click "📤 Sent" tab

**Expected Result**:
- ✓ Shows all requests sent by user
- ✓ Shows status (pending, accepted, rejected)
- ✓ Can delete sent requests

---

## 5. Dashboard Testing

### 5.1 Dashboard Load

**Test Case**: Dashboard displays correctly

**Steps**:
1. Login to application
2. Navigate to dashboard

**Expected Result**:
- ✓ Welcome banner with user name
- ✓ Stats cards show:
  - Number of skills
  - Pending requests count
  - Connections count
- ✓ Quick action cards display
- ✓ Suggested users appear
- ✓ No console errors

### 5.2 Dashboard Stats Update

**Test Case**: Stats update after actions

**Steps**:
1. On dashboard, note skill count
2. Go to profile and add skill
3. Return to dashboard

**Expected Result**:
- ✓ Skill count increased
- ✓ Stats reflect changes in real-time

### 5.3 Quick Actions

**Test Case**: Quick action cards work

**Steps**:
1. On dashboard, click each quick action card:
   - "Manage Skills" → Profile page
   - "Search Users" → Search page
   - "Edit Profile" → Profile page
   - "View Requests" → Requests page

**Expected Result**:
- ✓ Each button navigates correctly
- ✓ Navigation smooth

---

## 6. Settings Testing

### 6.1 Account Settings

**Test Case**: View account information

**Steps**:
1. Go to Settings page
2. Click "Account" tab

**Expected Result**:
- ✓ Shows email (read-only)
- ✓ Shows name
- ✓ Shows college
- ✓ Shows department

### 6.2 Privacy Settings

**Test Case**: Manage privacy options

**Steps**:
1. Go to Settings → Privacy tab
2. Toggle options:
   - Public Profile
   - Show Skills
   - Receive Requests
   - Email Notifications

**Expected Result**:
- ✓ Toggles work
- ✓ Settings saved
- ✓ Changes reflected immediately

### 6.3 Account Deletion

**Test Case**: Delete user account

**Steps**:
1. Go to Settings → Danger Zone
2. Click "Delete My Account"
3. Confirm password
4. Click "Delete"

**Expected Result**:
- ✓ Confirmation dialog appears
- ✓ Requires password confirmation
- ✓ After deletion:
  - User redirected to home
  - Account removed from database
  - Cannot login with credentials

---

## 7. UI & Responsive Design Testing

### 7.1 Desktop View (1920x1080)

**Test Case**: Layout looks good on desktop

**Steps**:
1. Set browser to 1920x1080
2. Navigate through all pages

**Expected Result**:
- ✓ Content properly spaced
- ✓ Two-column layouts when applicable
- ✓ Sidebar visible
- ✓ All elements centered correctly

### 7.2 Tablet View (768x1024)

**Test Case**: Layout responsive on tablet

**Steps**:
1. DevTools → Toggle device toolbar → iPad
2. Navigate through pages

**Expected Result**:
- ✓ Sidebar becomes hamburger menu
- ✓ Grid adjusts to 2 columns
- ✓ All content readable
- ✓ Buttons clickable

### 7.3 Mobile View (375x812)

**Test Case**: Layout responsive on mobile

**Steps**:
1. DevTools → Toggle device toolbar → iPhone
2. Navigate all pages

**Expected Result**:
- ✓ Single column layout
- ✓ Hamburger menu for navigation
- ✓ Buttons full width
- ✓ Text readable without zoom
- ✓ Touch-friendly spacing

### 7.4 Animations

**Test Case**: Animations work smoothly

**Steps**:
1. Navigate to pages
2. Observe animations:
   - Page transitions
   - Button hovers
   - Card entrances
   - Modal pop-ups

**Expected Result**:
- ✓ Smooth 60fps animations
- ✓ No jank or stuttering
- ✓ Quick animations (< 500ms)
- ✓ Animations don't distract

---

## 8. API Testing

### 8.1 API Endpoints

**Test Case**: Test key API endpoints

**Using curl**:
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"pass123","college":"IIIT","department":"CSE"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"priya@example.com","password":"password123"}'

# Get users
TOKEN=<your-token>
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer $TOKEN"

# Search users
curl -X GET "http://localhost:5000/api/users/search?skill=React" \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Result**:
- ✓ All endpoints return expected responses
- ✓ Status codes correct (200, 201, 400, 401, etc.)
- ✓ Response format matches documentation

### 8.2 Error Handling

**Test Case**: API error handling

**Steps**:
```bash
# Missing token
curl -X GET http://localhost:5000/api/users

# Invalid token
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer invalid-token"

# Missing required field
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test"}'
```

**Expected Result**:
- ✓ 401 for missing/invalid token
- ✓ 400 for validation errors
- ✓ Error messages are clear
- ✓ No sensitive data in errors

---

## 9. Performance Testing

### 9.1 Page Load Time

**Test Case**: Measure page load times

**Steps**:
1. DevTools → Network tab
2. Load each page and check:
   - DOM content loaded time
   - Full page load time
   - No. of requests
   - Total size

**Expected Result**:
- ✓ Initial page load < 2s
- ✓ Navigation < 500ms
- ✓ Asset sizes optimized
- ✓ No unnecessary requests

### 9.2 Search Performance

**Test Case**: Large dataset search

**Steps**:
1. Seed database with many users
2. Perform search with filters
3. Check response time

**Expected Result**:
- ✓ Search completes in < 1s
- ✓ Pagination works smoothly
- ✓ No UI freezing

---

## 10. Security Testing

### 10.1 Password Security

**Test Case**: Password security

**Steps**:
1. Check password in MongoDB
   ```bash
   db.users.findOne({ email: "priya@example.com" }).password
   ```

**Expected Result**:
- ✓ Password is hashed (not plain text)
- ✓ Hashes start with $2a$ or $2b$ (bcrypt)

### 10.2 Token Expiry

**Test Case**: JWT token expiry

**Steps**:
1. Get token and inspect:
   ```javascript
   // In browser console
   const token = localStorage.getItem('token');
   const decoded = atob(token.split('.')[1]);
   console.log(JSON.parse(decoded));
   ```

**Expected Result**:
- ✓ Token has 'exp' field
- ✓ Expiry is 7 days (604800 seconds)

### 10.3 CORS Protection

**Test Case**: CORS is configured

**Steps**:
1. Try request from different origin
2. Check response headers

**Expected Result**:
- ✓ Only allowed origins get response
- ✓ Proper Access-Control headers

---

## Test Checklist

### Authentication ✓
- [ ] Registration works
- [ ] Login works
- [ ] Logout works
- [ ] Protected routes are protected
- [ ] Token stored in localStorage

### User Management ✓
- [ ] Profile loads
- [ ] Profile updates
- [ ] Skills can be added
- [ ] Skills can be deleted
- [ ] Social links update

### Discovery ✓
- [ ] Search by skill works
- [ ] Filter by department works
- [ ] Suggestions appear
- [ ] User cards display correctly

### Requests ✓
- [ ] Can send request
- [ ] Can accept request
- [ ] Can reject request
- [ ] Can view sent requests
- [ ] Can view received requests

### Dashboard ✓
- [ ] Dashboard loads
- [ ] Stats display
- [ ] Stats update
- [ ] Quick actions work

### Settings ✓
- [ ] Account settings view
- [ ] Privacy settings work
- [ ] Account deletion works

### UI/Design ✓
- [ ] Desktop layout correct
- [ ] Tablet layout correct
- [ ] Mobile layout correct
- [ ] Animations smooth
- [ ] Colors match design system

### Performance ✓
- [ ] Pages load quickly
- [ ] No console errors
- [ ] Smooth animations
- [ ] Search responsive

### Security ✓
- [ ] Passwords hashed
- [ ] Tokens set correctly
- [ ] CORS enabled
- [ ] No sensitive data exposed

---

## Regression Testing Checklist

Before each release, verify:
- [ ] All pages load without errors
- [ ] All forms work correctly
- [ ] API endpoints respond
- [ ] Database operations work
- [ ] No console errors
- [ ] No network errors
- [ ] Responsive design works
- [ ] Animations smooth
- [ ] Authentication flow works
- [ ] All buttons functional

---

## Test Data

### Sample Users (Pre-seeded)
```
1. Priya Sharma - priya@example.com
2. Arjun Patel - arjun@example.com
3. Neha Gupta - neha@example.com
4. Vikram Singh - vikram@example.com
5. Riya Chopra - riya@example.com
```

All have password: `password123`

### API Testing Tools
- Postman: https://www.postman.com/
- Thunder Client: VS Code extension
- curl: Command line
- Browser DevTools: Network tab

---

## Bug Reporting Template

```
Title: [Brief description]

Environment:
- OS: [Windows/Mac/Linux]
- Browser: [Chrome/Firefox/Safari]
- Node version: [version]

Steps to reproduce:
1. ...
2. ...
3. ...

Expected result:
- ...

Actual result:
- ...

Screenshots/Logs:
[Include error messages and logs]
```

---

**Last Updated**: January 2024

Happy Testing! 🚀
