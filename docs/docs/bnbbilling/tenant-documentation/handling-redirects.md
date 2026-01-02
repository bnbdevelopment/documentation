---
sidebar_position: 4
---

# Handling Redirects

This page covers the frontend checkout flow, including redirecting users to the payment provider and handling their return.

## Payment Provider Checkout Flow

After creating a payment intent, you must redirect users to the payment provider's checkout page. The platform generates a provider-specific checkout URL when the payment intent is initialized.

### Checkout URL Generation

The `checkoutUrl` field becomes available after the payment intent transitions to `PROVIDER_PENDING` status. This occurs automatically when the platform registers the payment with the configured provider.

**Typical Flow**:
1. Create payment intent via API (status: `CREATED`)
2. Platform initializes payment with provider (status: `PROVIDER_PENDING`, `checkoutUrl` generated)
3. Poll the payment intent or wait a brief moment for initialization
4. Redirect user to `checkoutUrl`

### Obtaining the Checkout URL

After creating the payment, retrieve it to check for the checkout URL:

```javascript
async function initiateCheckout(paymentService, userId, amount, currency) {
  // Create payment intent
  const payment = await paymentService.createPayment(
    userId,
    amount,
    currency,
    { orderId: 'order-123' }
  );

  // Wait briefly for provider initialization (typically < 1 second)
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Retrieve updated payment with checkout URL
  const updatedPayment = await paymentService.getPayment(payment.id);

  if (!updatedPayment.checkoutUrl) {
    throw new Error('Checkout URL not yet available');
  }

  return updatedPayment.checkoutUrl;
}
```

### Redirecting the User

Once you have the checkout URL, redirect the user to complete payment:

```javascript
// Frontend redirect
window.location.href = checkoutUrl;
```

The user will be directed to the payment provider's secure checkout page, where they enter payment details and complete the transaction.

## Return URLs

When configuring your tenant account, you provide return URLs for different payment outcomes. Users are redirected to these URLs after completing or abandoning the payment.

### Return URL Structure

Configure the following return URLs with your tenant account:

- **Success URL**: Where users are sent after successful payment
- **Cancel URL**: Where users are sent if they abandon the payment
- **Error URL**: Where users are sent if an error occurs

**Example return URLs**:
```
https://your-app.com/checkout/success?paymentId={PAYMENT_ID}
https://your-app.com/checkout/cancel?paymentId={PAYMENT_ID}
https://your-app.com/checkout/error?paymentId={PAYMENT_ID}
```

The platform automatically replaces `{PAYMENT_ID}` with the actual payment intent ID.

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
