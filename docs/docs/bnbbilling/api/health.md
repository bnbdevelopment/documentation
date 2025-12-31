---
title: Health Check API
sidebar_label: Health
sidebar_position: 1
---

# Health Check API

Health check endpoints for monitoring and Kubernetes probes.

## Endpoints

### Liveness Probe

Check if the application is alive and running.

```http
GET /health
GET /health/live
```

**Authentication**: None (public endpoint)

**Response** (200 OK):
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Use Case**: Kubernetes liveness probe

**Kubernetes Configuration**:
```yaml
livenessProbe:
  httpGet:
    path: /health/live
    port: 3000
  initialDelaySeconds: 10
  periodSeconds: 30
  timeoutSeconds: 5
  failureThreshold: 3
```

**When to Use**:
- Pod health monitoring
- Load balancer health checks
- Basic uptime monitoring

**Example**:
```bash
curl http://localhost:3000/health
```

---

### Readiness Probe

Check if the application is ready to accept traffic.

```http
GET /health/ready
```

**Authentication**: None (public endpoint)

**Response** (200 OK - All services healthy):
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "info": {
    "database": {
      "status": "up"
    },
    "redis": {
      "status": "up"
    },
    "clickhouse": {
      "status": "up"
    }
  },
  "error": {},
  "details": {
    "database": {
      "status": "up"
    },
    "redis": {
      "status": "up"
    },
    "clickhouse": {
      "status": "up"
    }
  }
}
```

**Response** (503 Service Unavailable - One or more services down):
```json
{
  "status": "error",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "info": {
    "database": {
      "status": "up"
    },
    "redis": {
      "status": "down",
      "message": "Connection refused"
    },
    "clickhouse": {
      "status": "up"
    }
  },
  "error": {
    "redis": {
      "status": "down",
      "message": "Connection refused"
    }
  },
  "details": {
    "database": {
      "status": "up"
    },
    "redis": {
      "status": "down",
      "message": "Connection refused"
    },
    "clickhouse": {
      "status": "up"
    }
  }
}
```

**Checks**:

| Service | Check | Impact if Down |
|---------|-------|----------------|
| **Database** (PostgreSQL) | Connection + ping | Cannot process payments, queries fail |
| **Redis** | Connection + ping | No caching, distributed locking fails |
| **ClickHouse** | Connection + ping | Audit logging fails (non-critical) |

**Use Case**: Kubernetes readiness probe

**Kubernetes Configuration**:
```yaml
readinessProbe:
  httpGet:
    path: /health/ready
    port: 3000
  initialDelaySeconds: 15
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 3
```

**When to Use**:
- Kubernetes pod readiness
- Rolling deployment health checks
- Pre-production smoke tests
- Dependency validation

**Example**:
```bash
curl http://localhost:3000/health/ready
```

---

## Health Check Behavior

### Startup Sequence

1. **Application starts**
   - `/health/live` returns 200 OK (process is running)
   - `/health/ready` returns 503 Service Unavailable (dependencies not checked yet)

2. **Dependencies initializing**
   - Database connecting...
   - Redis connecting...
   - ClickHouse connecting...

3. **All dependencies up**
   - `/health/live` returns 200 OK
   - `/health/ready` returns 200 OK (ready to accept traffic)

### Dependency Failure

If any dependency goes down during runtime:

1. **Redis fails**
   - `/health/live`: 200 OK (application still running)
   - `/health/ready`: 503 Service Unavailable
   - Kubernetes removes pod from service load balancer
   - No new traffic routed to this pod
   - Existing requests may fail

2. **Application auto-recovery**
   - Redis reconnects automatically (retry logic)
   - `/health/ready`: 200 OK
   - Kubernetes adds pod back to service

---

## Monitoring Integration

### Prometheus

Health check metrics are exported at `/metrics`:

```prometheus
# Application uptime
http_health_check_total{endpoint="/health/live",status="ok"} 1500
http_health_check_total{endpoint="/health/ready",status="ok"} 1498
http_health_check_total{endpoint="/health/ready",status="error"} 2

# Dependency status
dependency_health{service="database",status="up"} 1
dependency_health{service="redis",status="up"} 1
dependency_health{service="clickhouse",status="up"} 1
```

### Grafana Dashboard

Sample queries:

**Application Uptime**:
```promql
up{job="billing-backend"}
```

**Dependency Health**:
```promql
dependency_health{service="database"}
dependency_health{service="redis"}
dependency_health{service="clickhouse"}
```

**Health Check Failures**:
```promql
rate(http_health_check_total{status="error"}[5m])
```

---

## Troubleshooting

### Readiness probe failing

**Symptom**: `/health/ready` returns 503

**Possible Causes**:

1. **Database connection issues**
   ```bash
   # Check database connectivity
   docker-compose logs postgres

   # Verify connection string
   echo $DATABASE_URL

   # Test connection
   psql $DATABASE_URL -c "SELECT 1"
   ```

2. **Redis connection issues**
   ```bash
   # Check Redis status
   docker-compose logs redis

   # Test connection
   redis-cli -h localhost -p 6379 ping
   ```

3. **ClickHouse connection issues**
   ```bash
   # Check ClickHouse status
   docker-compose logs clickhouse

   # Test connection
   curl http://localhost:8123/ping
   ```

### Liveness probe failing

**Symptom**: `/health/live` not responding or returns error

**Possible Causes**:

1. **Application crashed**
   ```bash
   # Check application logs
   docker-compose logs billing-backend

   # Restart application
   docker-compose restart billing-backend
   ```

2. **Port not accessible**
   ```bash
   # Check if port is listening
   netstat -an | grep 3000

   # Check firewall rules
   sudo iptables -L
   ```

3. **High load/deadlock**
   ```bash
   # Check CPU/memory usage
   docker stats

   # Check for deadlocks in logs
   docker-compose logs billing-backend | grep -i deadlock
   ```

---

## Best Practices

### For Development

1. **Quick health check**:
   ```bash
   curl -f http://localhost:3000/health || echo "Service is down!"
   ```

2. **Detailed dependency check**:
   ```bash
   curl -s http://localhost:3000/health/ready | jq
   ```

3. **Watch health status**:
   ```bash
   watch -n 5 'curl -s http://localhost:3000/health/ready | jq .status'
   ```

### For Production

1. **Liveness Probe**:
   - Set `initialDelaySeconds` to allow app startup (10-30s)
   - Use short `periodSeconds` (10-30s)
   - Allow 2-3 failures before restart

2. **Readiness Probe**:
   - Set higher `initialDelaySeconds` (20-60s for dependencies)
   - Use short `periodSeconds` (5-10s)
   - Remove from load balancer quickly (1-2 failures)

3. **Monitoring**:
   - Alert on liveness failures (immediate)
   - Alert on readiness failures (> 5 minutes)
   - Track health check response times
   - Monitor dependency health trends

---

## Example Scripts

### Health Check Script

```bash
#!/bin/bash
# health-check.sh

API_URL="${API_URL:-http://localhost:3000}"

echo "Checking liveness..."
if curl -f -s "${API_URL}/health/live" > /dev/null; then
  echo "Liveness check passed"
else
  echo "Liveness check failed"
  exit 1
fi

echo "Checking readiness..."
READY_RESPONSE=$(curl -s "${API_URL}/health/ready")
READY_STATUS=$(echo "$READY_RESPONSE" | jq -r '.status')

if [ "$READY_STATUS" = "ok" ]; then
  echo "Readiness check passed"
  echo "$READY_RESPONSE" | jq '.info'
else
  echo "Readiness check failed"
  echo "$READY_RESPONSE" | jq '.error'
  exit 1
fi

echo "All health checks passed"
```

### Dependency Monitor

```bash
#!/bin/bash
# monitor-dependencies.sh

API_URL="${API_URL:-http://localhost:3000}"

while true; do
  RESPONSE=$(curl -s "${API_URL}/health/ready")

  DB_STATUS=$(echo "$RESPONSE" | jq -r '.details.database.status')
  REDIS_STATUS=$(echo "$RESPONSE" | jq -r '.details.redis.status')
  CH_STATUS=$(echo "$RESPONSE" | jq -r '.details.clickhouse.status')

  clear
  echo "=== Dependency Health Monitor ==="
  echo "Database:   $DB_STATUS"
  echo "Redis:      $REDIS_STATUS"
  echo "ClickHouse: $CH_STATUS"
  echo ""
  echo "Last check: $(date)"

  sleep 5
done
```