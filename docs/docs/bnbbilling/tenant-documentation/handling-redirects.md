---
sidebar_position: 4
---

# Handling Redirects

This page covers the frontend checkout flow, including redirecting users to the billing platform's payment page.

## Hosted Payment Page Flow

After creating a payment intent, redirect your users to the billing platform's hosted payment page using the checkout token. The platform handles all provider communication and checkout UI.

### Checkout URL Structure

When you create a payment, the response includes a `checkoutToken`. Use this token to construct the checkout URL:

```
https://billing.yourdomain.com/payment/{paymentId}?token={checkoutToken}
```

**Flow**:
1. Backend creates payment intent and receives `checkoutToken`
2. Backend returns checkout URL to frontend
3. Frontend redirects user to billing platform's payment page
4. User reviews payment details and confirms
5. Platform initializes payment with provider
6. User completes payment on provider's secure page
7. User is redirected back to your application

### Redirecting Users to Checkout

After creating the payment, redirect your users to the hosted payment page:

```javascript
// Backend: Create payment and return checkout URL
app.post('/api/checkout', authenticateUser, async (req, res) => {
  const { amount, currency, metadata } = req.body;
  const userId = req.user.id;

  try {
    // Create payment intent
    const payment = await paymentService.createPayment(
      userId,
      amount,
      currency,
      metadata
    );

    // Build checkout URL with token
    const checkoutUrl = `${process.env.BILLING_UI_URL}/payment/${payment.id}?token=${payment.checkoutToken}`;

    res.json({
      checkoutUrl,
      paymentId: payment.id,
      expiresAt: payment.expiresAt
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create payment' });
  }
});

// Frontend: Redirect user to checkout
async function initiateCheckout(amount, currency, metadata) {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    },
    body: JSON.stringify({ amount, currency, metadata })
  });

  const data = await response.json();

  // Redirect user to hosted payment page
  window.location.href = data.checkoutUrl;
}
```

### Hosted Payment Page Features

The billing platform's hosted payment page provides:

- Professional payment UI with your branding
- Payment detail review and confirmation
- Provider selection (if multiple providers configured)
- Automatic provider initialization
- Secure redirect to payment provider
- Built-in error handling and retry logic
- Mobile-responsive design

## Return URLs

The billing platform handles payment provider redirects and displays the payment outcome to users. After viewing the result, users can return to your application via a configured return URL.

### Configuring Return URL

When registering your tenant, provide a return URL where users should be redirected after viewing their payment status:

**Example return URL**:
```
https://your-app.com/checkout/complete?paymentId={PAYMENT_ID}&status={STATUS}
```

The platform automatically replaces:
- `{PAYMENT_ID}` with the actual payment intent ID
- `{STATUS}` with the final payment status (succeeded, failed, cancelled, expired)

## Handling User Return

When users return to your application, extract the payment ID from the URL and query the platform for the authoritative payment status.

### Important: Do Not Trust Frontend Status

The return URL (success, cancel, error) is informational only. Users can manipulate URLs or close their browser before returning. Always verify payment status on your backend.

**Frontend handler example**:
```javascript
// Frontend: Checkout success page
async function handleCheckoutReturn() {
  const urlParams = new URLSearchParams(window.location.search);
  const paymentId = urlParams.get('paymentId');

  if (!paymentId) {
    showError('Invalid return from payment provider');
    return;
  }

  // Call your backend to verify payment status
  const response = await fetch(`/api/verify-payment/${paymentId}`, {
    headers: {
      'Authorization': `Bearer ${userSessionToken}`
    }
  });

  const result = await response.json();

  if (result.status === 'SUCCEEDED') {
    showSuccess('Payment successful!');
    // Activate subscription, download content, etc.
  } else if (result.status === 'FAILED') {
    showError('Payment failed. Please try again.');
  } else {
    showWarning('Payment pending. We will notify you when it completes.');
  }
}
```

**Backend verification endpoint**:
```javascript
// Backend: Verify payment status
app.get('/api/verify-payment/:paymentId', authenticateUser, async (req, res) => {
  const { paymentId } = req.params;
  const userId = req.user.id;

  // Fetch payment from billing platform
  const payment = await paymentService.getPayment(paymentId);

  // Verify the payment belongs to the current user
  if (payment.userId !== userId) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  // Return status to frontend
  res.json({
    status: payment.status,
    amount: payment.amount,
    currency: payment.currency
  });
});
```

## Payment Status Interpretation

| Status | Meaning | Frontend Action |
|--------|---------|----------------|
| `CREATED` | Payment not yet initialized | Show loading state |
| `PROVIDER_PENDING` | User redirected, awaiting completion | Show pending message |
| `SUCCEEDED` | Payment confirmed | Grant access, show success |
| `FAILED` | Payment declined | Show error, offer retry |
| `EXPIRED` | Payment timeout (not completed within expiration window) | Show timeout message |
| `CANCELLED` | Payment manually canceled | Show cancellation message |

## Pending Payments

Payments may remain in `PROVIDER_PENDING` status briefly while the provider processes the webhook. Do not assume immediate success or failure when users return.

### Recommended Approach

1. Show a "processing" message when status is `PROVIDER_PENDING`
2. Implement polling or webhook-triggered notifications
3. Update the UI when final status is received

```javascript
async function pollPaymentStatus(paymentId, maxAttempts = 10) {
  for (let i = 0; i < maxAttempts; i++) {
    const payment = await fetch(`/api/verify-payment/${paymentId}`).then(r => r.json());

    if (payment.status === 'SUCCEEDED' || payment.status === 'FAILED') {
      return payment.status;
    }

    // Wait 2 seconds before next poll
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Status still pending after polling
  return 'PENDING';
}
```

## Timeout and Expiration

Payment intents expire after a configured duration (default: 15 minutes). If a user does not complete payment within this window, the intent transitions to `EXPIRED` status.

Handle expired payments gracefully:

```javascript
if (payment.status === 'EXPIRED') {
  showMessage('This payment session has expired. Please create a new payment.');
  // Offer option to create a new payment intent
}
```

## Mobile and Single-Page Applications

For mobile apps or SPAs, consider using deep links or custom URL schemes for return URLs:

```
your-app://checkout/success?paymentId={PAYMENT_ID}
```

Ensure your app handles these URLs and verifies payment status on your backend before granting access.

## Next Steps

To receive real-time payment status updates, configure [webhook handling](./webhooks.md).
