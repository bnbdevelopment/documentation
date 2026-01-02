---
sidebar_position: 3
---

# Creating Payments

This page explains how to create payment intents and generate checkout URLs for your users.

## Payment Intent Lifecycle

A payment intent represents a single payment attempt. Each intent progresses through the following states:

1. **CREATED**: Initial state after creation
2. **PROVIDER_PENDING**: User redirected to payment provider, awaiting completion
3. **SUCCEEDED**: Payment confirmed by provider webhook
4. **FAILED**: Payment declined or failed
5. **EXPIRED**: Payment intent expired before completion (default: 15 minutes)
6. **REFUNDED**: Payment was refunded (optional final state)

## Creating a Payment Intent

**Endpoint**: `POST /payments`

**Headers**:
```
Authorization: Bearer <jwt-token>
Idempotency-Key: <unique-key-for-this-payment>
Content-Type: application/json
```

**Request Body**:
```json
{
  "userId": "user-123",
  "amount": 5000,
  "currency": "HUF",
  "metadata": {
    "orderId": "order-456",
    "productName": "Premium Subscription",
    "billingEmail": "user@example.com"
  }
}
```

**Response**:
```json
{
  "id": "payment-intent-uuid",
  "tenantId": "your-tenant-id",
  "userId": "user-123",
  "amount": 5000,
  "currency": "HUF",
  "status": "CREATED",
  "provider": "simplepay",
  "providerReference": null,
  "checkoutUrl": null,
  "metadata": {
    "orderId": "order-456",
    "productName": "Premium Subscription",
    "billingEmail": "user@example.com"
  },
  "createdAt": "2025-01-03T10:00:00.000Z",
  "updatedAt": "2025-01-03T10:00:00.000Z",
  "expiresAt": "2025-01-03T10:15:00.000Z"
}
```

### Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | string | Yes | Your application's user identifier |
| `amount` | integer | Yes | Payment amount in smallest currency unit (e.g., cents for USD/EUR, forints for HUF) |
| `currency` | string | Yes | Currency code: `HUF`, `EUR`, or `USD` |
| `metadata` | object | No | Custom data to associate with the payment (e.g., order ID, user email) |

### Amount Validation

Each currency has specific amount ranges:

- **HUF**: 100 to 1,000,000,000 (1 HUF to 10M HUF)
- **EUR**: 50 to 100,000,000 (0.50 EUR to 1M EUR)
- **USD**: 50 to 100,000,000 (0.50 USD to 1M USD)

### Idempotency Keys

The `Idempotency-Key` header is required for payment creation to prevent duplicate charges. The key should be:

- Unique per payment attempt
- Stable across retries of the same payment
- Scoped to your tenant (the platform automatically enforces this)

**Example idempotency key generation**:
```javascript
const idempotencyKey = `payment_${userId}_${orderId}_${timestamp}`;
```

If the same idempotency key is used with a different request body, the platform returns a `409 Conflict` error.

## Retrieving a Payment

**Endpoint**: `GET /payments/:paymentId`

**Headers**:
```
Authorization: Bearer <jwt-token>
```

**Response**:
```json
{
  "id": "payment-intent-uuid",
  "tenantId": "your-tenant-id",
  "userId": "user-123",
  "amount": 5000,
  "currency": "HUF",
  "status": "SUCCEEDED",
  "provider": "simplepay",
  "providerReference": "SIMPLEPAY-REF-123",
  "checkoutUrl": "https://sandbox.simplepay.hu/payment/...",
  "metadata": {
    "orderId": "order-456"
  },
  "createdAt": "2025-01-03T10:00:00.000Z",
  "updatedAt": "2025-01-03T10:05:00.000Z",
  "expiresAt": "2025-01-03T10:15:00.000Z",
  "events": [
    {
      "id": "event-1",
      "type": "CREATED",
      "timestamp": "2025-01-03T10:00:00.000Z"
    },
    {
      "id": "event-2",
      "type": "PROVIDER_PAYMENT_INITIATED",
      "timestamp": "2025-01-03T10:01:00.000Z"
    },
    {
      "id": "event-3",
      "type": "PAYMENT_SUCCEEDED",
      "timestamp": "2025-01-03T10:05:00.000Z"
    }
  ]
}
```

Use this endpoint to check payment status after webhook notifications or when a user returns to your application.

## Listing Payments

**Endpoint**: `GET /payments`

**Headers**:
```
Authorization: Bearer <jwt-token>
```

**Query Parameters**:
```
?userId=user-123&status=SUCCEEDED&limit=50&offset=0
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `userId` | string | Filter by user ID |
| `status` | string | Filter by payment status |
| `limit` | integer | Number of results (default: 20, max: 100) |
| `offset` | integer | Pagination offset |

**Response**:
```json
{
  "data": [
    {
      "id": "payment-1",
      "userId": "user-123",
      "amount": 5000,
      "currency": "HUF",
      "status": "SUCCEEDED",
      "createdAt": "2025-01-03T10:00:00.000Z"
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

## Canceling a Payment

Cancel a payment intent before it completes. Only payments in `CREATED` or `PROVIDER_PENDING` status can be canceled.

**Endpoint**: `POST /payments/:paymentId/cancel`

**Headers**:
```
Authorization: Bearer <jwt-token>
Idempotency-Key: <unique-cancellation-key>
```

**Response**:
```json
{
  "id": "payment-intent-uuid",
  "status": "CANCELLED",
  "cancelledAt": "2025-01-03T10:10:00.000Z"
}
```

## Example: Complete Payment Flow

```javascript
class PaymentService {
  constructor(authService, apiBaseUrl) {
    this.authService = authService;
    this.apiBaseUrl = apiBaseUrl;
  }

  async createPayment(userId, amount, currency, metadata) {
    // Generate idempotency key
    const idempotencyKey = `payment_${userId}_${Date.now()}`;

    const response = await this.authService.makeAuthenticatedRequest(
      `${this.apiBaseUrl}/payments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyKey
        },
        body: JSON.stringify({
          userId,
          amount,
          currency,
          metadata
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Payment creation failed: ${response.statusText}`);
    }

    return await response.json();
  }

  async getPayment(paymentId) {
    const response = await this.authService.makeAuthenticatedRequest(
      `${this.apiBaseUrl}/payments/${paymentId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch payment: ${response.statusText}`);
    }

    return await response.json();
  }
}
```

## Next Steps

After creating a payment intent, proceed to [handling redirects](./handling-redirects.md) to complete the checkout flow.
