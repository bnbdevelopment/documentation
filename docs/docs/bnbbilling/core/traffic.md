---
title: Traffic Flow
sidebar_label: Traffic Flow
---

# Traffic Flow

Documentation about the general concepts and flow of traffic throughout the applications.

## Payment flow

### Payment intent creation (server-to-server)
1. Product backend communicates with billing backend, which creates a `PaymentIntent` entry in database.
2. Billing backend creates the `payment_intent_id` and sends back the `checkout_token`.
3. Product redirects to the checkout URL

### User checkout (frontend)
4. The User is redirected to Billing frontend (Next.js), where the token is validated, checkout page loads payment intent details from database. 
5. Billing backend creates payment provider specific intent, frontend redirects user to the provider payment page

### Payment confirmation
6. Payment provider to Billing backend (webhook): verifying the status of the transaction. Billing backend updates the status based on that. 
7. Billing backend sends request to the given product, with the status of the transaction.

### Full Flow
```mermaid
sequenceDiagram
    participant prod as Product Backend
    participant bill as Billing Backend
    participant payp as Payment Provider
    participant invo as Invoice Application
    participant rbmq as Queue
    participant data as Database
    %%participant logs as Log Storage

    prod ->> bill: PaymentIntent

    bill ->> data: Creates payment intent
    data ->> bill:

    bill ->> prod: checkout_token

    payp ->> bill: Transaction webhook
    bill ->> data: Update payment status
    
    bill ->> prod: Webhook callback
    

```

## Data Flow

### Payment Creation Flow

```mermaid
sequenceDiagram
    participant App as Your Application
    participant API as Billing API
    participant DB as PostgreSQL
    participant Cache as Redis
    participant Audit as ClickHouse
    participant Provider as Payment Provider

    App->>API: POST /payments (Idempotency-Key)
    API->>Cache: Acquire distributed lock
    Cache-->>API: Lock acquired
    API->>DB: Check for existing payment
    API->>DB: Create PaymentIntent
    API->>Audit: Log payment creation
    API->>Provider: Initialize payment
    Provider-->>API: Checkout URL
    API->>DB: Update with provider reference
    API->>Cache: Release lock
    API-->>App: Return checkout URL
```

### Webhook Processing Flow

```mermaid
sequenceDiagram
    participant Provider as Payment Provider
    participant API as Billing API
    participant DB as PostgreSQL
    participant Audit as ClickHouse
    participant Queue as RabbitMQ
    participant App as Your Application

    Provider->>API: POST /webhooks/provider (signature)
    API->>API: Verify signature
    API->>DB: Check idempotency (event ID)
    API->>DB: Update payment status
    API->>DB: Store webhook payload
    API->>Audit: Log state transition
    API->>DB: Write event to outbox
    API-->>Provider: 200 OK

    Note over Queue: Background Worker
    Queue->>DB: Poll outbox table
    DB-->>Queue: Pending events
    Queue->>App: POST /webhooks/billing
    App-->>Queue: 200 OK
    Queue->>DB: Mark event as delivered
```