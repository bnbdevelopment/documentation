---
title: Reliability
sidebar_label: Reliability
---

# Reliability
Some of the core ideas we keep in mind while developing, to ensure the best and safest experience for our users.

## Idempotency everywhere
Idempotency is a property in computer science where applying an operation multiple times yields the same result as applying it once.
We ensure and test thoroughly that every element of the system returns the same answer under any conditions.

## Event-driven confirmation
Both payments and transactions are only successful after the necessary service acknowledges it through webhooks or internal communications.

## Message broker
We use Apache Kafka and RabbitMQ to ensure optimal scalability for our applications, as well as quick response times for the users. 

## Outbox pattern
We write domain events into DB, while background worker publishes them. This guarantees no lost events.

## Disaster Recovery

### Backup Strategy

**PostgreSQL**:
- Continuous WAL archiving to S3
- Point-in-time recovery (5-minute granularity)
- Daily full backups, retained for 30 days
- Monthly archives, retained for 7 years

**Redis**:
- RDB snapshots every 5 minutes
- AOF (Append-Only File) for durability
- Automatic failover with Redis Sentinel

**ClickHouse**:
- Daily backups to S3
- Retained indefinitely for compliance

### Recovery Objectives

- **RTO** (Recovery Time Objective): &lt;15 minutes
- **RPO** (Recovery Point Objective): &lt;5 minutes
- **MTTR** (Mean Time To Recovery): &lt;1 hour