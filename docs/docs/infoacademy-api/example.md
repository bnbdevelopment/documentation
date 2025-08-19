---
id: api-example
title: API Request Example
sidebar_label: API Example
description: Learn how to make API requests to the InfoAcademy API with practical examples
---

# API Request Example

This guide demonstrates how to make API requests to the InfoAcademy API using various HTTP methods and authentication.

## Authentication

All API requests require authentication using an API key. Include your API key in the request headers:

```http
Authorization: Bearer YOUR_API_KEY
```

## Base URL

All API endpoints are relative to the base URL:

```
https://api.infoacademy.com/v1
```

## Example Requests

### 1. Get User Profile

Retrieve the current user's profile information.

**Endpoint:** `GET /user/profile`

**Headers:**
```http
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

**cURL Example:**
```bash
curl -X GET "https://api.infoacademy.com/v1/user/profile" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_123456",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "student",
    "created_at": "2024-01-15T10:30:00Z",
    "last_login": "2024-01-20T14:45:00Z"
  }
}
```

### 2. Create a New Course

Create a new course with the specified details.

**Endpoint:** `POST /courses`

**Headers:**
```http
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Introduction to Web Development",
  "description": "Learn the basics of HTML, CSS, and JavaScript",
  "category": "programming",
  "difficulty": "beginner",
  "duration": 480,
  "price": 99.99,
  "tags": ["html", "css", "javascript", "web"]
}
```

**cURL Example:**
```bash
curl -X POST "https://api.infoacademy.com/v1/courses" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Introduction to Web Development",
    "description": "Learn the basics of HTML, CSS, and JavaScript",
    "category": "programming",
    "difficulty": "beginner",
    "duration": 480,
    "price": 99.99,
    "tags": ["html", "css", "javascript", "web"]
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "course_789012",
    "title": "Introduction to Web Development",
    "description": "Learn the basics of HTML, CSS, and JavaScript",
    "category": "programming",
    "difficulty": "beginner",
    "duration": 480,
    "price": 99.99,
    "tags": ["html", "css", "javascript", "web"],
    "created_at": "2024-01-20T15:30:00Z",
    "status": "draft"
  }
}
```

### 3. Update Course Information

Update an existing course with new information.

**Endpoint:** `PUT /courses/{course_id}`

**Headers:**
```http
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Advanced Web Development",
  "description": "Master advanced web development techniques",
  "difficulty": "intermediate",
  "price": 149.99
}
```

**cURL Example:**
```bash
curl -X PUT "https://api.infoacademy.com/v1/courses/course_789012" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Advanced Web Development",
    "description": "Master advanced web development techniques",
    "difficulty": "intermediate",
    "price": 149.99
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "course_789012",
    "title": "Advanced Web Development",
    "description": "Master advanced web development techniques",
    "category": "programming",
    "difficulty": "intermediate",
    "duration": 480,
    "price": 149.99,
    "tags": ["html", "css", "javascript", "web"],
    "updated_at": "2024-01-20T16:00:00Z",
    "status": "draft"
  }
}
```

### 4. Delete a Course

Remove a course from the system.

**Endpoint:** `DELETE /courses/{course_id}`

**Headers:**
```http
Authorization: Bearer YOUR_API_KEY
```

**cURL Example:**
```bash
curl -X DELETE "https://api.infoacademy.com/v1/courses/course_789012" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "success": true,
  "message": "Course deleted successfully"
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

### Common Error Responses

**401 Unauthorized:**
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or missing API key"
  }
}
```

**404 Not Found:**
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

**422 Validation Error:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": {
      "title": "Title is required",
      "price": "Price must be a positive number"
    }
  }
}
```

## Rate Limiting

The API implements rate limiting to ensure fair usage:

- **Free tier:** 100 requests per hour
- **Pro tier:** 1000 requests per hour
- **Enterprise tier:** 10000 requests per hour

Rate limit headers are included in all responses:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642680000
```

## SDK Examples

### JavaScript/Node.js

```javascript
const axios = require('axios');

const apiClient = axios.create({
  baseURL: 'https://api.infoacademy.com/v1',
  headers: {
    'Authorization': `Bearer ${process.env.INFOACADEMY_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

// Get user profile
const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/user/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error.response.data);
  }
};

// Create a course
const createCourse = async (courseData) => {
  try {
    const response = await apiClient.post('/courses', courseData);
    return response.data;
  } catch (error) {
    console.error('Error creating course:', error.response.data);
  }
};
```

### Python

```python
import requests

API_BASE_URL = "https://api.infoacademy.com/v1"
API_KEY = "YOUR_API_KEY"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

# Get user profile
def get_user_profile():
    response = requests.get(f"{API_BASE_URL}/user/profile", headers=headers)
    return response.json()

# Create a course
def create_course(course_data):
    response = requests.post(f"{API_BASE_URL}/courses", 
                           json=course_data, 
                           headers=headers)
    return response.json()
```