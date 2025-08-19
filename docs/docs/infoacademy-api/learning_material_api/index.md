---
title: Learning Material API
sidebar_label: Learning Material API
---

## Basic Structure of learning materials
Most learning materials in InfoAcademy follow a hierarchical structure:
```bash
Path/
  ├── Course/
  │   └── Modules/
  │       ├── Lectures
  │       ├── Exercises
  │       └── Tests
  └── Course/
      └── ...
```
- **Paths** are recommended learning order of courses.
- **Courses** contain multiple modules, can be purchased all-in-one.
- **Modules** can contain video lectures, documents, exercises, tests.

:::note
You can buy some modules separately if the creator allowed it.
:::

## Base URL

All API endpoints are relative to the base URL:

```
https://api.infoacademy.com/v1/
```

## Authentication

These API requests behave differently based on the usage of an API key. Include your API key in the request headers, if you wish to get all details regarding courses:
```http
Authorization: Bearer YOUR_API_KEY
```
Please refer to [this table](../appendix/ratelimiting) regarding privileges and permissions.

## Rate Limiting

The API implements rate limiting to ensure fair usage. Please refer to this table to find out more.


Rate limit headers are included in all responses:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642680000
```
