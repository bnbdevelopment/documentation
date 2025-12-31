---
title: Logging, auditing & legal compliance
sidebar_label: Logging, auditing & legal compliance
---

# Logging, auditing & legal compliance

## Log subjects
On the billing backend we keep logs of: 
- Every state change
- Every webhook payload (raw, immutable)
- Every retry
- Every error.

We use structured logs stored separately, with critical logs being written to an append-only log storage ClickHouse.

## Retention
Based on the Hungarian laws and GDPR, we store payment information and details for minimum 7 years. We also store critical logs without personal data indefinitely.

## ClickHouse - Immutable Audit Logs

High-performance columnar database for analytics and compliance.

**What We Store**:
- Every payment state transition
- All API requests and responses
- Webhook payloads (raw and parsed)
- Authentication events
- System errors and warnings

**Guarantees**:
- **Append-only**: Logs cannot be modified or deleted
- **Fast queries**: Billion-row queries in &lt;1 second
- **Data retention**: Indefinite (legal compliance)
- **Tamper-evident**: Cryptographic checksums

**Use Cases**:
- Regulatory audits
- Fraud investigation
- Business intelligence
- Incident forensics