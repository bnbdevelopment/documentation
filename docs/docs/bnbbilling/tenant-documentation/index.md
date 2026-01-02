---
sidebar_position: 1
---

# Integration Overview

This guide walks you through integrating the centralized billing and payment platform into your application. The platform handles all payment processing, compliance, and provider communication on your behalf.

## What This Platform Provides

The billing platform is a multi-tenant service that centralizes payment operations for all product applications. By integrating with this platform, your application benefits from:

- Secure payment processing without handling sensitive card data
- Built-in support for multiple payment providers
- Automatic retry logic and failure handling
- Complete audit trails and compliance logging
- Webhook-based payment confirmation
- Idempotent API operations to prevent duplicate charges

## Integration Model

Your application acts as a tenant of the billing platform. All payment operations are scoped to your tenant account, ensuring complete isolation from other applications using the same platform.

### Key Principles

**No Direct Provider Access**: Your application never communicates with payment providers directly. All provider integration, credential management, and API calls are handled by the platform.

**Webhook-Driven Confirmation**: Payment success is confirmed through webhooks, not frontend redirects. While users are redirected after payment attempts, the authoritative payment status comes from provider webhooks processed by the platform.

**Stateless Frontend**: Your frontend should not maintain payment state. Always query the platform API to retrieve current payment status.

## Integration Steps

1. **Registration**: Obtain tenant credentials from the platform administrator
2. **Authentication**: Authenticate using your tenant credentials to receive a JWT token
3. **Create Payments**: Generate payment intents for user checkout sessions
4. **Redirect Users**: Direct users to the payment provider's checkout page
5. **Receive Webhooks**: Handle webhook notifications for payment status updates
6. **Query Status**: Poll or retrieve final payment status from the platform

## Prerequisites

Before integrating, ensure you have:

- A registered tenant account with the billing platform
- Tenant credentials (app name and secret)
- HTTPS endpoints for receiving webhooks
- A secure backend to make API calls (never expose credentials to frontend)

## Next Steps

Follow the integration guide in order:

1. [Getting Started](./getting-started.md) - Registration and authentication
2. [Creating Payments](./creating-payments.md) - Initiating payment intents
3. [Handling Redirects](./handling-redirects.md) - Frontend checkout flow
4. [Webhooks](./webhooks.md) - Receiving payment status updates
5. [Best Practices](./best-practices.md) - Security and reliability guidelines
