---
sidebar_position: 2
---

# Getting Started

This page covers tenant registration and authentication with the billing platform.

## Tenant Registration

Tenant registration is performed by platform administrators. Contact the platform team to register your application as a new tenant.

### Registration Information Required

Provide the following information for tenant registration:

- **Application Name**: A unique identifier for your application (e.g., "my-saas-app")
- **Contact Email**: Administrative contact for billing-related communications
- **Webhook URL**: HTTPS endpoint where payment status webhooks will be delivered
- **Environment**: Production or staging
- **Sandbox Mode**: Whether this tenant should use simulated payments (see [Sandbox Mode](./sandbox-mode.md))

:::tip Development and Testing
For development and testing, request a **sandbox tenant**. Sandbox mode allows you to test the complete payment flow without processing real transactions. See the [Sandbox Mode](./sandbox-mode.md) guide for details.
:::

### Receiving Credentials

After registration, you will receive:

- **App ID**: Your unique tenant identifier
- **App Secret**: Authentication credential (treat as highly sensitive)

Store these credentials securely using environment variables or a secrets management service. Never commit credentials to version control or expose them in client-side code.

## Authentication

All API requests to the billing platform require authentication using a JWT token.

### Obtaining a JWT Token

**Endpoint**: `POST /tenants/login`

**Request Body**:
```json
{
  "appName": "your-app-name",
  "appSecret": "your-app-secret"
}
```

**Response**:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tenantId": "uuid-of-your-tenant",
  "appName": "your-app-name",
  "expiresIn": "24h"
}
```

### Using the JWT Token

Include the JWT token in the `Authorization` header for all subsequent API requests:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Expiration

JWT tokens expire after 24 hours. Implement token refresh logic in your backend:

- Store the token securely (in-memory or encrypted cache)
- Detect 401 Unauthorized responses
- Re-authenticate when the token expires
- Retry the original request with the new token

### Example: Authentication Flow

```javascript
// Backend authentication service
class BillingAuthService {
  constructor(appName, appSecret, apiBaseUrl) {
    this.appName = appName;
    this.appSecret = appSecret;
    this.apiBaseUrl = apiBaseUrl;
    this.token = null;
    this.tokenExpiry = null;
  }

  async getToken() {
    // Return cached token if still valid
    if (this.token && this.tokenExpiry > Date.now()) {
      return this.token;
    }

    // Authenticate and cache new token
    const response = await fetch(`${this.apiBaseUrl}/tenants/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        appName: this.appName,
        appSecret: this.appSecret
      })
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    const data = await response.json();
    this.token = data.accessToken;
    this.tokenExpiry = Date.now() + (23 * 60 * 60 * 1000); // 23 hours

    return this.token;
  }

  async makeAuthenticatedRequest(url, options = {}) {
    const token = await this.getToken();

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`
      }
    });

    // Handle token expiration
    if (response.status === 401) {
      this.token = null; // Clear cached token
      return this.makeAuthenticatedRequest(url, options); // Retry
    }

    return response;
  }
}
```

## Verifying Integration

After authentication, verify your integration by retrieving your tenant information:

**Endpoint**: `GET /tenants/me`

**Headers**:
```
Authorization: Bearer <your-jwt-token>
```

**Response**:
```json
{
  "id": "tenant-uuid",
  "appName": "your-app-name",
  "status": "active",
  "webhookUrl": "https://your-app.com/webhooks/billing",
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

A successful response confirms your credentials are valid and your tenant account is active.

## Security Considerations

- Never expose tenant credentials in frontend code
- Store credentials in environment variables or secure vaults
- Use HTTPS for all API communications
- Implement rate limiting on authentication endpoints
- Monitor for unusual authentication patterns
- Rotate credentials periodically

## Next Steps

With authentication configured, you can proceed to [creating payment intents](./creating-payments.md).
