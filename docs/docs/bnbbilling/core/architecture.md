---
title: Architecture
sidebar_label: Architecture
---

# Architecture

Documentation about the general architecture of the application.

## Services
### Core Elements
- **Product Application**
- **Billing Frontend**: lightweight NextJS UI
- **Billing Backend**: stateless NestJS microservice

### System Elements
- **Postgres**: main database.
- **ClickHouse**: central storage for logs.
- **Redis**: optional caching, performance guarantees and coordination.
- **RabbitMQ**: message broker, ensuring guaranteed delivery.
- **S3 Storage**: long term data storge for logs.

## Database architecture
Core Tables: 

- **payment_intents**
    - `id`
    - `user_id`
    - `app_id (tenant)`
    - `amount`
    - `currency`
    - `status (created / pending / paid / failed / refunded)`
    - `provider`
    - `provider_reference`
    - `created_at`
- **payment_events**
    - `id`
    - `payment_intent_id`
    - `type (provider_webhook, status_change)`
    - `payload (JSONB)`
    - `created_at`
- **audit_logs**
    - `actor (system/user/provider)`
    - `action`
    - `resource_type`
    - `resource_id`
    - `immutable payload`
    - `timestamp`