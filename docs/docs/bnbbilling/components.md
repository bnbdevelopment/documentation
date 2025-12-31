---
sidebar_position: 2
sidebar_label: 'System Components'
---

# System Components

BNB Billing System is built on a robust, enterprise-grade architecture designed for financial reliability and regulatory compliance.

## System Overview

```mermaid
graph TB
    subgraph "Client Application"
        A1[Product Backend]
        A2[Product Frontend]
    end

    subgraph "BNB Billing System"
        B1[Billing API<br/>NestJS Backend]
        B2[Checkout UI<br/>NextJS Frontend]
    end

    subgraph "Data Layer - Primary"
        C1[(PostgreSQL<br/>Single Source of Truth)]
        C2[(Redis<br/>Distributed Locks)]
    end

    subgraph "Data Layer - Analytics"
        D1[(ClickHouse<br/>Audit Logs)]
        D2[S3 Storage<br/>Long-term Archives]
    end

    subgraph "Message Broker"
        E1[RabbitMQ<br/>Event Delivery]
    end

    subgraph "Payment Providers"
        F1[SimplePay]
        F2[Other Provider implemented in future]
    end

    A1 -->|Create Payment| B1
    A2 -->|Checkout| B2
    B2 -->|Load Intent| B1

    B1 -->|Store Transaction| C1
    B1 -->|Acquire Lock| C2
    B1 -->|Audit Log| D1
    B1 -->|Publish Event| E1
    B1 -->|Process Payment| F1

    E1 -->|Webhook to Product| A1

    F1 -->|Payment Webhook| B1

    D1 -->|Archive| D2

    style C1 fill:#4CAF50
    style B1 fill:#2196F3
    style D1 fill:#FF9800
```

## Core Components

The BNB Billing System consists of several key components working together:

- **Billing API** (NestJS Backend): The central nervous system that processes payments, manages authentication, and handles provider integrations
- **Checkout UI** (NextJS Frontend): Secure, PCI-compliant checkout experience for end users
- **PostgreSQL**: Primary database containing all financial records (single source of truth)
- **Redis**: Distributed coordination for locks, caching, and rate limiting
- **ClickHouse**: Immutable audit logs for compliance and analytics
- **RabbitMQ**: Guaranteed event delivery to tenant applications
- **S3 Storage**: Long-term archives for compliance documentation

:::tip Detailed Information
For comprehensive details about each component, see:
- [Architecture Overview](./core/architecture) - Complete system architecture and component details
- [Traffic Flow](./core/traffic) - How data flows through the system
:::

## Data Flow

The system handles two main data flows:

1. **Payment Creation**: From your application through the Billing API to payment providers
2. **Webhook Processing**: From payment providers back to your application via RabbitMQ

:::tip Detailed Flows
See [Traffic Flow](./core/traffic) for detailed sequence diagrams of payment creation and webhook processing.
:::

## Related Documentation

For detailed information about specific aspects of the system:

### Core Architecture
- [Architecture Overview](./core/architecture) - Complete system architecture, components, and data storage
- [Traffic Flow](./core/traffic) - Payment flows and webhook processing

### Performance & Reliability
- [Security](./performance/security) - Security architecture and defense in depth
- [Reliability](./performance/reliability) - Reliability guarantees and disaster recovery
- [Auditing](./performance/auditing) - Audit logging and compliance
- [Monitoring](./performance) - Monitoring, observability, and alerting

---

:::tip Contact
If you have any questions regarding the system and your personal data, please feel free to contact us at contact@bnbdevelopment.hu.
:::