---
title: Module API
sidebar_label: Module API
---

:::warning
[As mentioned above](../learning_material_api/), these API requests behave differently based on the subscription tier. Include your API key in the request headers, if you wish to get all details regarding courses. 
:::

## Example Requests

### 1. Get All Modules

**Endpoint:** `GET /modules/`

Optionally, for searching and pagination the following parameters can be supplied:
- `s` for searching in the module title and description
- `l` for setting a limit for the pagination, by default it is 10
- `p` for setting the specific page, by default is 1

**cURL Example:**
```bash
curl -X GET "https://api.infoacademy.hu/v1/modules/88470330-7af2-4a1c-b9ca-cc4b76a6680d"\
  -H "Authorization: Bearer YOUR_API_KEY"
```
**Response:**
```JSON
{
  "success": true,
  "data": Module,
}
```

### 2. Get Specific Module

**Endpoint:** `GET /modules/:id`

**cURL Example:**
```bash
curl -X GET "https://api.infoacademy.hu/v1/modules/88470330-7af2-4a1c-b9ca-cc4b76a6680d"\
  -H "Authorization: Bearer YOUR_API_KEY"
```
**Response:**
```JSON
{
  "success": true,
  "data": Module,
}
```

## Administrative Examples
:::warning Administrative requests
The following requests require administrative privileges or *Teacher* subscription tier.
:::
### 1. Create new module

**Endpoint:** `POST /module/`

:::info
To create a `CourseModule`, you need to supply the id of the course in the `courseId` parameter. Otherwise the created module will be separated.
:::

**Request:**
```JSON
{
  "data": Module,
  "courseId": string? // Optional: only required when creating a CourseModule
}
```
**Response:**
```JSON
{
  "success": true,
  "data": Module,
}
```
### 2. Update given path

**Endpoint:** `PUT /paths/:id`
**Request:**
```JSON
{
  "data": Path,
}
```
**Response:**
```JSON
{
  "success": true,
  "data": Path,
}
```
### 3. Delete path

**Endpoint:** `DELETE /paths/:id`
**Response:**
```JSON
{
  "success": true
}
```