---
sidebar_position: 6
---

# Refund Processing

This page explains how to initiate and process refunds for completed payments.

## Refund Lifecycle

A refund represents the reversal of a completed payment. Each refund progresses through the following states:

1. **CREATED**: Refund initiated, awaiting user confirmation
2. **PROCESSING**: User confirmed, refund being submitted to payment provider
3. **SUCCEEDED**: Provider confirmed refund completion
4. **FAILED**: Provider rejected the refund
5. **EXPIRED**: Refund token expired before user confirmation (default: 15 minutes)

## Refund Eligibility

Only payments in `SUCCEEDED` status can be refunded. The billing platform enforces the following rules:

- A payment must have completed successfully before a refund can be initiated
- Only full refunds are supported in the current version
- A payment can only be refunded once
- The original payment's status will be updated to `REFUNDED` upon successful refund completion

## Refund Flow Overview

The refund process mirrors the payment flow, requiring user confirmation on a frontend interface:

1. **Backend initiates refund**: Your application creates a refund intent via API
2. **User confirmation**: Redirect user to refund confirmation page using the refund token
3. **Provider processing**: Platform submits refund to payment provider
4. **Completion**: Payment status updated, webhooks delivered

This confirmation flow provides an additional security layer and ensures users are aware of refunds being processed against their payment methods.

## Creating a Refund

**Endpoint**: `POST /payments/:paymentId/refunds`

**Headers**:
```
Authorization: Bearer <tenant-jwt-token>
Idempotency-Key: <unique-refund-key>
Content-Type: application/json
```

**Request Body**:
```json
{
  "reason": "Customer requested refund"
}
```

**Response**:
```json
{
  "id": "refund-intent-uuid",
  "paymentId": "payment-intent-uuid",
  "amount": 5000,
  "currency": "HUF",
  "status": "CREATED",
  "reason": "Customer requested refund",
  "createdAt": "2025-01-13T10:00:00.000Z",
  "updatedAt": "2025-01-13T10:00:00.000Z",
  "expiresAt": "2025-01-13T10:15:00.000Z",
  "refundToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `reason` | string | No | Human-readable reason for the refund (for audit purposes) |

The refund amount is automatically set to the full payment amount in the current version. Partial refunds are not supported.

### Idempotency Keys

Similar to payment creation, the `Idempotency-Key` header is required to prevent duplicate refunds:

```javascript
const idempotencyKey = `refund_${paymentId}_${Date.now()}`;
```

## Refund Token

The refund creation response includes a `refundToken` field. This is a short-lived JWT token that authorizes end users to view and confirm the specific refund without requiring tenant-level credentials.

### Token Characteristics

- **Refund-Scoped**: Token only works for the specific refund it was issued for
- **Short-Lived**: Valid for 15 minutes from issuance
- **One-Time Response**: Only returned when creating a refund, not on subsequent retrievals
- **Secure**: Contains refund ID, payment ID, and tenant ID for verification

### Usage

Use the refund token to redirect your users to the refund confirmation page:

```
https://billing.yourdomain.com/refund/{refundId}?token={refundToken}
```

This allows users to review refund details and confirm the refund operation. The refund token authorizes:

- Viewing the specific refund (`GET /refunds/:id`)
- Confirming the refund (`POST /refunds/:id/confirm`)

Once the refund reaches a terminal state (SUCCEEDED, FAILED, EXPIRED), the token becomes invalid.

## Retrieving a Refund

**Endpoint**: `GET /refunds/:refundId`

**Authentication**: Accepts either tenant JWT or refund token

**Headers (Tenant JWT)**:
```
Authorization: Bearer <tenant-jwt-token>
```

**Query Parameters (Refund Token)**:
```
?token=<refund-token>
```

**Response**:
```json
{
  "id": "refund-intent-uuid",
  "paymentId": "payment-intent-uuid",
  "amount": 5000,
  "currency": "HUF",
  "status": "SUCCEEDED",
  "reason": "Customer requested refund",
  "providerReference": "SIMPLEPAY-REFUND-REF-123",
  "createdAt": "2025-01-13T10:00:00.000Z",
  "updatedAt": "2025-01-13T10:05:00.000Z",
  "expiresAt": "2025-01-13T10:15:00.000Z",
  "payment": {
    "id": "payment-intent-uuid",
    "amount": 5000,
    "currency": "HUF",
    "status": "REFUNDED",
    "createdAt": "2025-01-12T14:00:00.000Z"
  },
  "events": [
    {
      "id": "event-1",
      "eventType": "CREATED",
      "toStatus": "CREATED",
      "createdAt": "2025-01-13T10:00:00.000Z"
    },
    {
      "id": "event-2",
      "eventType": "USER_CONFIRMED",
      "fromStatus": "CREATED",
      "toStatus": "PROCESSING",
      "createdAt": "2025-01-13T10:02:00.000Z"
    },
    {
      "id": "event-3",
      "eventType": "SUCCEEDED",
      "fromStatus": "PROCESSING",
      "toStatus": "SUCCEEDED",
      "createdAt": "2025-01-13T10:05:00.000Z"
    }
  ]
}
```

The response includes the complete audit trail and original payment details for reference.

## Confirming a Refund

User confirmation is required before the refund is submitted to the payment provider. This endpoint is typically called from the frontend refund confirmation page.

**Endpoint**: `POST /refunds/:refundId/confirm`

**Authentication**: Requires refund token (tenant JWT also accepted)

**Headers**:
```
Authorization: Bearer <refund-token>
Idempotency-Key: <unique-confirmation-key>
```

**Response**:
```json
{
  "refundId": "refund-intent-uuid",
  "status": "PROCESSING",
  "message": "Refund is being processed"
}
```

After confirmation, the refund is immediately submitted to the payment provider. The actual processing time depends on the provider, but the status will be updated to `SUCCEEDED` or `FAILED` within seconds.

## Listing Refunds for a Payment

**Endpoint**: `GET /payments/:paymentId/refunds`

**Headers**:
```
Authorization: Bearer <tenant-jwt-token>
```

**Response**:
```json
{
  "data": [
    {
      "id": "refund-intent-uuid",
      "paymentId": "payment-intent-uuid",
      "amount": 5000,
      "currency": "HUF",
      "status": "SUCCEEDED",
      "reason": "Customer requested refund",
      "createdAt": "2025-01-13T10:00:00.000Z",
      "updatedAt": "2025-01-13T10:05:00.000Z"
    }
  ],
  "total": 1
}
```

This endpoint is useful for checking refund history or verifying if a payment has already been refunded.

## Webhook Events

Refund status changes trigger webhook notifications to your configured endpoint. The platform sends the following events:

### refund.created
Sent when a refund intent is created.

```json
{
  "eventType": "refund.created",
  "tenantId": "your-tenant-id",
  "timestamp": "2025-01-13T10:00:00.000Z",
  "data": {
    "refundId": "refund-intent-uuid",
    "paymentId": "payment-intent-uuid",
    "amount": 5000,
    "currency": "HUF"
  }
}
```

### refund.succeeded
Sent when the payment provider confirms the refund.

```json
{
  "eventType": "refund.succeeded",
  "tenantId": "your-tenant-id",
  "timestamp": "2025-01-13T10:05:00.000Z",
  "data": {
    "refundId": "refund-intent-uuid",
    "paymentId": "payment-intent-uuid",
    "amount": 5000,
    "currency": "HUF",
    "providerReference": "SIMPLEPAY-REFUND-REF-123"
  }
}
```

### refund.failed
Sent if the payment provider rejects the refund.

```json
{
  "eventType": "refund.failed",
  "tenantId": "your-tenant-id",
  "timestamp": "2025-01-13T10:05:00.000Z",
  "data": {
    "refundId": "refund-intent-uuid",
    "paymentId": "payment-intent-uuid",
    "amount": 5000,
    "currency": "HUF",
    "error": "Insufficient funds in merchant account"
  }
}
```

See the [Webhooks](./webhooks.md) page for details on webhook signature verification and handling.

## Error Handling

### Common Error Responses

**400 Bad Request - Payment not refundable**
```json
{
  "statusCode": 400,
  "message": "Payment must be in SUCCEEDED status to be refunded (current: PENDING)"
}
```

**400 Bad Request - Already refunded**
```json
{
  "statusCode": 400,
  "message": "Payment has already been refunded"
}
```

**400 Bad Request - Refund expired**
```json
{
  "statusCode": 400,
  "message": "Refund {refundId} has expired. Please create a new refund request."
}
```

**400 Bad Request - Already confirmed**
```json
{
  "statusCode": 400,
  "message": "Refund {refundId} is already in PROCESSING status and cannot be confirmed again."
}
```

**404 Not Found - Payment not found**
```json
{
  "statusCode": 404,
  "message": "Payment with ID {paymentId} not found or does not belong to tenant"
}
```

**404 Not Found - Refund not found**
```json
{
  "statusCode": 404,
  "message": "Refund with ID {refundId} not found or does not belong to tenant"
}
```

**409 Conflict - Idempotency key conflict**
```json
{
  "statusCode": 409,
  "message": "Idempotency key already used with different request payload"
}
```

## Security Considerations

### Refund Authorization

- Only tenant-authenticated requests can initiate refunds
- Refund tokens are required for user confirmation
- Tokens are scoped to specific refunds and cannot be reused
- All refund operations are logged in the audit trail

### Idempotency Protection

- Refund creation requires unique idempotency keys
- Refund confirmation requires separate idempotency keys
- Duplicate requests with the same key return the original response
- Different request bodies with the same key return 409 Conflict

### Tenant Isolation

- Refunds are strictly isolated by tenant
- Cross-tenant refund access is prevented at the database level
- All API endpoints enforce tenant ownership validation

### Webhook Security

- Verify webhook signatures before processing refund events
- Implement idempotency checks in your webhook handlers
- Use HTTPS endpoints for webhook delivery
- Never trust refund status from frontend redirects alone

## Best Practices

### Refund Initiation

- Always verify payment ownership before allowing refund creation
- Provide clear refund reasons for audit purposes
- Implement user-facing refund policies in your application
- Check payment status before initiating refund to avoid errors

### User Experience

- Display refund amount and original payment details on confirmation page
- Set clear expectations about refund processing time
- Provide fallback mechanisms if refund token expires
- Show refund status updates in user account dashboard

### Error Handling

- Handle expired refund tokens gracefully
- Provide retry mechanisms for failed refunds
- Log all refund operations for debugging
- Alert administrators when refunds fail repeatedly

### Webhook Processing

- Process `refund.succeeded` webhooks to update order status
- Handle `refund.failed` webhooks to notify users and support
- Implement exponential backoff for webhook retries
- Store webhook payloads for audit purposes

### Monitoring

- Track refund success rates per payment method
- Monitor refund processing times
- Alert on unusual refund patterns
- Review failed refunds regularly

## Limitations

### Current Version (V1)

- Only full refunds are supported
- One refund per payment maximum
- Refund confirmation required (cannot be automated)
- No partial refund functionality

### Future Enhancements (Planned)

- Partial refund support (multiple refunds per payment)
- Automatic refund processing (skip user confirmation)
- Refund reason categorization
- Refund expiration background worker
- Bulk refund operations

## Next Steps

After implementing refunds, review the [Best Practices](./best-practices.md) guide for security and reliability recommendations.
