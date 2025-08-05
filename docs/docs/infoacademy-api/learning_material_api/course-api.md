---
title: Course API
sidebar_label: Course API
---

:::warning
[As mentioned above](../learning_material_api/), these API requests behave differently based on the subscription tier. Include your API key in the request headers, if you wish to get all details regarding courses. 
:::

## Example Requests

### 1. Get All Available Courses

**Endpoint:** `GET /courses/`

**cURL Example:**
```bash
curl -X GET "https://api.infoacademy.hu/v1/courses/" \
  -H "Authorization: Bearer YOUR_API_KEY"
```
**Response:**
```JSON
{
  "success": true,
  "data": Course[],
}
```

### 2. Get Specific Course

**Endpoint:** `GET /courses/:id`

**cURL Example:**
```bash
curl -X GET "https://api.infoacademy.hu/v1/courses/88470330-7af2-4a1c-b9ca-cc4b76a6680d"\
  -H "Authorization: Bearer YOUR_API_KEY"
```
**Response:**
```JSON
{
  "success": true,
  "data": Course,
}
```

## Administrative Examples
:::warning Administrative requests
The following requests require administrative privileges or *Teacher* subscription tier.
:::
### 1. Create new course

**Endpoint:** `POST /courses/`
**Request:**
```JSON
{
  "data": Course,
}
```
**Response:**
```JSON
{
  "success": true,
  "data": Course,
}
```
### 2. Update given course

**Endpoint:** `PUT /courses/:id`
**Request:**
```JSON
{
  "data": Course,
}
```
**Response:**
```JSON
{
  "success": true,
  "data": Course,
}
```
### 3. Delete course

**Endpoint:** `DELETE /courses/:id`
**Response:**
```JSON
{
  "success": true
}
```