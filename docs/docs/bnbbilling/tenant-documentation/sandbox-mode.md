---
sidebar_position: 7
---

# Sandbox Mode

Sandbox mode allows you to test the complete payment flow without processing real transactions or incurring actual charges. This is ideal for development, testing, and integration verification.

## Overview

When a tenant is registered with sandbox mode enabled, all payment operations use a simulated payment provider instead of real payment processors like SimplePay. This enables you to:

- Test your integration without real financial transactions
- Simulate different payment outcomes (success, failure, timeout)
- Verify webhook handling and error scenarios
- Train your team on the payment flow
- Demonstrate payment functionality to stakeholders

:::warning Immutable Setting
The sandbox flag is set during tenant registration and **cannot be changed** afterward. If you need to switch between sandbox and production, you must register separate tenant accounts.
:::

## Key Differences from Production

| Aspect | Sandbox Mode | Production Mode |
|--------|--------------|-----------------|
| Payment Provider | Simulated (sandbox) | Real (SimplePay, etc.) |
| Money Transfer | None - simulated only | Actual financial transactions |
| Invoicing | Disabled | Enabled (Billingo integration) |
| Payment Outcomes | User-selectable simulation | Determined by real payment provider |
| Webhook Events | Sent for all simulated events | Sent for real provider events |

## Registering a Sandbox Tenant

Sandbox tenants are registered by platform administrators. When requesting registration, specify that you need a sandbox tenant:

```json
POST /tenants/register
X-Admin-Key: <admin-api-key>
Content-Type: application/json

{
  "name": "My SaaS App - Sandbox",
  "webhookUrl": "https://staging.myapp.com/webhooks/billing",
  "sandbox": true
}
```

The registration response will include your credentials and confirm sandbox status:

```json
{
  "id": "tenant-uuid",
  "appId": "my-saas-app-sandbox",
  "appSecret": "sk_sandbox_...",
  "name": "My SaaS App - Sandbox",
  "sandbox": true,
  "status": "ACTIVE",
  "createdAt": "2025-01-31T00:00:00.000Z"
}
```

:::tip
Use a descriptive name like "MyApp - Sandbox" to easily distinguish sandbox from production tenants.
:::

## Sandbox Payment Flow

The payment flow in sandbox mode follows the same steps as production, with a simulated checkout page:

### 1. Create Payment Intent

Create a payment using the standard API (identical to production):

```javascript
const payment = await createPayment({
  userId: 'user-123',
  amount: 5000,
  currency: 'HUF',
  metadata: { orderId: 'test-order-1' }
});

// Response includes sandbox: true
{
  "id": "payment-uuid",
  "status": "CREATED",
  "provider": "sandbox",
  "sandbox": true,
  "checkoutToken": "eyJhbGci...",
  ...
}
```

### 2. Redirect to Sandbox Checkout

Redirect users to the checkout URL as normal:

```
https://billing.yourdomain.com/payment/{paymentId}?token={checkoutToken}
```

The hosted payment page will display:
- **Sandbox banner** - Prominent warning that this is test mode
- **Test mode badge** - Visible on all wizard steps
- Standard payment wizard (Review → Provider → Confirm)

### 3. Sandbox Checkout Page

After clicking "Proceed to Payment", users are redirected to a **sandbox checkout simulator** instead of a real payment provider:

The simulator provides three outcome buttons:

#### Complete Test Payment (Success)
- Transitions payment to `SUCCEEDED` status
- Triggers `payment.succeeded` webhook
- No invoice is created (invoicing disabled in sandbox)
- Redirects to success status page

#### Simulate Failed Payment
- Transitions payment to `FAILED` status
- Triggers `payment.failed` webhook
- Redirects to failure status page
- User can retry or create a new payment

#### Simulate Timeout (Expired)
- Transitions payment to `EXPIRED` status
- Triggers `payment.expired` webhook
- Redirects to expired status page
- Simulates a payment that wasn't completed within the time limit

### 4. Status Page

After selecting an outcome, users are redirected to the payment status page, which displays the sandbox banner and the simulated result.

## Testing Webhooks

Sandbox mode sends real webhook events to your configured webhook URL, allowing you to test your webhook handling logic:

### Successful Payment Webhook
```json
POST https://your-app.com/webhooks/billing
Content-Type: application/json

{
  "eventType": "payment.succeeded",
  "paymentId": "payment-uuid",
  "userId": "user-123",
  "amount": 5000,
  "currency": "HUF",
  "status": "SUCCEEDED",
  "sandbox": true,
  "timestamp": "2025-01-31T12:00:00.000Z"
}
```

### Failed Payment Webhook
```json
{
  "eventType": "payment.failed",
  "paymentId": "payment-uuid",
  "status": "FAILED",
  "sandbox": true,
  ...
}
```

### Expired Payment Webhook
```json
{
  "eventType": "payment.expired",
  "paymentId": "payment-uuid",
  "status": "EXPIRED",
  "sandbox": true,
  ...
}
```

:::note
All webhook payloads include `"sandbox": true` to help you distinguish sandbox events from production events in your webhook handler.
:::

## Testing Refunds

Refunds work in sandbox mode with simulated processing:

### 1. Create Refund

```javascript
const refund = await createRefund(paymentId, {
  amount: 5000,
  reason: 'Test refund'
});
```

### 2. User Confirmation

The user receives a refund token and visits the refund confirmation page, which shows the sandbox banner.

### 3. Simulated Processing

When confirmed, the refund is processed immediately with a simulated provider response:

- Refund transitions to `SUCCEEDED` instantly
- Payment status updates to `REFUNDED`
- `payment.refunded` webhook is sent
- No real money is refunded (sandbox mode)

```json
{
  "eventType": "payment.refunded",
  "paymentId": "payment-uuid",
  "refundId": "refund-uuid",
  "amount": 5000,
  "status": "REFUNDED",
  "sandbox": true
}
```

## Visual Indicators

All frontend pages in sandbox mode display visual indicators:

### Sandbox Banner
A prominent amber/yellow banner appears on all pages:

```
⚠️ SANDBOX MODE - This is a test environment
No real payment will be processed. All transactions are simulated.
```

### Badge Updates
- "Secure Payment" badge changes to **"Test Mode"**
- Provider name shows **"Sandbox (Test Mode)"** with 🧪 icon
- Security notices change to amber styling

## Best Practices

### 1. Separate Sandbox and Production

Maintain distinct tenant accounts and configurations:

```javascript
// config/billing.js
const billingConfig = {
  sandbox: {
    appId: 'myapp-sandbox',
    appSecret: process.env.BILLING_SANDBOX_SECRET,
    apiUrl: 'https://api.billing.yourdomain.com'
  },
  production: {
    appId: 'myapp-production',
    appSecret: process.env.BILLING_PRODUCTION_SECRET,
    apiUrl: 'https://api.billing.yourdomain.com'
  }
};

const config = process.env.NODE_ENV === 'production'
  ? billingConfig.production
  : billingConfig.sandbox;
```

### 2. Test All Scenarios

Use sandbox mode to test:

- Successful payments
- Failed payments
- Expired payments
- Webhook delivery and retries
- Full and partial refunds
- Edge cases and error handling
- Payment cancellation
- Email notifications (if applicable)

### 3. Webhook Testing

Verify your webhook handler correctly:

```javascript
app.post('/webhooks/billing', async (req, res) => {
  const event = req.body;

  // Log sandbox events separately
  if (event.sandbox) {
    logger.info('Sandbox webhook received', { eventType: event.eventType });
  }

  // Process event (same logic for both modes)
  await processPaymentEvent(event);

  res.status(200).send('OK');
});
```

### 4. Environment Detection

Add visual indicators in your app when using sandbox:

```javascript
// Frontend component
function PaymentButton({ isSandbox }) {
  return (
    <div>
      {isSandbox && (
        <div className="bg-amber-100 border-amber-300 p-2 mb-4">
          ⚠️ Test Mode - No real charges will occur
        </div>
      )}
      <button>Proceed to Checkout</button>
    </div>
  );
}
```

### 5. Data Isolation

Keep sandbox test data separate:

```javascript
// Mark sandbox transactions in your database
await db.payments.create({
  externalPaymentId: payment.id,
  userId: user.id,
  amount: payment.amount,
  isSandbox: payment.sandbox, // Flag for filtering
  status: payment.status
});
```

## Limitations

### What Sandbox Does NOT Do

1. **No Real Money Movement**: Sandbox transactions are purely simulated
2. **No Invoicing**: Billingo integration is disabled; no invoices are created or cancelled
3. **No Real Provider Integration**: SimplePay (or other providers) is never contacted
4. **No Production Data**: Sandbox and production tenants are completely isolated
5. **No Mode Switching**: Cannot convert sandbox tenant to production or vice versa

### What Sandbox DOES Do

1. **Full API Coverage**: All endpoints work identically to production
2. **Real Webhooks**: Webhook events are sent to your configured URL
3. **State Machine**: Payment lifecycle and state transitions are identical
4. **Token Security**: Checkout tokens and JWT authentication work the same way
5. **Validation**: All request validation and error handling is identical

## Transitioning to Production

When ready to go live:

1. **Register Production Tenant**: Contact platform administrators for production tenant registration (without `sandbox: true`)
2. **Update Credentials**: Switch to production `appId` and `appSecret` in your environment
3. **Configure Production Webhooks**: Ensure production webhook URL is accessible
4. **Test in Production**: Start with small test transactions to verify integration
5. **Monitor**: Watch logs and webhooks for any issues
6. **Keep Sandbox**: Maintain your sandbox tenant for ongoing testing and development

## Example: Full Test Scenario

```javascript
// 1. Authenticate with sandbox credentials
const auth = await login({
  appId: 'myapp-sandbox',
  appSecret: process.env.BILLING_SANDBOX_SECRET
});

// 2. Verify tenant info shows sandbox mode
const tenant = await getTenantInfo(auth.token);
console.log(tenant.sandbox); // true

// 3. Create test payment
const payment = await createPayment(auth.token, {
  userId: 'test-user-1',
  amount: 1000,
  currency: 'HUF',
  metadata: { testCase: 'success_flow' }
});

console.log(payment.provider); // "sandbox"
console.log(payment.sandbox); // true

// 4. Simulate user checkout (manual step)
// User visits: /payment/{payment.id}?token={checkoutToken}
// User selects "Complete Test Payment"

// 5. Webhook is received
// Your webhook handler receives payment.succeeded event

// 6. Verify final status
const finalPayment = await getPayment(auth.token, payment.id);
console.log(finalPayment.status); // "SUCCEEDED"

// 7. Test refund flow
const refund = await createRefund(auth.token, payment.id, {
  amount: 1000,
  reason: 'Test refund'
});

// User confirms refund with token
// Refund processes instantly in sandbox

const finalRefund = await getRefund(auth.token, refund.id);
console.log(finalRefund.status); // "SUCCEEDED"
```

## Troubleshooting

### Payment Not Transitioning

**Problem**: Payment stuck in `PROVIDER_PENDING` status

**Solution**:
- Verify you're clicking an outcome button on the sandbox checkout page
- Check that the checkout token hasn't expired (15 minutes)
- Ensure you're using the correct payment ID

### Webhooks Not Received

**Problem**: Not receiving webhook events for sandbox payments

**Solution**:
- Verify `webhookUrl` is correctly configured on tenant
- Ensure webhook endpoint is publicly accessible
- Check webhook endpoint returns 200 status
- Review platform logs for webhook delivery failures

### Sandbox Banner Not Showing

**Problem**: Frontend doesn't show sandbox indicators

**Solution**:
- Check that payment response includes `"sandbox": true` field
- Verify frontend is checking `payment.sandbox` or `payment.provider === 'sandbox'`
- Ensure sandbox banner component is properly imported

## Next Steps

- [Creating Payments](./creating-payments.md) - Learn the payment creation API
- [Webhooks](./webhooks.md) - Handle payment status notifications
- [Refunds](./refunds.md) - Process refunds for completed payments
- [Best Practices](./best-practices.md) - Production-ready integration patterns
