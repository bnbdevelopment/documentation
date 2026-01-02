---
sidebar_position: 5
---

# Webhooks

Webhooks provide real-time notifications when payment status changes. This is the authoritative mechanism for confirming payment success.

## Why Webhooks Are Essential

The billing platform uses webhooks to notify your application of payment events. Webhooks are more reliable than frontend redirects because:

- Users may close their browser before returning to your site
- Network issues can prevent redirects from completing
- Users can manipulate redirect URLs

**Critical Rule**: Only grant access or fulfill orders after receiving a `payment.succeeded` webhook. Do not rely solely on frontend confirmation.

## Webhook Endpoint Setup

During tenant registration, you provide a webhook URL where the platform will send payment notifications.

**Webhook URL Requirements**:
- Must use HTTPS (TLS/SSL)
- Must respond within 10 seconds
- Should return HTTP 200-299 for successful processing
- Must be publicly accessible (no localhost or internal IPs)

**Example webhook URL**:
```
https://your-app.com/api/webhooks/billing
```

## Webhook Payload Structure

The platform sends webhook notifications as POST requests with a JSON payload.

**Headers**:
```
Content-Type: application/json
X-Webhook-Signature: <hmac-signature>
X-Webhook-Event: payment.succeeded
X-Webhook-Id: <unique-event-id>
```

**Payload Example**:
```json
{
  "eventId": "webhook-event-uuid",
  "eventType": "payment.succeeded",
  "timestamp": "2025-01-03T10:05:00.000Z",
  "tenantId": "your-tenant-id",
  "data": {
    "paymentId": "payment-intent-uuid",
    "userId": "user-123",
    "amount": 5000,
    "currency": "HUF",
    "status": "SUCCEEDED",
    "provider": "simplepay",
    "providerReference": "SIMPLEPAY-REF-123",
    "metadata": {
      "orderId": "order-456",
      "productName": "Premium Subscription"
    }
  }
}
```

## Webhook Event Types

| Event Type | Description |
|------------|-------------|
| `payment.succeeded` | Payment confirmed successfully |
| `payment.failed` | Payment declined or failed |
| `payment.expired` | Payment intent expired without completion |
| `payment.refunded` | Payment was refunded |

## Implementing Webhook Handling

### 1. Verify Webhook Signature

Always verify the webhook signature to ensure requests come from the billing platform.

**Signature Algorithm**:
The `X-Webhook-Signature` header contains an HMAC-SHA256 signature of the request body, signed with your tenant secret.

```javascript
const crypto = require('crypto');

function verifyWebhookSignature(rawBody, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
```

**Important**: Use the raw request body (before JSON parsing) for signature verification.

### 2. Enforce Idempotency

Webhooks may be delivered multiple times due to network retries. Use the `eventId` to deduplicate events.

```javascript
const processedEvents = new Set(); // In production, use a database

async function handleWebhook(eventId, eventType, data) {
  // Check if already processed
  if (processedEvents.has(eventId)) {
    console.log(`Event ${eventId} already processed, skipping`);
    return;
  }

  // Process the event
  await processEvent(eventType, data);

  // Mark as processed
  processedEvents.add(eventId);
}
```

### 3. Process Events Asynchronously

Webhook handlers should acknowledge receipt quickly (within 10 seconds). Perform long-running operations asynchronously.

```javascript
app.post('/api/webhooks/billing', async (req, res) => {
  const rawBody = req.rawBody; // Captured by middleware
  const signature = req.headers['x-webhook-signature'];

  // Verify signature
  if (!verifyWebhookSignature(rawBody, signature, process.env.TENANT_SECRET)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const { eventId, eventType, data } = req.body;

  // Acknowledge receipt immediately
  res.status(200).json({ received: true });

  // Process asynchronously
  try {
    await handleWebhook(eventId, eventType, data);
  } catch (error) {
    console.error('Webhook processing failed:', error);
    // Log error, but do not fail the response (already sent 200)
  }
});
```

## Example: Complete Webhook Handler

```javascript
const express = require('express');
const crypto = require('crypto');

const app = express();

// Middleware to capture raw body for signature verification
app.use('/api/webhooks/billing', express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString('utf8');
  }
}));

app.post('/api/webhooks/billing', async (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  const rawBody = req.rawBody;

  // Verify signature
  const expectedSignature = crypto
    .createHmac('sha256', process.env.TENANT_SECRET)
    .update(rawBody)
    .digest('hex');

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const { eventId, eventType, data } = req.body;

  // Check idempotency (pseudo-code, use database in production)
  const alreadyProcessed = await db.webhookEvents.exists({ eventId });
  if (alreadyProcessed) {
    return res.status(200).json({ received: true, duplicate: true });
  }

  // Acknowledge immediately
  res.status(200).json({ received: true });

  // Process event asynchronously
  setImmediate(async () => {
    try {
      await db.webhookEvents.create({ eventId, processedAt: new Date() });

      if (eventType === 'payment.succeeded') {
        await handlePaymentSuccess(data);
      } else if (eventType === 'payment.failed') {
        await handlePaymentFailure(data);
      } else if (eventType === 'payment.refunded') {
        await handlePaymentRefund(data);
      }
    } catch (error) {
      console.error(`Failed to process webhook ${eventId}:`, error);
      // Alert monitoring system
    }
  });
});

async function handlePaymentSuccess(data) {
  const { paymentId, userId, metadata } = data;

  // Activate subscription
  await db.subscriptions.activate({
    userId,
    paymentId,
    orderId: metadata.orderId
  });

  // Send confirmation email
  await emailService.sendPaymentConfirmation(userId, metadata);

  console.log(`Payment ${paymentId} succeeded for user ${userId}`);
}

async function handlePaymentFailure(data) {
  const { paymentId, userId } = data;

  // Notify user of failure
  await emailService.sendPaymentFailure(userId);

  console.log(`Payment ${paymentId} failed for user ${userId}`);
}

async function handlePaymentRefund(data) {
  const { paymentId, userId } = data;

  // Deactivate subscription or reverse order
  await db.subscriptions.cancel({ paymentId });

  // Notify user of refund
  await emailService.sendRefundNotification(userId);

  console.log(`Payment ${paymentId} refunded for user ${userId}`);
}
```

## Webhook Retry Logic

If your webhook endpoint returns an error (HTTP 400+) or times out, the platform will retry delivery with exponential backoff:

- 1st retry: 30 seconds after failure
- 2nd retry: 2 minutes after failure
- 3rd retry: 10 minutes after failure
- 4th retry: 1 hour after failure
- 5th retry: 6 hours after failure

After 5 failed attempts, webhook delivery stops. Monitor webhook failures and investigate issues promptly.

## Testing Webhooks

During development, use a tool like [ngrok](https://ngrok.com/) or [localtunnel](https://localtunnel.github.io/) to expose your local server to the internet.

**Example with ngrok**:
```bash
ngrok http 3000
```

Use the generated HTTPS URL as your webhook endpoint during tenant registration.

## Security Best Practices

1. **Always verify signatures**: Reject requests with invalid signatures
2. **Use HTTPS only**: Never accept webhooks over HTTP
3. **Implement idempotency**: Deduplicate events using `eventId`
4. **Validate payload structure**: Ensure required fields are present
5. **Rate limit webhook endpoints**: Protect against abuse
6. **Log all webhook receipts**: Maintain an audit trail
7. **Monitor webhook failures**: Alert on repeated failures

## Debugging Webhook Issues

If webhooks are not being received:

1. Verify your webhook URL is accessible from the internet
2. Check firewall and security group rules
3. Confirm your endpoint responds with HTTP 200
4. Review application logs for errors
5. Contact platform support to view webhook delivery logs

## Next Steps

Review [best practices](./best-practices.md) for security, reliability, and performance optimization.
