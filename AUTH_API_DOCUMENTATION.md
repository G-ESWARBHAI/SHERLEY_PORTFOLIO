# Authentication API Documentation

## Base URL
```
http://localhost:5000/api/auth
```

## Overview

The authentication system uses JWT tokens stored in HTTP-only cookies for security. Tokens are automatically sent with each request.

**Features:**
- User and Admin roles
- JWT token-based authentication
- Tokens stored in HTTP-only cookies
- Account lockout after 5 failed login attempts (2 hours)
- Password hashing with bcrypt
- Token blacklisting with Redis

---

## Public Endpoints

### 1. Forgot Password
**POST** `/api/auth/forgot-password`

Request a password reset link to be sent to your email.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset email sent successfully. Please check your email."
}
```

**Note:** For security, the same message is returned whether the email exists or not.

---

### 2. Reset Password
**POST** `/api/auth/reset-password`

Reset password using the token from the email.

**Request Body:**
```json
{
  "token": "reset-token-from-email",
  "password": "newpassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successfully. You are now logged in.",
  "data": {
    "user": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "username": "john_doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Note:** Token is automatically set in HTTP-only cookie. Token expires in 1 hour.

---

### 3. Verify Reset Token
**GET** `/api/auth/verify-reset-token/:token`

Verify if a password reset token is valid.

**Response:**
```json
{
  "success": true,
  "message": "Token is valid"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Invalid or expired password reset token"
}
```

---

### 4. Register New User
**POST** `/api/auth/register`

Register a new user account. The first user registered automatically becomes an admin.

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "username": "john_doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Note:** Token is automatically set in HTTP-only cookie.

---

### 5. Login
**POST** `/api/auth/login`

Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "username": "john_doe",
      "email": "john@example.com",
      "role": "admin",
      "lastLogin": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `401` - Invalid credentials
- `423` - Account locked (too many failed attempts)

---

## Protected Endpoints (Require Authentication)

### 6. Change Password
**POST** `/api/auth/change-password`

Change password when logged in (requires current password).

**Headers:** Cookie with token (automatic)

**Request Body:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Error Responses:**
- `400` - Current password incorrect or new password same as current
- `401` - Not authenticated

---

### 7. Get Current User
**GET** `/api/auth/me`

Get information about the currently authenticated user.

**Headers:** Cookie with token (automatic)

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "username": "john_doe",
      "email": "john@example.com",
      "role": "admin",
      "isActive": true,
      "lastLogin": "2024-01-15T10:30:00.000Z",
      "createdAt": "2024-01-10T08:00:00.000Z"
    }
  }
}
```

---

### 8. Verify Token
**GET** `/api/auth/verify`

Verify if the current token is valid.

**Headers:** Cookie with token (automatic)

**Response:**
```json
{
  "success": true,
  "message": "Token is valid",
  "data": {
    "user": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "username": "john_doe",
      "email": "john@example.com",
      "role": "admin"
    }
  }
}
```

---

### 9. Logout
**POST** `/api/auth/logout`

Logout and clear the authentication token.

**Headers:** Cookie with token (automatic)

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## Admin Endpoints (Require Admin Role)

### 10. Get All Users
**GET** `/api/auth/users`

Get a list of all users (admin only).

**Headers:** Cookie with admin token (automatic)

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
        "username": "john_doe",
        "email": "john@example.com",
        "role": "admin",
        "isActive": true,
        "createdAt": "2024-01-10T08:00:00.000Z"
      }
    ],
    "count": 1
  }
}
```

---

### 11. Update User
**PUT** `/api/auth/users/:id`

Update user information (admin only).

**Headers:** Cookie with admin token (automatic)

**Request Body:**
```json
{
  "username": "updated_username",
  "email": "updated@example.com",
  "role": "admin",
  "isActive": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "user": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "username": "updated_username",
      "email": "updated@example.com",
      "role": "admin",
      "isActive": true
    }
  }
}
```

---

### 12. Delete User
**DELETE** `/api/auth/users/:id`

Delete a user (admin only). Cannot delete your own account.

**Headers:** Cookie with admin token (automatic)

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## Using Authentication in Frontend

### JavaScript/Fetch Example

```javascript
// Login
const login = async (email, password) => {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Important: Include cookies
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  return data;
};

// Get current user
const getCurrentUser = async () => {
  const response = await fetch('http://localhost:5000/api/auth/me', {
    method: 'GET',
    credentials: 'include' // Important: Include cookies
  });
  
  const data = await response.json();
  return data;
};

// Logout
const logout = async () => {
  const response = await fetch('http://localhost:5000/api/auth/logout', {
    method: 'POST',
    credentials: 'include' // Important: Include cookies
  });
  
  const data = await response.json();
  return data;
};
```

### Axios Example

```javascript
import axios from 'axios';

// Configure axios to include credentials
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5000';

// Login
const login = async (email, password) => {
  const response = await axios.post('/api/auth/login', {
    email,
    password
  });
  return response.data;
};

// Get current user
const getCurrentUser = async () => {
  const response = await axios.get('/api/auth/me');
  return response.data;
};

// Logout
const logout = async () => {
  const response = await axios.post('/api/auth/logout');
  return response.data;
};
```

---

## Security Features

1. **HTTP-Only Cookies:** Tokens are stored in HTTP-only cookies, preventing XSS attacks
2. **Password Hashing:** Passwords are hashed using bcrypt with salt rounds
3. **Account Lockout:** Accounts are locked after 5 failed login attempts for 2 hours
4. **Token Expiration:** Tokens expire after 7 days (configurable)
5. **Role-Based Access:** Admin and user roles with proper authorization
6. **Token Blacklisting:** Tokens can be invalidated using Redis

---

## Environment Variables

Add these to your `.env` file:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

---

## Error Responses

All endpoints return error responses in the following format:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error message"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created (for registration)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `423` - Locked (account locked)
- `500` - Internal Server Error

---

## Protected Gallery Routes

After authentication is set up, the following gallery routes require admin authentication:

- `POST /api/gallery` - Add image (admin only)
- `PUT /api/gallery/:id` - Update image (admin only)
- `DELETE /api/gallery/:id` - Delete image (admin only)

Public routes (no authentication required):
- `GET /api/gallery` - Get all images
- `GET /api/gallery/categories` - Get categories
- `GET /api/gallery/:id` - Get single image
