---
sidebar_position: 1
sidebar_label: 'Welcome'
---

# Welcome to BNB Billing System

BNB Billing System is an enterprise-grade payment processing platform designed for multi-tenant SaaS applications. It is designed to handle many transactions with **minimal payment loss** and **99.99% uptime**.

## Key Features

### Financial Security

- **Two-Tier Idempotency**: Redis locking + PostgreSQL storage prevents duplicate payments
- **Atomic Transactions**: All state changes happen atomically - no partial failures
- **Request Hash Validation**: Detects payload substitution attacks
- **Argon2id Password Hashing**: Industry-leading password security for tenant accounts

### Complete Transparency

- **Immutable Audit Logs**: Every action is recorded and cannot be altered
- **Real-time Tracking**: Monitor payment status in real-time
- **Detailed Reporting**: Query payment history, generate financial reports
- **ClickHouse Analytics**: High-performance queries for business intelligence

### Enterprise Reliability

- **99.99% Uptime SLA**: Redundant infrastructure across multiple availability zones
- **Automatic Failover**: Service continues even if components fail
- **Distributed Locking**: Prevents race conditions and duplicate processing
- **Event-Driven Confirmation**: Payments confirmed only after provider verification

### Multi-Tenant Architecture

- **Complete Isolation**: Each tenant's data is logically isolated
- **Scalable**: Handle thousands of tenants on shared infrastructure
- **Secure Authentication**: JWT tokens with 24-hour expiration
- **Per-Tenant Webhooks**: Notify your application of payment events

## Supported Payment Providers
Currently we only support the following payment providers, although due to the modularity of the system it is easy to extend to more. 

| Provider | Currencies | Status |
|----------|-----------|--------|
| **SimplePay** | HUF | Active |

## Compliance & Certifications

### Current Compliance

- **GDPR**: Full compliance with EU data protection regulations
- **Hungarian Accounting Act**: 7-year financial record retention
- **PCI DSS Level 1**: Through our payment provider partners
- **ISO 27001**: Information security management (in progress)

### Data Protection

- **Encryption at Rest**: All database records encrypted using AES-256
- **Encryption in Transit**: TLS 1.3 for all API communications
- **Access Controls**: Multi-factor authentication for admin access
- **Regular Audits**: Quarterly security audits and penetration testing

## Service Level Agreement

### Availability

- **Uptime**: through using distributed systems we try to ensure maximal uptime.
- **Response Time**: we try to minimize our average API response time as much as we can.
- **Support**: our systems are continuously monitored and we try to mitigate problems immediately.

### Financial Guarantees

- **Zero Payment Loss**: We guarantee no transactions are lost due to system failures
- **Duplicate Prevention**: Idempotency system prevents double charging
- **Data Integrity**: Redundant database backups with point-in-time recovery

## Trust & Transparency

### Open Documentation

While our source code is proprietary, we believe in transparency. This documentation provides complete visibility into:
- How we handle your money
- How we protect your data
- What happens during failures
- Our compliance commitments

### Audit Rights

As our user, you have the right to:
- Request complete audit logs for your transactions
- Export all your payment data
- Review our security practices
- Request third-party audit reports (under NDA)

## Support & Contact

- **Technical Support**: contact@bnbdevelopment.hu
- **Legal & Compliance**: contact@bnbdevelopment.hu
<!-- - **24/7 Incident Hotline**: +36 1 234 5678 -->