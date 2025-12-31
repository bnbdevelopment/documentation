---
title: API Overview
sidebar_label: Overview
sidebar_position: 0
---

# API Overview

The BNB Billing System provides a RESTful API for managing multi-tenant billing operations, payments, and webhooks.

## Base URL

```
Development: http://localhost:3000
Production: https://billing.bnb.example.com
```

## Authentication

### Admin Endpoints

Admin endpoints require an API key in the request header:

```http
X-Admin-Key: your-admin-api-key
```

**Endpoints**:
- `POST /tenants/register`

### Tenant Endpoints

Most endpoints require JWT authentication:

```http
Authorization: Bearer <jwt_token>
```

**How to get a token**:
1. Register a tenant (admin-only)
2. Call `POST /tenants/login` with credentials
3. Use the returned `accessToken` in subsequent requests

## Request Headers

### Required Headers

| Header | Value | Used For |
|--------|-------|----------|
| `Content-Type` | `application/json` | All POST/PATCH requests |
| `Authorization` | `Bearer <token>` | Authenticated endpoints |
| `X-Admin-Key` | `<admin-key>` | Admin endpoints |

### Optional Headers

| Header | Value | Used For |
|--------|-------|----------|
| `Idempotency-Key` | UUID v4 | Write operations (POST/PUT/PATCH/DELETE) |
| `X-Correlation-ID` | UUID v4 | Request tracking (auto-generated if missing) |

## Response Format

### Success Response

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "data": { ... },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Error Response

```json
{
  "statusCode": 400,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/endpoint",
  "message": "Validation failed",
  "correlationId": "550e8400-e29b-41d4-a716-446655440000",
  "error": "Bad Request",
  "details": [
    "amount must be between 1 and 10000000 HUF"
  ]
}
```

## HTTP Status Codes

| Code | Meaning | Common Causes |
|------|---------|---------------|
| 200 | OK | Successful GET/PATCH |
| 201 | Created | Successful POST |
| 400 | Bad Request | Validation error, missing required fields |
| 401 | Unauthorized | Missing/invalid JWT, invalid credentials |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Idempotency key conflict |
| 422 | Unprocessable Entity | Business logic validation failed |
| 503 | Service Unavailable | Lock acquisition timeout, retry recommended |
| 500 | Internal Server Error | Unexpected server error |

## Idempotency

Write operations (POST, PUT, PATCH, DELETE) support idempotency to prevent duplicate actions.

**Header**: `Idempotency-Key: <uuid>`

**Example**:
```http
POST /api/payments
Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 10000,
  "currency": "HUF",
  "userId": "user123"
}
```

**Behavior**:
- First request: Processes normally, returns 201 Created
- Duplicate request (same key): Returns cached response, returns 200 OK
- Same key, different payload: Returns 409 Conflict

**See**: [Idempotency Documentation](../implementation/phase-4-idempotency)

## Rate Limiting

Rate limiting is applied per tenant:

- **Default**: 100 requests per 60 seconds
- **Response Header**: `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- **Exceeded**: 429 Too Many Requests

## Pagination

List endpoints support pagination using query parameters:

**Parameters**:
- `limit`: Number of items per page (default: 20, max: 100)
- `offset`: Number of items to skip (default: 0)
- `sortBy`: Field to sort by
- `sortOrder`: `asc` or `desc` (default: `desc`)

**Example**:
```http
GET /api/payments?limit=20&offset=0&sortBy=createdAt&sortOrder=desc
```

**Response**:
```json
{
  "data": [...],
  "pagination": {
    "total": 150,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

## Filtering

List endpoints support filtering using query parameters:

**Example**:
```http
GET /api/payments?status=SUCCEEDED&currency=HUF&createdAfter=2024-01-01
```

## API Endpoints

### Health
- [GET /health](./health) - Liveness probe
- [GET /health/ready](./health) - Readiness probe

### Tenant Management
- [POST /tenants/register](./tenants#register) - Register new tenant (admin)
- [POST /tenants/login](./tenants#login) - Authenticate tenant
- [GET /tenants/me](./tenants#get-current) - Get current tenant
- [PATCH /tenants/me](./tenants#update-current) - Update current tenant

### Payments (Coming Soon)
- POST /payments - Create payment intent
- GET /payments/:id - Get payment details
- GET /payments - List payments
- POST /payments/:id/cancel - Cancel payment

### Webhooks (Coming Soon)
- POST /webhooks/simplepay - SimplePay webhook receiver

## Versioning

The API is currently unversioned. Future versions will use URL versioning:

```
/v1/payments
/v2/payments
```

## SDKs and Libraries

Official SDKs:
- **Node.js/TypeScript**: Coming soon
- **Python**: Coming soon
- **PHP**: Coming soon

## Support

For API support:
- **Documentation**: https://docs.bnb.example.com
- **Issues**: https://github.com/bnb/billing/issues
- **Email**: support@bnb.example.com

## Changelog

### v0.4.0 (Current)
- Idempotency support for write operations
- Custom validators (@IsCurrency, @IsValidAmount)
- Global idempotency interceptor

### v0.3.0
- Tenant authentication (JWT)
- Argon2id password hashing
- Admin and tenant guards

### v0.2.0
- Infrastructure setup
- Health check endpoints
- Database schema

## Next Steps

- [Tenant API Reference](./tenants)
- [Health Check API](./health)
