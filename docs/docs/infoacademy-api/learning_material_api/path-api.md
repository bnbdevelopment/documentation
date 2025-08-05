---
title: Path API
sidebar_label: Path API
---

:::warning
[As mentioned above](../learning_material_api/), these API requests behave differently based on the subscription tier. Include your API key in the request headers, if you wish to get all details regarding courses. 
:::

## Example Requests

### 1. Get All Available Paths

**Endpoint:** `GET /paths/`

**cURL Example:**
```bash
curl -X GET "https://api.infoacademy.hu/v1/paths/" \
  -H "Authorization: Bearer YOUR_API_KEY"
```
**Response:**
```JSON
{
  "success": true,
  "data": Path[],
}
```

### 2. Get Specific Path

**Endpoint:** `GET /paths/:id`

**cURL Example:**
```bash
curl -X GET "https://api.infoacademy.hu/v1/paths/88470330-7af2-4a1c-b9ca-cc4b76a6680d"\
  -H "Authorization: Bearer YOUR_API_KEY"
```
**Response:**
```JSON
{
  "success": true,
  "data": Path,
}
```

## Administrative Examples
:::warning Administrative requests
The following requests require administrative privileges or *Teacher* subscription tier.
:::
### 1. Create new path

**Endpoint:** `POST /paths/`
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