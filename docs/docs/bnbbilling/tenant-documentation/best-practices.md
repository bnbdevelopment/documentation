---
sidebar_position: 6
---

# Best Practices

This page provides guidelines for building a secure, reliable integration with the billing platform.

## Security

### Credential Management

**Never expose credentials in frontend code**. Tenant secrets must remain on your backend.

```javascript
// WRONG - Never do this
const payment = await fetch('https://billing-api.com/payments', {
  headers: {
    'Authorization': `Bearer ${HARDCODED_TOKEN}` // Exposed to users
  }
});

// CORRECT - Proxy through your backend
// Frontend calls your backend
const payment = await fetch('/api/create-payment', {
  headers: {
    'Authorization': `Bearer ${userSessionToken}` // Your app's auth
  },
  body: JSON.stringify({ amount, currency })
});

// Your backend calls billing platform
app.post('/api/create-payment', authenticateUser, async (req, res) => {
  const billingToken = await billingAuth.getToken(); // Secure backend credential
  const payment = await fetch('https://billing-api.com/payments', {
    headers: { 'Authorization': `Bearer ${billingToken}` }
  });
  res.json(payment);
});
```

**Credential storage**:
- Use environment variables for secrets
- Rotate credentials periodically
- Limit access to production credentials
- Use different credentials for staging and production

### Input Validation

Always validate user input before creating payment intents:

```javascript
function validatePaymentRequest(amount, currency) {
  // Validate amount ranges
  const limits = {
    HUF: { min: 100, max: 1000000000 },
    EUR: { min: 50, max: 100000000 },
    USD: { min: 50, max: 100000000 }
  };

  if (!limits[currency]) {
    throw new Error('Invalid currency');
  }

  if (amount < limits[currency].min || amount > limits[currency].max) {
    throw new Error('Amount out of range');
  }

  // Validate amount is an integer
  if (!Number.isInteger(amount)) {
    throw new Error('Amount must be an integer');
  }
}
```

### Webhook Security

- Verify webhook signatures on every request
- Use timing-safe comparisons to prevent timing attacks
- Reject requests with invalid or missing signatures
- Log suspicious webhook activity

```javascript
// Use crypto.timingSafeEqual for signature comparison
const isValid = crypto.timingSafeEqual(
  Buffer.from(receivedSignature),
  Buffer.from(expectedSignature)
);
```

## Reliability

### Idempotency Keys

Generate stable idempotency keys that remain consistent across retries:

```javascript
// WRONG - Random key changes on retry
const idempotencyKey = crypto.randomBytes(16).toString('hex');

// CORRECT - Deterministic key based on operation
const idempotencyKey = `payment_${userId}_${orderId}_${timestamp}`;
```

**Idempotency key composition**:
- Include user ID to scope per user
- Include order/transaction ID to prevent duplicate orders
- Include timestamp or unique order identifier
- Do not include random values

### Error Handling

Implement comprehensive error handling for API requests:

```javascript
async function createPaymentWithRetry(paymentData, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await billingApi.createPayment(paymentData);
      return response;
    } catch (error) {
      // Don't retry client errors (4xx)
      if (error.status >= 400 && error.status < 500) {
        throw error;
      }

      // Retry server errors (5xx) or network issues
      if (attempt === maxRetries) {
        throw new Error(`Payment creation failed after ${maxRetries} attempts`);
      }

      // Exponential backoff
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

### Webhook Idempotency

Persist processed webhook event IDs to prevent duplicate processing:

```javascript
// Database schema for tracking processed webhooks
CREATE TABLE webhook_events (
  event_id VARCHAR(255) PRIMARY KEY,
  event_type VARCHAR(100) NOT NULL,
  processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  payment_id VARCHAR(255),
  INDEX idx_payment_id (payment_id)
);

// Check before processing
async function isWebhookProcessed(eventId) {
  const existing = await db.query(
    'SELECT 1 FROM webhook_events WHERE event_id = ?',
    [eventId]
  );
  return existing.length > 0;
}

// Mark as processed
async function markWebhookProcessed(eventId, eventType, paymentId) {
  await db.query(
    'INSERT INTO webhook_events (event_id, event_type, payment_id) VALUES (?, ?, ?)',
    [eventId, eventType, paymentId]
  );
}
```

### Graceful Degradation

Handle platform unavailability gracefully:

```javascript
async function createPayment(paymentData) {
  try {
    return await billingApi.createPayment(paymentData);
  } catch (error) {
    if (error.code === 'ECONNREFUSED' || error.status === 503) {
      // Platform temporarily unavailable
      await queuePaymentForRetry(paymentData);
      throw new Error('Payment system temporarily unavailable. Your request has been queued.');
    }
    throw error;
  }
}
```

## Performance

### Token Caching

Cache JWT tokens to reduce authentication overhead:

```javascript
class TokenCache {
  constructor(authService) {
    this.authService = authService;
    this.token = null;
    this.expiresAt = null;
  }

  async getToken() {
    const now = Date.now();

    // Return cached token if valid for at least 5 more minutes
    if (this.token && this.expiresAt > now + (5 * 60 * 1000)) {
      return this.token;
    }

    // Fetch new token
    const response = await this.authService.login();
    this.token = response.accessToken;
    this.expiresAt = now + (23 * 60 * 60 * 1000); // 23 hours

    return this.token;
  }
}
```

### Request Batching

When listing payments, use pagination efficiently:

```javascript
async function getAllUserPayments(userId) {
  const allPayments = [];
  let offset = 0;
  const limit = 100; // Max allowed

  while (true) {
    const response = await billingApi.listPayments({
      userId,
      limit,
      offset
    });

    allPayments.push(...response.data);

    if (response.data.length < limit) {
      break; // No more results
    }

    offset += limit;
  }

  return allPayments;
}
```

### Webhook Processing

Process webhooks asynchronously to avoid blocking:

```javascript
app.post('/webhooks/billing', async (req, res) => {
  // Verify and acknowledge immediately
  if (!verifySignature(req)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  res.status(200).json({ received: true });

  // Process asynchronously using job queue
  await jobQueue.add('process-webhook', {
    eventId: req.body.eventId,
    eventType: req.body.eventType,
    data: req.body.data
  });
});

// Worker processes webhooks from queue
jobQueue.process('process-webhook', async (job) => {
  const { eventId, eventType, data } = job.data;
  await handleWebhookEvent(eventId, eventType, data);
});
```

## Monitoring and Observability

### Log Key Events

Log all payment operations for debugging and auditing:

```javascript
logger.info('Payment created', {
  paymentId: payment.id,
  userId: payment.userId,
  amount: payment.amount,
  currency: payment.currency,
  idempotencyKey
});

logger.info('Webhook received', {
  eventId: webhook.eventId,
  eventType: webhook.eventType,
  paymentId: webhook.data.paymentId
});

logger.error('Payment creation failed', {
  userId,
  amount,
  currency,
  error: error.message,
  stack: error.stack
});
```

### Track Metrics

Monitor critical metrics:

- Payment success rate
- Average payment processing time
- Webhook delivery success rate
- API error rates (by endpoint and status code)
- Token refresh frequency

```javascript
// Example: Prometheus metrics
const paymentSuccessCounter = new Counter({
  name: 'billing_payments_success_total',
  help: 'Total successful payments'
});

const paymentFailureCounter = new Counter({
  name: 'billing_payments_failure_total',
  help: 'Total failed payments',
  labelNames: ['reason']
});

const webhookDuration = new Histogram({
  name: 'billing_webhook_processing_duration_seconds',
  help: 'Webhook processing duration'
});
```

### Alerting

Set up alerts for critical failures:

- Webhook endpoint returning errors for extended period
- Payment success rate drops below threshold
- Spike in payment failures
- API authentication failures

## User Experience

### Provide Clear Status Updates

Keep users informed throughout the payment flow:

```javascript
// Show appropriate messages based on payment status
const statusMessages = {
  CREATED: 'Initializing payment...',
  PROVIDER_PENDING: 'Processing your payment. This may take a few moments.',
  SUCCEEDED: 'Payment successful! Thank you for your purchase.',
  FAILED: 'Payment failed. Please check your payment details and try again.',
  EXPIRED: 'Payment session expired. Please start a new payment.',
  CANCELLED: 'Payment cancelled.'
};

function displayPaymentStatus(status) {
  const message = statusMessages[status] || 'Unknown payment status';
  updateUI(message);
}
```

### Handle Edge Cases

- Payment pending after user returns: Show "processing" state with polling
- Payment expired: Offer option to create new payment
- Payment failed: Provide clear error message and retry option
- Network errors: Show user-friendly message, avoid technical jargon

### Optimize Checkout Flow

- Minimize steps between payment creation and redirect
- Pre-fill user information when possible (email, name)
- Provide estimated processing time
- Show clear call-to-action buttons

## Testing

### Test Environments

Use separate tenant accounts for staging and production:

- **Staging**: Test all integration points without real charges
- **Production**: Live payments with real credentials

### Test Scenarios

Verify your integration handles:

1. Successful payment flow
2. Failed payment (declined card)
3. Expired payment (user doesn't complete in time)
4. Cancelled payment
5. Duplicate webhook delivery
6. Webhook signature verification failure
7. Network timeout during payment creation
8. Token expiration and refresh
9. Idempotency key conflict

### Load Testing

Test your webhook endpoint under load:

```javascript
// Simulate concurrent webhook deliveries
async function loadTestWebhooks(concurrency = 50, total = 1000) {
  const webhooks = Array.from({ length: total }, (_, i) => ({
    eventId: `event-${i}`,
    eventType: 'payment.succeeded',
    data: { paymentId: `payment-${i}`, userId: 'user-123', amount: 5000 }
  }));

  await Promise.all(
    Array.from({ length: concurrency }, async () => {
      while (webhooks.length > 0) {
        const webhook = webhooks.pop();
        await fetch('https://your-app.com/webhooks/billing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(webhook)
        });
      }
    })
  );
}
```

## Summary Checklist

Before going live, ensure:

- [ ] Tenant credentials stored securely in environment variables
- [ ] All API calls proxied through your backend (never from frontend)
- [ ] Idempotency keys generated deterministically
- [ ] Webhook signature verification implemented
- [ ] Webhook idempotency enforced (deduplicate by `eventId`)
- [ ] Payment status verified on backend before granting access
- [ ] Error handling and retry logic implemented
- [ ] JWT token caching implemented
- [ ] Logging configured for all payment operations
- [ ] Monitoring and alerting configured
- [ ] Tested all payment scenarios (success, failure, expiration)
- [ ] Load tested webhook endpoint
- [ ] Staging environment tested end-to-end
- [ ] Documentation reviewed and integration understood

Following these best practices ensures your integration is secure, reliable, and provides a smooth user experience.
