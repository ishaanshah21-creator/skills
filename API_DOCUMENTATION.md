# API Documentation

Complete API reference for SkillSync Backend

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Authentication Endpoints

### 1. Register
Create a new user account

**Endpoint**: `POST /auth/register`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "college": "IIIT Delhi",
  "department": "CSE"
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "college": "IIIT Delhi",
    "department": "CSE"
  }
}
```

**Errors**:
- 400: Missing required fields
- 400: Email already registered

---

### 2. Login
Authenticate user and get JWT token

**Endpoint**: `POST /auth/login`

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Errors**:
- 400: Missing email or password
- 401: Invalid email or password

---

### 3. Get Current User
Get authenticated user's profile

**Endpoint**: `GET /auth/me`

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200):
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "college": "IIIT Delhi",
    "department": "CSE",
    "bio": "Passionate about web development",
    "profilePicture": "https://...",
    "skills": [],
    "requests": [],
    "connections": []
  }
}
```

---

## User Endpoints

### 1. Get All Users
Get list of all users with optional filters

**Endpoint**: `GET /users`

**Query Parameters**:
- `skill` (optional): Filter by skill name
- `department` (optional): Filter by department
- `page` (optional, default: 1): Page number
- `limit` (optional, default: 10): Items per page

**Example**:
```
GET /users?skill=React&department=CSE&page=1&limit=10
```

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "college": "IIIT Delhi",
      "skills": [
        {
          "skillName": "React",
          "category": "Web Development",
          "experienceLevel": "Intermediate"
        }
      ]
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

---

### 2. Get User by ID
Get a specific user's profile

**Endpoint**: `GET /users/:id`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "bio": "Web developer",
    "college": "IIIT Delhi",
    "department": "CSE",
    "skills": [],
    "connections": []
  }
}
```

**Errors**:
- 404: User not found

---

### 3. Search Users by Skill
Search users who have specific skill

**Endpoint**: `GET /users/search`

**Query Parameters**:
- `skill` (optional): Skill name to search
- `category` (optional): Skill category
- `experienceLevel` (optional): Beginner/Intermediate/Advanced

**Example**:
```
GET /users/search?skill=Python&category=Programming&experienceLevel=Advanced
```

**Response** (200):
```json
{
  "success": true,
  "data": [...],
  "count": 15
}
```

---

### 4. Get Suggested Users
Get random users for discovery

**Endpoint**: `GET /users/suggested`

**Query Parameters**:
- `limit` (optional, default: 5): Number of suggestions

**Response** (200):
```json
{
  "success": true,
  "data": [...]
}
```

---

### 5. Update Profile
Update user profile information

**Endpoint**: `PUT /users/profile/update`

**Headers**:
```
Authorization: Bearer <token>
```

**Request Body** (all optional):
```json
{
  "name": "Jane Doe",
  "bio": "Updated bio",
  "college": "IIIT Hyderabad",
  "department": "ECE",
  "profilePicture": "https://...",
  "socialLinks": {
    "linkedin": "https://linkedin.com/in/jane",
    "github": "https://github.com/jane",
    "twitter": "https://twitter.com/jane"
  }
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {...}
}
```

---

### 6. Add Skill
Add a new skill to user's profile

**Endpoint**: `POST /users/skills/add`

**Headers**:
```
Authorization: Bearer <token>
```

**Request Body**:
```json
{
  "skillName": "React",
  "category": "Web Development",
  "experienceLevel": "Intermediate"
}
```

**Skill Categories**:
- Programming
- Design
- Data Science
- Web Development
- Mobile Development
- DevOps
- Other

**Experience Levels**:
- Beginner
- Intermediate
- Advanced

**Response** (201):
```json
{
  "success": true,
  "message": "Skill added successfully",
  "user": {...}
}
```

---

### 7. Delete Skill
Remove a skill from user's profile

**Endpoint**: `DELETE /users/skills/:skillId`

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200):
```json
{
  "success": true,
  "message": "Skill deleted successfully",
  "user": {...}
}
```

---

### 8. Delete Account
Permanently delete user account

**Endpoint**: `DELETE /users/account`

**Headers**:
```
Authorization: Bearer <token>
```

**Request Body**:
```json
{
  "password": "user_password"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Account deleted successfully"
}
```

---

## Request Endpoints

### 1. Send Request
Send a collaboration request to another user

**Endpoint**: `POST /requests/send`

**Headers**:
```
Authorization: Bearer <token>
```

**Request Body**:
```json
{
  "receiverId": "507f1f77bcf86cd799439011",
  "skillRequested": "React",
  "message": "I'd love to learn React from you!"
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Request sent successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "sender": "507f1f77bcf86cd799439010",
    "receiver": "507f1f77bcf86cd799439011",
    "skillRequested": "React",
    "message": "I'd love to learn React from you!",
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**Errors**:
- 400: Receiver not found
- 400: Request already sent

---

### 2. Get Received Requests
Get all requests received by the user

**Endpoint**: `GET /requests`

**Headers**:
```
Authorization: Bearer <token>
```

**Query Parameters**:
- `status` (optional): pending/accepted/rejected

**Example**:
```
GET /requests?status=pending
```

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "sender": {
        "_id": "507f1f77bcf86cd799439010",
        "name": "John Doe",
        "email": "john@example.com",
        "profilePicture": "https://...",
        "skills": []
      },
      "skillRequested": "React",
      "message": "I'd love to learn",
      "status": "pending",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "count": 5
}
```

---

### 3. Get Sent Requests
Get all requests sent by the user

**Endpoint**: `GET /requests/sent`

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200):
```json
{
  "success": true,
  "data": [...],
  "count": 3
}
```

---

### 4. Accept Request
Accept a connection request

**Endpoint**: `PUT /requests/:requestId/accept`

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200):
```json
{
  "success": true,
  "message": "Request accepted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "status": "accepted"
  }
}
```

---

### 5. Reject Request
Reject a connection request

**Endpoint**: `PUT /requests/:requestId/reject`

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200):
```json
{
  "success": true,
  "message": "Request rejected successfully"
}
```

---

### 6. Delete Request
Delete/cancel a request

**Endpoint**: `DELETE /requests/:requestId`

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200):
```json
{
  "success": true,
  "message": "Request deleted successfully"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing/invalid token |
| 403 | Forbidden - No permission |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Internal error |

---

## Rate Limiting

Currently no rate limiting. In production, implement:
- 100 requests per minute per IP
- 1000 requests per hour per user

---

## Pagination

For endpoints that support pagination:

**Request**:
```
GET /users?page=2&limit=20
```

**Response includes**:
```json
{
  "pagination": {
    "total": 500,
    "page": 2,
    "limit": 20,
    "pages": 25
  }
}
```

---

## Error Handling

### Common Errors

**Invalid Token**:
```json
{
  "success": false,
  "message": "Invalid token"
}
```

**User Not Found**:
```json
{
  "success": false,
  "message": "User not found"
}
```

**Validation Error**:
```json
{
  "success": false,
  "message": "name is required, email must be valid"
}
```

---

## Testing with Postman

1. Create a new collection
2. Import environment variables
3. Use the endpoints listed above
4. Set Authorization header for protected routes

**Environment Variables Template**:
```json
{
  "base_url": "http://localhost:5000/api",
  "token": "",
  "userId": ""
}
```

---

**Last Updated**: January 2024
