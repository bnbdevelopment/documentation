---
title: Security
sidebar_label: Security
---

# Security
Some of the core security concepts we keep in mind while developing, to ensure the safest experience for our users.

## Authentication & authorization
We use service-to-service auth, encrypted by mTLS. Each application has its own `app_id` and `app_secret`, which are constantly rotating. This enforces which applications can create payment requests to which products.

## Token Security
Checkout tokens are signed JWT tokens with short validity. We also ensure that no sensitive data is being stored in them.

## Webhook security
Our webhooks use provider signature verification, restricting the domains and sites which are allowed to make requests to them. We also use IP allowlisting for additional restricting. Replay protection is also active on our services.

## PCI scope minimization
We never touch or store raw customer data. All of the transaction details are handled through our payment providers.

## Security Architecture

### Defense in Depth

**Layer 1: Network**
- DDoS protection (Cloudflare)
- WAF (Web Application Firewall)
- IP allowlisting for webhooks

**Layer 2: Application**
- Rate limiting (100 req/min per tenant)
- JWT authentication (24h expiration)
- Request validation (class-validator)

**Layer 3: Data**
- Encryption at rest (AES-256)
- Encryption in transit (TLS 1.3)
- Database-level access controls

**Layer 4: Audit**
- All actions logged to ClickHouse
- Tamper-evident audit trail
- Regular security audits

