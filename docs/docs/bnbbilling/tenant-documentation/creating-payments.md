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
6. **CANCELLED**: Payment cancelled before completion
7. **REFUNDED**: Payment was successfully refunded (only accessible from SUCCEEDED state)

Only payments in the SUCCEEDED state can be refunded. See the [Refunds](./refunds.md) page for details on processing refunds.

:::note Sandbox Mode
If your tenant is registered in **sandbox mode**, all payments use a simulated provider instead of real payment processing. This allows you to test the complete flow without actual transactions. See [Sandbox Mode](./sandbox-mode.md) for details.
:::

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
  "metadata": {
    "orderId": "order-456",
    "productName": "Premium Subscription",
    "billingEmail": "user@example.com"
  },
  "createdAt": "2025-01-03T10:00:00.000Z",
  "updatedAt": "2025-01-03T10:00:00.000Z",
  "expiresAt": "2025-01-03T10:15:00.000Z",
  "checkoutToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "sandbox": false
}
```

:::info Sandbox Field
The `sandbox` field indicates whether this payment uses simulated processing (`true`) or real payment processing (`false`). For sandbox tenants, this field is always `true` and the `provider` field will be `"sandbox"`.
:::

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

## Checkout Token

The payment creation response includes a `checkoutToken` field. This is a short-lived JWT token that authorizes end users to access and complete the specific payment without requiring tenant-level credentials.

### Token Characteristics

- **Payment-Scoped**: Token only works for the specific payment it was issued for
- **Short-Lived**: Valid for 15 minutes from issuance
- **One-Time Response**: Only returned when creating a payment, not on subsequent retrievals
- **Secure**: Contains only non-sensitive identifiers (payment ID, tenant ID)

### Usage

Use the checkout token to redirect your users to the billing platform's hosted payment page:

```
https://billing.yourdomain.com/payment/{paymentId}?token={checkoutToken}
```

This allows your users to view payment details and complete checkout without exposing your tenant credentials to the frontend. The checkout token authorizes only:

- Viewing the specific payment (`GET /payments/:id`)
- Initializing the payment with a provider (`POST /payments/:id/initialize`)

Once the payment reaches a terminal state (SUCCEEDED, FAILED, EXPIRED, etc.), the checkout token becomes invalid to prevent unauthorized access to completed payments.

### Security Considerations

- Checkout tokens should be treated as sensitive but short-lived credentials
- Tokens cannot be used to create new payments or access other tenant resources
- Tokens expire when the associated payment expires (15 minutes by default)
- Failed or tampered tokens result in HTTP 401 Unauthorized responses

## Retrieving a Payment

**Endpoint**: `GET /payments/:paymentId`

**Authentication**: Accepts either tenant JWT or checkout token

**Headers (Tenant JWT)**:
```
Authorization: Bearer <tenant-jwt-token>
```

**Query Parameters (Checkout Token)**:
```
?token=<checkout-token>
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

Use this endpoint to check payment status after webhook notifications or when a user returns to your application. Note that the `checkoutToken` field is only present in the payment creation response, not in subsequent retrievals.

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
  constructor(authService, apiBaseUrl, billingUiUrl) {
    this.authService = authService;
    this.apiBaseUrl = apiBaseUrl;
    this.billingUiUrl = billingUiUrl; // e.g., "https://billing.yourdomain.com"
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

  async initiateCheckout(userId, amount, currency, metadata) {
    // Create payment and get checkout token
    const payment = await this.createPayment(userId, amount, currency, metadata);

    // Build checkout URL with token
    const checkoutUrl = `${this.billingUiUrl}/payment/${payment.id}?token=${payment.checkoutToken}`;

    return {
      paymentId: payment.id,
      checkoutUrl,
      expiresAt: payment.expiresAt
    };
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

// Usage example
const paymentService = new PaymentService(
  authService,
  'https://api.billing.yourdomain.com',
  'https://billing.yourdomain.com'
);

// Backend endpoint to initiate checkout
app.post('/api/checkout', authenticateUser, async (req, res) => {
  const { amount, currency, metadata } = req.body;
  const userId = req.user.id;

  try {
    const checkout = await paymentService.initiateCheckout(
      userId,
      amount,
      currency,
      metadata
    );

    // Return checkout URL to frontend for redirect
    res.json({
      checkoutUrl: checkout.checkoutUrl,
      paymentId: checkout.paymentId,
      expiresAt: checkout.expiresAt
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create payment' });
  }
});
```

## Next Steps

After creating a payment intent, proceed to:

- [Handling Redirects](./handling-redirects.md) - Complete the checkout flow
- [Refunds](./refunds.md) - Learn how to process refunds for completed payments
